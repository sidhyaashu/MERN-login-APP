import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connectDB =async()=>{
    try {
        const mongod = await MongoMemoryServer.create()
        const getURI = mongod.getUri
        
        mongoose.set('strictQuery',true)
        const db = await mongoose.connect(getURI)
        console.log("Server Connected...!")
        return db
    } catch (error) {
        console.log(error)
    }
}


export default connectDB