import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connnectDB= async()=>{
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        const connectioninstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MONGODB is connected successfully!!! DB_HOST: ${connectioninstance.connection.host}`);
    } catch (error) {
        console.log(DB_NAME);
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
}

export default connnectDB