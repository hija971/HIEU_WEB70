import { posts } from "../data/posts.js";

export const checkPostExist = (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    const postIndex = posts.findIndex(
      (post) => post.id === id && post.userId === userId
    );

    if (postIndex !== -1) {
      req.postIndex = postIndex;
      next();
    } else {
      res.status(400).json("Post or user does not exist");
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
