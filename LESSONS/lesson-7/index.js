import express from "express";
import RootRouterV1 from "./routes/index.js";
import { connectDb } from "./database/index.js";

const app = express();
connectDb()
const PORT = 5001;
app.use(express.json());

app.use("/api", RootRouterV1);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
