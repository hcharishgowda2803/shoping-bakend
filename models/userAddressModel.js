import mongoose from "mongoose";


const userAddressModelSchema = new mongoose.Schema({
    _id:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true,
        ref:"userRegistrationModel"
    },
    homeDetails:{
        type:String,
        require:true
    },
    addressLine1:{
      type:String,
      require:true,
    },
    addressLine2:{
      type:String,
      require:true
    },
    state:{
        type:String,
        require:true
    },
    pinCode:{
        type:String,
        require:true
    },
    created_at:{
        type:Number,
        require:true,
        default:Date.now()
    }
})

let userAddress = mongoose.model('userAddress',userAddressModelSchema,'userAddress');

export default userAddress