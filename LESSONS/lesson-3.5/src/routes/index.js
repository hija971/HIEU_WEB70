import { Router } from "express";
import postRouter from "./post.js";
import userRouter from "./user.js";

const router = Router()

router.use('/users', userRouter)
router.use('/posts', postRouter)

export default router