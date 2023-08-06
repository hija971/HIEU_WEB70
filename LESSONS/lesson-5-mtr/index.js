import express from "express";
import router from "./src/routes/index.js";
import crypto from "crypto";
import { generateToken } from "./src/utils/index.js";
import { middlewares } from "./src/middlewares/index.js";

const app = express();
const PORT = 5001;

app.use(express.json());

export const listUser = [
  {
    id: crypto.randomUUID(),
    username: "Me bruh",
    age: 69420,
    email: "bruh@mail.com",
    location: "hanoi",
    password: "123",
  },
];

app.post("/api/auth/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = listUser.find((u) => {
      return u.email === email && u.password === password;
    });
    if (!email) throw new Error("Email missing");
    if (!password) throw new Error("Password missing");
    if (!existingUser) throw new Error("Wrong acc or password");
    res.status(200).send({
      data: generateToken({ userId: existingUser.id }),
      success: true,
      message: "Login successfully",
    });
  } catch (error) {
    res.status(403).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
});

app.get(
  "/api/user-info",
  middlewares.verifyToken,
  middlewares.validateUser,
  (req, res) => {
    try {
      console.log(req.headers)
      res.status(200).send({
        data: listUser,
        success: true,
        message: "FOUND",
      });
    } catch (error) {
      res.status(500).send({
        data: null,
        success: false,
        message: error.message,
      });
    }
  }
);

app.get("/api/user-info/:id", (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = listUser.find((u) => u.id === id);
    if (!foundUser) throw new Error("No user found");
    res.status(200).send({
      data: foundUser,
      success: true,
      message: "FOUND",
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
