import { Router } from "express";
import { users } from "../data/users.js";
import { findUserByCredentials } from "../middlewares/findUser.js";
import { checkUserRequirements } from "../middlewares/checkUserRequirements.js";
import crypto from "crypto";

const authRouter = Router();

authRouter.post("/login", findUserByCredentials, (req, res) => {
  const { apiKey } = req.user;
  res.status(200).json({ message: "Login successful", apiKey: apiKey });
});

authRouter.post("/register", checkUserRequirements, (req, res) => {
  const { username, password, fullname, apiKey } = req.newUser;
  users.push({
    id: crypto.randomUUID(),
    username: username,
    password: password,
    fullname: fullname,
    apiKey: apiKey,
  });
  res.status(200).json({ data: users, message: "User registered successfully", apiKey: apiKey });
});

export default authRouter;
