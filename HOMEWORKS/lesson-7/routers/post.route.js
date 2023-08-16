import { Router } from "express";
import { ObjectId } from "mongodb";
import postController from "../controllers/post.control.js";
import { dbCollection } from "../database/index.js";
import { authenticateToken } from "../utils/index.js";
import { resClientData } from "../utils/index.js";

const PostRouter = Router();

PostRouter.post(
  "/:userId",
  authenticateToken,
  async (req, res,next) => {
    try {
      const { userId } = req.params;
      const user = await dbCollection.users.findOne({
        _id: new ObjectId(userId),
      });
      if (!user) {
        resClientData(res, 404, null, "User not found");
        return;
      } else {
        res.status(201).send({ message: "ok" });
      }
    } catch (error) {
      resClientData(res, 403, null, error.message);
    }
    next()
  },
  postController.create
);

export default PostRouter;
