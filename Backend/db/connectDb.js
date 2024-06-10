import mongoose from "mongoose";


const connectMongoose = async()=>{
    try {
     const connection =   await mongoose.connect(process.env.MONGODB_URI)
     console.log("Database successfully connected")
        
    } catch (error) {
        console.log("error connecting to db", error)
throw new Error("Failed to connect to db")    

    }

}


export default connectMongoose;