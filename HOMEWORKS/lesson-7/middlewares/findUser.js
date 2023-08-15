import { dbCollection } from "../database/index.js";
import { generateToken } from "../utils/index.js";

const findUserByCredentials = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const users = await dbCollection.users.find().toArray();
    if (username && password) {
      const existingUser = users.find(
        (user) => user.username === username && user.password === password
      );
      if (existingUser) {
        const userId = existingUser._id;
        const token = generateToken({ userId: userId });
        res.send({ token });
        return;
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

export default findUserByCredentials;
