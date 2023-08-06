import { users } from "../data/users.js";
import { posts } from "../data/posts.js";

export const handleViewer = (req, res, next) => {
  const { apiKey } = req.query;
  const postId = req.params.id;
  const user = users.find((user) => user.apiKey === apiKey);

  if (user) {
    const post = posts.find((post) => post.id === postId);
    if (post) {
      if (!post.viewer) {
        post.viewer = [user.id];
      } else {
        if (!post.viewer?.includes(user.id)) {
          post.viewer.push(user.id);
        }
      }
    }
  }
  next();
};
