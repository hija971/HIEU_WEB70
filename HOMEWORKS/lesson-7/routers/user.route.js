import { Router } from "express";
import userController from "../controllers/user.control.js";
import checkUserRequirements from "../middlewares/checkUserReq.js"

const UserRouter = Router()

UserRouter.post("/register", checkUserRequirements, userController.create)

export default UserRouter