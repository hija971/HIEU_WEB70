import express from "express";
import crypto from "crypto";
const app = express();

app.listen(5001, ()=>{
    console.log('server is running at port 5001')
})