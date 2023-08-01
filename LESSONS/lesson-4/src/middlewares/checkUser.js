import { users } from "../data/user.js";

export const checkUser = (req, res, next) => {
  const { userId } = req.query;
  if (userId) {
    const user = users.find((user) => user.id === userId);
    if (user) {
      next();
      return;
    }
  }
  res.status(401).send({ message: "No user ID found" });
};
