import { users } from "../data/users.js";

export const findUserByCredentials = (req, res, next) => {
    try {
        const { username, password } = req.body;
        const existingUser = users.find((user) => {
          return user.username === username && user.password === password;
        });
        if (!username) throw new Error("username missing!");
        if (!password) throw new Error("Password missing!");
        if (!existingUser) throw new Error("Wrong username or password!");
        next()
      } catch (error) {
        res.status(403).send({
          data: null,
          success: false,
          message: error.message,
        });
      }
}