import { dbCollection } from "../database/index.js";

const checkUserRequirements = async (req, res, next) => {
  try {
    const { username, password, fullname } = req.body;
    const users = await dbCollection.users.find().toArray();
    const findUsername = users.find(
      (user) => user.username === username
    );

    if (findUsername)
      return res.status(401).json({ message: "Username already exists" });

    if (!username)
      return res.status(400).json({ message: "Username required" });

    if (!/^[a-zA-Z0-9]+$/.test(username))
      return res.status(400).json({ message: "Incorrect username format" });

    if (!password)
      return res.status(400).json({ message: "Password required" });

    if (
      (!/^[a-zA-Z]+$/.test(password) && !/^[0-9]+$/.test(password)) ||
      password.length < 6
    )
      return res.status(400).json({ message: "Incorrect password format" });

    req.newUser = {
      username: username,
      password: password,
      fullname: fullname,
    };

    next();
  } catch (error) {
    res.status(501).send({
      message: error.message,
    });
  }
};

export default checkUserRequirements;
