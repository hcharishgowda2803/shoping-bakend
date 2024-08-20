import mongoose from 'mongoose'


let wishListModelSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.String,
        require:true,
        ref:"userRegistrationModel"
    },
    productDetails:{
        type:mongoose.Schema.Types.String,
        require:true,
        ref:"products"
    },
    created_at:{
        type:Number,
        require:false,
        default:Date.now()
    }
})

let wishLists = mongoose.model('wishLists',wishListModelSchema,'wishLists');

export default wishLists