import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Comments API");
});

export default router;