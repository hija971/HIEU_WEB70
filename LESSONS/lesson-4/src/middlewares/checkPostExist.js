import { posts } from "../data/post.js";

export const checkPostExist = (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.query;

  const postIndex = posts.findIndex(
    (post) => post.id === id && post.userId === userId
  );

  if (postIndex !== -1) {
    req.postIndex = postIndex;
    next();
    return;
  }

  res.status(400).send("Post not found");
};
