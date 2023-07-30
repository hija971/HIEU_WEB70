import { Router } from "express";
import { posts } from "../data/post.js";
import { checkUser } from "../middlewares/checkUser.js";

const postRouter = Router()

postRouter.get("/", (req, res, next)=>{
    console.log("Post")
})

postRouter.post("/", checkUser, (req, res)=>{
    const { userId } = req.query
    const body = req.body

    const newPost = {
        ...body,
        id: crypro.randomUUID(),
        userId: userId
    }
    posts.push(newPost)
})

postRouter.post("/")

/*
* client ----todothing--> server
*/

export default postRouter