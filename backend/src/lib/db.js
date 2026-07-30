const mongoose=require("mongoose");
const dotenv=require("dotenv");
const expressError=require("../middleware/expressError");
// Load environment variables
dotenv.config();

MONGO_URL=process.env.MONGO_URL;
async function connectDB() {
    try{
        if(!MONGO_URL){
           throw new expressError(500,"Mongo_uri is required") 
        }
        const conn=await mongoose.connect(MONGO_URL);
        console.log(`MongoDB connected`,conn.connection.host);
    }
    catch(err){
        console.log("database connection error")
    }
    
}
module.exports=connectDB;