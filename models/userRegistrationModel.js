import mongoose from "mongoose";


let userRegistrationSchema = new mongoose.Schema({

    _id:{
        type:String,
        require:true
    },
    fullName:{
      type:String,
      require:true
    },
    emailId :{
        type:String,
        require:true,
        unique:true
    },
    gender:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    created_at:{
        require:true,
        type:Number,
        default:Date.now()
    }
})

let userRegistrationModel = mongoose.model('userRegistrationModel',userRegistrationSchema,'userRegistrationModel');


export default userRegistrationModel