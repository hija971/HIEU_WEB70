import { Router } from "express";
import { users } from "../data/user.js";

const postRouter = Router()

postRouter.get("/", (req, res)=>{
    res.status(200).send(users)
})

export default postRouter