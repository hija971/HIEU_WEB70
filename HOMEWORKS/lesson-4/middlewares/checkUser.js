import { users } from "../data/users.js";

export const checkUser = (req, res, next) => {
  const { userId } = req.query;
  if (userId) {
    const user = users.find((user) => user.id === userId);
    if (user) {
      next();
      return;
    }
  }
  res.status(400).json("User ID does not exist");
};
