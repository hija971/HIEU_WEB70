import { Router } from "express";
import postController from "../controllers/post.control.js";
import { authenticateToken } from "../utils/index.js";
import { resClientData } from "../utils/index.js";
import { dbCollection } from "../database/index.js";
import { ObjectId } from "mongodb";

const PostRouter = Router();

PostRouter.post("/:userId", authenticateToken, postController.create);

PostRouter.get("/:userId", authenticateToken, async (req, res) => {
  try {
    const { postId } = req.query;
    const post = await dbCollection.posts.findOne({
      _id: new ObjectId(postId),
    });
    if (!post) {
      resClientData(res, 404, null, "Post not found");
      return;
    }
    const likedPost = await dbCollection.posts.findOneAndUpdate(
      { _id: new ObjectId(postId) },
      { $inc: { liked: 1 } },
      { returnDocument: "after" }
    );
    console.log(likedPost);
    resClientData(res, 200, likedPost, "You liked this post");
  } catch (error) {
    resClientData(res, 400, null, error.message);
  }
});

PostRouter.put("/:userId", authenticateToken, async (req, res) => {
  try {
    const { postId } = req.query;
    const { userId } = req.params;
    const updatePostData = {
      $set: {
        title: req.body.title,
        "body.content": req.body.content,
        "body.image": req.body.image,
      },
    };
    const post = await dbCollection.posts.findOne({
      _id: new ObjectId(postId),
      userId: userId,
    });
    if (!post) {
      return resClientData(
        res,
        404,
        null,
        "Post not found or you do not have permission to edit this post"
      );
    }
    await dbCollection.posts.findOneAndUpdate(
      { _id: new ObjectId(postId), userId: userId },
      updatePostData,
      { returnDocument: "after" }
    );
    resClientData(res, 200, updatePostData, "Post edited");
  } catch (error) {
    resClientData(res, 400, null, error.message);
  }
});

export default PostRouter;
