import { Router } from "express";
import { posts } from "../data/post.js";
import { checkUser } from "../middlewares/checkUser.js";
import crypto from "crypto";
import { checkPostExist } from "../middlewares/checkPostExist.js";

const postRouter = Router();

postRouter.get("/", (req, res, next) => {
  console.log("Post");
});

postRouter.post("/", checkUser, (req, res) => {
  const { userId } = req.query;
  const body = req.body;

  const newPost = {
    ...body,
    id: crypto.randomUUID(),
    userId: userId,
  };
  posts.push(newPost);

  res.status(200).send(posts);
});

postRouter.put("/:id", checkUser, checkPostExist, (req, res) => {
  const { postIndex } = req;
  const { body, title } = req.body;

  posts[postIndex].title = title;
  posts[postIndex].body = body;

  res.status(200).send(posts);
});

postRouter.delete("/:id", checkUser, checkPostExist, (req, res) => {
  const { postIndex } = req;
  posts.splice(postIndex, 1);
  res.status(200).send(posts);
});

/*
 * client ----todothing--> server
 */

export default postRouter;
