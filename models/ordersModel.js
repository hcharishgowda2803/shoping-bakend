import mongoose from "mongoose";


let ordersModelSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.String,
        require: true,
        ref: "users"
    },
    orderStatus: {
        type: String,
        require: true
    },
    cartId: {
        type: mongoose.Schema.Types.String,
        ref: 'userCart',
       require:true
    },
    addressId:{
        type:mongoose.Schema.Types.String,
        ref:'userAddress',
        require:true
    },
    orderDate:{
        type:Number,
        require:true,
        default:Date.now()
    },
    updatedDate:{
        type:Number,
        require:true,
        default:Date.now()
    }
})

let orders = mongoose.model('orders',ordersModelSchema,'orders');

export default orders