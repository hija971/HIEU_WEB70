import { users } from "../data/users.js";
import crypto from "crypto";

export const checkUserRequirements = (req, res, next) => {
    const { username, password, fullname } = req.body;
    const findUsername = users.find((user) => user.username === username);
    if (!username) return res.status(400).json({ message: "Username required" });
  
    if (findUsername)
      return res.status(401).json({ message: "Username already exists" });
  
    if (!/^[a-zA-Z0-9]+$/.test(username))
      return res.status(400).json({ message: "Incorrect username format" });
  
    if (!password) return res.status(400).json({ message: "Password required" });
  
    if (!/^[a-zA-Z]+$/.test(password) && !/^[0-9]+$/.test(password) || password.length < 6)
      return res.status(400).json({ message: "Incorrect password format" });
  
    req.newUser = {
      id: crypto.randomUUID(),
      username: username,
      password: password,
      fullname: fullname,
      apiKey: `${username}.${password}`,
    };
  
    next();
  };