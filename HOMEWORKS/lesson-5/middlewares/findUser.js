import { users } from "../data/users.js";
import { generateToken } from "../utils/index.js";

export const findUserByCredentials = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const existingUser = users.find(
        (user) => user.username === username && user.password === password
      );
      if (existingUser) {
        const id = existingUser.id;
        const token = generateToken({ userId: id });
        res.send({ token });
        return
      }
      throw new Error("Wrong username or password!");
    } else if (!username) throw new Error("Username missing!");
    else if (!password) throw new Error("Password missing!");

    next();
    return;
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};
