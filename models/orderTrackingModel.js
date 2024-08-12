import mongoose from 'mongoose'


let orderTrackingSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    orderId:{
        type:mongoose.Schema.Types.String,
        require:true,
        ref:"orders"
    },
    status:{
        type:String,
        required:true,
        enum:['accepted','shipped','in transit','out for delivered','delivered','cancelled'],
    },
    createdAt:{
        type:Number,
        require:true,
        default:Date.now()
    }
})


const orderStatus = mongoose.model('orderStatus',orderTrackingSchema,'orderStatus');

export default orderStatus;