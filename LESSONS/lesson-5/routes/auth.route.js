import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const userMockData = [
    {
      id: "1",
      username: "bruh",
      password: "bruh69420",
      fullname: "Bruh Man",
    },
    {
      id: "2",
      username: "bro",
      password: "brodude123",
      fullname: "Bro Man",
    },
    {
      id: "3",
      username: "dawg",
      password: "datdawg123",
      fullname: "Da Dawg",
    },
  ];

  if (!username || !password) {
    return res.status(400).json({
      message: "Missing required keys",
    });
  }

  console.log({
    username,
    password,
  });

  const existingUser = userMockData.find(
    (u) => u.username === username && u.password === password
  );

  if (!existingUser) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }

  const jwtPayload = {
    username: existingUser.username,
    id: existingUser.id,
    fullname: existingUser.fullname,
  };

  const SECRET_KEY = "IT_IS_YA_BOI";
  const token = jwt.sign(jwtPayload, SECRET_KEY, {
    expiresIn: "60s",
  });

  res.json({
    user: jwtPayload,
    accessToken: token
  });
});

export default router;
