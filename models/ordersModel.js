import mongoose from "mongoose";
let ordersModel = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.String,
        require: true,
        ref: "userRegistrationModel"
    },
    orderStatus: {
        type: String,
        require: true,
        enum:['accepted','delivered','cancelled']
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
    paymentType:{
        type:String,
        require:false,
        default:'COD'
    },
    paymentStatus:{
        type:String,
        require:false,
        enum:['paid','unpaid'],
        default:'unpaid'
    },
    orderDate:{
        type:Number,
        require:false,
        default:Date.now()
    },
    updatedDate:{
        type:Number,
        require:false,
        default:Date.now()
    },
    orderReviewId:{
        type:mongoose.Schema.Types.String,
        require:false,
        ref:'orderReviews',
    },
    orderReviewed:{
        type:Number,
        require:false,
        default:0
    }
})

let orders = mongoose.model('orders',ordersModel,'orders');

export default orders