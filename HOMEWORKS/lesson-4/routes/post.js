import { Router } from "express";
import { posts } from "../data/posts.js"
import crypto from "crypto"

const postRouter = Router()

// postRouter.get("/", (req, res)=>{
//     console.log("Post")
// })

export default postRouter