import { Router } from "express";
import crypto from "crypto"
import { users } from "../data/users.js";
import { generateToken } from "../utils/index.js";
import { findUserByCredentials } from "../middlewares/findUser.js";
import { checkUserRequirements } from "../middlewares/checkUserReq.js";

const authRouter = Router();

authRouter.post("/login", findUserByCredentials, (req, res) => {
  res.status(200).json({
    message: "Login successfully",
  });
});

authRouter.post("/register", checkUserRequirements, (req, res) => {
  const { username, password, fullname } = req.newUser;
  const id = crypto.randomUUID()
  users.push({
    id: id,
    username: username,
    password: password,
    fullname: fullname,
    token: generateToken({ userId: id }),
  });
  res
    .status(200)
    .json({ message: "User registered successfully" });
});

export default authRouter;
