import express from "express";
import RootRouterV1 from "./routes/index.js";
import { connectDb } from "./database/index.js";

const app = express();
connectDb()
app.use(express.json());

const PORT = 5001;
app.use("/api/v1", RootRouterV1);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
