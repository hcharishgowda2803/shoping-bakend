import mongoose from 'mongoose'

let orderReviewModel = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.String,
        require: true,
        ref: 'orders'
    },
    rating:{
        type:Number,
        default:0,
        require:true,
        max:5,
    },
    review:{
        type:String,
        require:true
    },
    createdAt:{
        type:Number,
        require:false,
        default:Date.now,
    }

})
let orderReviews = mongoose.model('orderReviews',orderReviewModel,'orderReviews');

export default orderReviews;