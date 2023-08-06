import { Router } from "express";
import { posts } from "../data/posts.js";
import { checkPostExist } from "../middlewares/checkPostExist.js";
import { checkUser } from "../middlewares/checkUser.js";
import { checkApiKey } from "../middlewares/checkAPIKey.js";
import { handleViewer } from "../middlewares/handleViewer.js";
import crypto from "crypto";

const postRouter = Router();

postRouter.get("/:id", checkPostExist, handleViewer, (req, res) => {
  const { postIndex } = req;
  res.status(200).send({
    data: posts[postIndex],
    success: true,
    message: "Got post by ID",
  });
});

postRouter.put("/:id", checkUser, checkPostExist, checkApiKey, (req, res) => {
  const { postIndex } = req;
  const { title, body } = req.body;

  posts[postIndex].title = title;
  posts[postIndex].body = body;

  res.status(200).send(posts);
});

export default postRouter;
