import express from "express";

const app = express()
const PORT = 3001

app.get("/", (req, res)=>{
    res.send("WELCOME MTFAKKAAAA")
})

//API for post resource
app.get("/api/v1/post", (req, res, next)=>{

})

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})