import { Router } from "express";
import { users } from "../data/users.js"
import crypto from "crypto"

const userRouter = Router()

// userRouter.get("/", (req, res)=>{
//     console.log("User")
// })

export default userRouter