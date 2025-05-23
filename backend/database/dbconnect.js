import mongoose from "mongoose";

export const connectTo = async()=> {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected to database')
    }catch(err){
        console.log('error in connection to database')
    }
}