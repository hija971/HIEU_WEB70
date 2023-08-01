import { users } from "../data/users.js";

export const findUserByCredentials = (req, res, next) => {
    const { username, password } = req.body;
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
  
    if (!user) {
      return res.status(401).json({ message: "Username or password incorrect" });
    }
  
    req.user = user;
    next();
  };