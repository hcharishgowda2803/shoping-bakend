import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.String,
        ref:"userRegistrationModel",
        require:true
    },
    items: [
        {
            product_id:{
                type:mongoose.Schema.Types.String,
                ref:"products",
                require:true
            },
            quantity:{
                type:Number,
                require:true
            },
        }
    ],
    cartTotal:{
        type:Number,
        require:true
    },
    created_at:{
        type:Number,
        require:true,
        default: Date.now()
    }
})

const userCart = mongoose.model('userCart',CartSchema,'userCart');

export default userCart;