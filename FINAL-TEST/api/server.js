import 'dotenv/config'
import express from "express"
import cors from "cors"
import RootRouter from './routers/index.js'

const app = express()

const PORT = 5001
//connectDb() imported db function here
app.use(express.json())
app.use(cors())
app.use("/api/v1", RootRouter) //imported router here

app.listen(PORT, ()=>{
    console.log("Server is running on " + PORT)
})