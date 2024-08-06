import mongoose from "mongoose";

const productsModelSchema = new mongoose.Schema({
    _id:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    discount:{
        type:Number,
        require:true
    },
    brand:{
        type:String,
        require:false
    },
    stock:{
        type:Number,
        require:true
    },
    imageUrl:{
        type:String,
        require:false
    },
    rating:{
        type:Number,
        require:true
    },
    color:{
        type:String,
        require:false
    },
    size:{
        type:String,
        require:false
    },
    material:{
        type:String,
        require:false
    },
    created_at:{
        type:Number,
        require:true
    }
})

let products = mongoose.model('products',productsModelSchema,'products');

export default products;