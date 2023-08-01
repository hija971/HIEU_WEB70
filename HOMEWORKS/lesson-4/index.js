import express from "express";
import router from "./routes/index.js"

const app = express()
const PORT = 3001

app.use(express.json())

app.use("/api/v1", router)

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})