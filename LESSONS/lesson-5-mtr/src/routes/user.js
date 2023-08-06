import { Router } from "express";
import { users } from "../data/user.js";
import { logAPI } from "../middlewares/logAPI.js";

const userRouter = Router();

userRouter.get("/", logAPI, (req, res) => {
  res.status(200).send(users);
});

userRouter.get("/:id", logAPI, (req, res) => {
    res.status(200).send(users);
  });

export default userRouter;
