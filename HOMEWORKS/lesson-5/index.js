import express from "express";
import router from "./routes/index.js";

const app = express();
const PORT = 5001;

app.use(express.json());

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
