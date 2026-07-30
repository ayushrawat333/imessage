const express=require("express");
const app=express();
const cors=require("cors")
const dotenv=require("dotenv");
const connectDB=require("./lib/db")
const {clerkMiddleware}=require("@clerk/express")
const fs=require("fs");
const path=require("path");
// Load environment variables
dotenv.config();
const PORT=process.env.PORT
const FRONTEND_URL=process.env.FRONTEND_URL

const publicDir=path.join(process.cwd(),"public");

app.use(cors({origin:FRONTEND_URL,credentials:true}));
app.use(express.json())
app.use(clerkMiddleware())

//if the public directory exists, serve the static files
//this is for the production build
if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir))
    app.get("/{*any}",(req,res,next)=>{
        res.sendFile(path.join(publicDir,"index.html"),(err)=>next(err));
    })
}

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});


app.use((err,req,res,next)=>{
    let{status=500,message="internalServer error"}=err;
    console.log(message);
    res.status(status).json({message:message,success:false});
})
app.listen(PORT,()=>{
    console.log("server is runing on 8080 port")
    connectDB()
    console.log(process.env.PORT);
})
