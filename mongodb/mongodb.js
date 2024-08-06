import mongoose from "mongoose";
import {MONGO_URI} from "../config/config.js";




export const mongoDbConnection = async ()=>{
     try{
        await mongoose.connect(MONGO_URI);
         console.log('MongoDB Connected!');
     }catch (err){
       console.error(err);
     }
}