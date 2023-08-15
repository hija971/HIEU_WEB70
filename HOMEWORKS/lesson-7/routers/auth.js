import { Router } from "express";
import findUserByCredentials from "../middlewares/findUser.js";
import checkUserRequirements from "../middlewares/checkUserReq.js"

const AuthRouter = Router()

AuthRouter.post("/login", findUserByCredentials, (req, res) => {
    res.status(200).json({
      message: "Login successfully",
    });
  });

export default AuthRouter