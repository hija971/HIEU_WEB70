import express from "express";
import crypto from "crypto";
const app = express();
app.use(express.json());

const PORT = 5001;

const users = [
  {
    id: "74d2e282-3229-44de-bb90-9f4d15354f04",
    username: "vanA",
    fullname: "Nguyen Van A",
    age: 19,
  },
  {
    id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
    username: "nguyenvanB",
    fullname: "Nguyen Van B",
    age: 20,
  },
  {
    id: "36128291-709e-466f-8567-966deae2f1b2",
    username: "NVanC",
    fullname: "Nguyen Van C",
    age: 21,
  },
  {
    id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
    username: "VAND",
    fullname: "Nguyen Van D",
    age: 22,
  },
];

//get all
app.get("/api/homeworks/users", (req, res) => {
  try {
    res.send({
      data: users,
      message: "Get users successfully",
      success: true,
    });
  } catch (error) {
    res.send({ data: null, message: error.message, success: false });
  }
});

//get username query
app.get("/api/homeworks/users", (req, res) => {
  try {
    const username = req.query.username;
    console.log(username);
    const findUser = users.filter((item) => {
      return item.username.toLowerCase().indexOf(username.toLowerCase()) !== -1;
    });
    console.log(findUser);
    if (findUser.length === 0) {
      res.send({ data: null, message: "USER NOT FOUND", success: false });
    } else {
      res.send({ data: findUser, message: "FOUND USERS", success: true });
    }
  } catch (error) {
    res.send({ data: null, message: error.message, success: false });
  }
});

//sort with query
app.get("/api/homeworks/users/sort", (req, res) => {
  try {
    const { sort } = req.query;
    console.log(sort);
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => {
      if (sort === "ASC") {
        return a.age - b.age;
      } else if (sort === "DESC") {
        return b.age - a.age;
      } else {
        res.send({
          data: null,
          message: "Incorrect query value",
          success: false,
        });
        return 0;
      }
    });
    res.send({ data: sortedUsers, message: "Sorted users", success: true });
    console.log(sortedUsers);
  } catch (error) {
    res.send({ data: null, message: error.message, success: false });
  }
});

//add user
app.post("/api/homeworks/users", (req, res) => {
  try {
    const dataBody = req.body;
    const { username } = dataBody
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.send({
        data: null,
        message: "Username already exists",
        success: false,
      });
    }
    users.push({
      id: crypto.randomUUID(),
      ...dataBody,
    });
    res.send({
      data: users,
      message: "User added",
      success: true
    });
  } catch (error) {
    res.send({ data: null, message: error.message, success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}...`);
});
