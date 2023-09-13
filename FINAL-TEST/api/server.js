import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import RootRouter from "./routers/index.js";

const app = express();
dotenv.config();

//Connect to DB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.log(err));

const PORT = 8800;

app.use(express.json());
app.use("/api", RootRouter);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
