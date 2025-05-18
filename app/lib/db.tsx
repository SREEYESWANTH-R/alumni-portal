import mongoose from "mongoose";


export const connectDB = async()=>{
    const uri = process.env.MONGO_URI;
    console.log(uri)
    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
  
    try {
        
        await mongoose.connect(uri);
        console.log("Database Connected");
    } catch (error:unknown) {
        if(error instanceof Error) console.log(error.message)
    }
}

