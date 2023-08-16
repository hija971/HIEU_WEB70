import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const resClientData = (res, status, data, message) => {
  res.status(status).send({
    data: data ? data : null,
    success: !!data,
    message: message ? message : data ? "Success" : "Fail",
  });
};

const generateToken = (data) => {
  const token = jwt.sign(data, SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  jwt.verify(token, SECRET_KEY, (err) => {
    if (err) {
      return res.status(401).send({
        error: "Invalid token",
      });
    }
  });
  next();
};

export { resClientData, authenticateToken, generateToken };
