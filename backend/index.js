const express=require("express");
const app=express();
const cors=require("cors")
const dotenv=require("dotenv");
// Load environment variables
dotenv.config();
const PORT=process.env.PORT
console.log(process.env.DB_URL)
app.listen(PORT,()=>console.log("server is runing on 8080 port"))