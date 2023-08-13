import jwt from "jsonwebtoken";

const SECRET_KEY = "132^&@454#$^654#%8545?/";

export const generateToken = (data, res) => {
  const token = jwt.sign(data, SECRET_KEY, {
    expiresIn: 500,
  });
  return token;
};

export const authenticateToken = (req, res, next) => {
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
    next();
  });
};
