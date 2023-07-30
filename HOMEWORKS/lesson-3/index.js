import express from "express";
import crypto from "crypto";
import { error } from "console";
const app = express();
const PORT = 5001;
app.use(express.json());

const users = [
  {
    id: "74d2e282-3229-44de-bb90-9f4d15354f04",
    username: "vanA",
    fullname: "Nguyen Van A",
  },
  {
    id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
    username: "nguyenvanB",
    fullname: "Nguyen Van B",
  },
  {
    id: "36128291-709e-466f-8567-966deae2f1b2",
    username: "NVanC",
    fullname: "Nguyen Van C",
  },
  {
    id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
    username: "VAND",
    fullname: "Nguyen Van D",
  },
];

const posts = [
  {
    id: "e415de27-0d85-4c35-bf51-70173b5844c9",
    userId: "74d2e282-3229-44de-bb90-9f4d15354f04",
    title: "TP HCM cho thuê lòng đường, vỉa hè từ tháng 9",
    body: {
      content:
        "Một phần lòng đường, vỉa hè ở những vị trí đủ điều kiện tại TP HCM sẽ được cho thuê làm điểm giữ xe, kinh doanh, tổ chức hoạt động văn hóa... từ tháng 9 tới.",
      image:
        "https://vcdn-vnexpress.vnecdn.net/2023/07/26/3-JPG-9385-1675933270-jpeg-8296-1690374843.jpg",
    },
  },
  {
    id: "d749618e-53e9-4cea-b97a-6cb2aaeb9b20",
    userId: "74d2e282-3229-44de-bb90-9f4d15354f04",
    title: "Đề xuất đường sắt tốc độ cao Bắc Nam xuất phát từ ga Hà Nội",
    body: {
      content:
        "Thay vì ga Ngọc Hồi như quy hoạch trước đây, đơn vị tư vấn đề xuất tuyến đường sắt tốc độ cao Bắc Nam có điểm đầu tại ga Hà Nội.",
      image:
        "https://vcdn-vnexpress.vnecdn.net/2023/07/26/ga-HN-2125-1660812030-4731-1690364520.jpg",
    },
  },
  {
    id: "dadbb8bc-d900-47a4-97ed-244d15c2cd7b",
    userId: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
    title:
      "Hun Manet - từ học viên West Point đến Thủ tướng Campuchia tương lai",
    body: {
      content:
        "Hun Manet, con trai ông Hun Sen, là người Campuchia đầu tiên tốt nghiệp trường quân sự West Point của Mỹ và sẽ thay cha trở thành thủ tướng Campuchia tiếp theo. ",
      image:
        "https://vcdn1-vnexpress.vnecdn.net/2023/07/26/Hun-Manet-10-1690362018.jpg",
    },
  },
  {
    id: "02b64399-ecbf-46d5-aba5-bf2c0375798b",
    userId: "74d2e282-3229-44de-bb90-9f4d15354f04",
    title: "Sẽ rà soát những nơi bố trí người nhà làm cán bộ",
    body: {
      content:
        "Bà Trương Thị Mai cho biết vẫn còn một số nơi bố trí cán bộ là người có quan hệ gia đình, Ban Tổ chức Trung ương sẽ rà soát để thực hiện nghiêm quy định của Bộ Chính trị.",
      image:
        "https://i1-vnexpress.vnecdn.net/2023/07/26/Truong-thi-mai-3-1703-1690369295.png",
    },
  },
];

//get all users
app.get("/api/v1/users", (req, res) => {
  res.status(200).send({
    data: users,
    success: true,
    message: "Got all users",
  });
});

//get all posts
app.get("/api/v1/posts", (req, res) => {
  res.status(200).send({
    data: posts,
    success: true,
    message: "Got all posts",
  });
});

//get posts by userId, search with title and content
app.get("/api/v1/post/user/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const { postTitle, postContent } = req.query;
    const foundUser = posts.find((user) => user.userId === userId);
    const foundTitle = posts.filter((item) => {
      return item.title.toLowerCase().indexOf(postTitle.toLowerCase()) !== -1;
    });
    const foundContent = posts.filter((item) => {
      return (
        item.body.content.toLowerCase().indexOf(postContent.toLowerCase()) !==
        -1
      );
    });
    if (!foundUser || foundTitle.length === 0 || foundContent.length === 0) {
      res.status(400).send({
        data: null,
        message: "User or post not found",
        success: false,
      });
    } else {
      res.status(200).send({
        data: foundUser,
        message: "Post found",
        success: true,
      });
    }
  } catch (error) {
    res.send({ data: null, message: error.message, success: false });
  }
});

//get all posts by users
app.get("/api/v1/users/posts", (req, res) => {
  const postByUser = users.map((user) => {
    const userPosts = posts.filter((post) => post.userId === user.id);
    return {
      userId: user.id,
      posts: userPosts,
      total: userPosts.length,
    };
  });

  res.status(200).send({
    data: postByUser,
    success: true,
    message: "Got all users posts",
  });
});

//add new post
app.post("/api/v1/posts/user", (req, res) => {
  try {
    const { userId } = req.query;
    const newPost = req.body;
    const userExists = users.some((user) => user.id === userId);

    if (!userExists) {
      return res.status(400).json({ message: "User does not exist" });
    }
    posts.push({
      id: crypto.randomUUID(),
      userId: userId,
      ...newPost,
    });
    res.status(201).send({
      data: posts,
      success: true,
      message: "Post added",
    });
  } catch (error) {
    res.status(404).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
});

//edit post
app.put("/api/v1/posts/:id", (req, res) => {
  try {
    const { userId } = req.query;
    const postNeedsUpdate = req.body;
    const { id } = req.params;
    const userExists = users.some((user) => user.id === userId);
    if (!userExists) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const foundPost = posts.find((item) => item.id === id);
    if (!foundPost) {
      return res.status(400).json({ message: "No post found" });
    }
    for (const key in postNeedsUpdate) {
      if (
        key !== "id" &&
        key !== "userid" &&
        typeof foundPost[key] !== "undefined"
      ) {
        foundPost[key] = postNeedsUpdate[key];
      } else {
        return res
          .status(400)
          .json({ message: "Post ID or user ID cannot be changed" });
      }
    }
    res.status(201).send({
      data: {
        id: id,
        userId: userId,
        ...posts,
      },
      success: true,
      message: "Post edited",
    });
  } catch (error) {
    res.status(404).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
});

//delete post
app.delete("/api/v1/posts/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = posts.findIndex((post) => post.id === id);

    if (index !== -1) {
      posts.splice(index, 1);
      res.status(200).send({
        data: posts,
        success: true,
        message: "Delete post successfully",
      });
    } else {
      res.status(404).send({
        data: null,
        success: false,
        message: "Post does not exist or post already deleted",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete user
app.delete("/api/v1/users/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users.splice(index, 1);
      res.status(200).send({
        data: users,
        success: true,
        message: "Delete user successfully",
      });
    } else {
      res.status(404).send({
        data: null,
        success: false,
        message: "User does not exist or user already deleted",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
