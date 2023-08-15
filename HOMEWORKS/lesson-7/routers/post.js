import { Router } from "express";
import postController from "../controllers/post.js";
import { dbCollection } from "../database/index.js";
import { authenticateToken } from "../utils/index.js";
import { resClientData } from "../utils/index.js";

const PostRouter = Router();

PostRouter.post("/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await dbCollection.users.findOne({ _id: userId });
    if (!user) {
      resClientData(res, 404, null, "User not found");
      return;
    }
    postController.create;
  } catch (error) {
    resClientData(res, 403, null, error.message);
  }
});

export default PostRouter;
