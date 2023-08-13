import { Router } from "express";
import { users } from "../data/users.js";
import { findUserByCredentials } from "../middlewares/findUser.js";
import { checkUserRequirements } from "../middlewares/checkUserReg.js";
import { authenticateToken } from "../utils/index.js";
import crypto from "crypto";

const authRouter = Router();

authRouter.post("/login", findUserByCredentials, (req, res) => {
  res.status(200).json({
    message: "Login successfully",
  });
});

authRouter.get("/user-info/:id", authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const userId = users.find((item) => item.id === id);
    if (!userId) throw new Error("User not found");
    res.status(200).send({
      data: userId,
      success: true
    });
  } catch (error) {
    res.status(403).send({
      data: null,
      success: false,
      message: error.message
    })
  }
});

authRouter.post("/register", checkUserRequirements, (req, res) => {
  const id = crypto.randomUUID();
  users.push({
    id: id,
    ...req.newUser,
  });
  res.status(200).json({ message: "User registered successfully" });
});

export default authRouter;
