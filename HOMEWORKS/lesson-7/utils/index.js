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

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error: "Invalid token",
      });
    }

    const tokenUserId = decoded.userId;
    const paramsUserId = req.params.userId;
    if (tokenUserId !== paramsUserId) {
      return res.status(403).send({
        message: "Forbidden",
      });
    }
    next();
    //Since jwt.verify is an asynchronous operation, it takes some time to complete.
    //Meanwhile, if next() is put outside of verify the code execution continues,
    //it would be called before the verification is finished.
    //By moving the next() function call inside the jwt.verify callback,
    //you ensure that it is only invoked after the verification is completed and the authorization checks have passed.
  });
};

export { resClientData, authenticateToken, generateToken };
