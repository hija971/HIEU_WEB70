import express from "express";
import RootRouterV1 from "./routers/index.js";
import { connectDb } from "./database/index.js";

const app = express()
connectDb()
const PORT = 5001

app.use(express.json())

app.use("/workbook5", RootRouterV1)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})