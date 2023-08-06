import { Router } from "express";
import postRouter from "./post.js";
import userRouter from "./user.js";
import authRouter from "./auth.js";

const router = Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/auth", authRouter)


export default router;
