import { verifyToken } from "../utils/index.js";
import { listUser } from "../../index.js";

export const middlewares = {
  verifyToken: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = verifyToken(token);
      req.userId = decoded.userId
      next()
    } catch (error) {
      res.status(403).send({
        data: null,
        success: false,
        message: error.message
    })
    }
  },

  validateUser: (req, res, next) => {
    try {
        const findUser = listUser.find(item => item.id === req.useId)
        if (!findUser) throw new Error("Invalid")
        next()
    } catch (error) {
        res.status(403).send({
            data: null,
            success: false,
            message: error.message
        })
    }
  },
};
