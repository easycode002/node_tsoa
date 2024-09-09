import configs from "@/config";
import mongoose from "mongoose";

// Function handle db connection
async function connectToMongoDB() {
    try{
        await mongoose.connect(configs.mongodbUrl)
        console.log(`MongoDB is connected!`)
    }   catch(error){
        console.error(`connectToMongoDB method error:`,error)
        throw error;
    } 
}

// Export function
export default connectToMongoDB;