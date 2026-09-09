import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";

async function ConnectDB() {
    try {
        
        await mongoose.connect(process.env.MONGODBURL)
        console.log("db connected");
        

    } catch (error) {
        console.log("db not connect", error);
        
    }
}
export default ConnectDB