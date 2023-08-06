import { users } from "../data/users.js";

export const checkApiKey = (req, res, next) => {
  try {
    const { apiKey } = req.query;
    if (!apiKey) {
      throw new Error("Missing token");
    }
    const username = apiKey.split(".")[0];
    const findUsername = users.find((user) => user.username === username)
    if (!findUsername) {
      throw new Error("Not allowed")
    }
    next()
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
