import express from "express";
import OrdersController from "../controllers/ordersController.js";
import {handleError, response} from "../utils/response.js";
import orderTrackingController from "../controllers/orderTrackingController.js";



const router = express.Router();

router.post('/', async(req,res)=>{
    let resourceController = new OrdersController();
    if(!req.body.userId){
        return handleError(400, 'User Id require', res);
    }
    resourceController.req_body = req.body;
    let result = await resourceController.createEntity();
    if(result.error){
        return handleError(500, result.message?result.message : 'Internal server error' ,res)
    }
    if(!result.error && result.data){
        let orderTracking = new orderTrackingController();
        orderTracking.req_body = {
            orderId:result.data.id,
            status:'accepted'
        }
        let updateTracking = await orderTracking.createEntity();
    }
    return response(200,{data:result.data},res)
})


router.get('/', async(req,res)=>{
    let resourceController = new OrdersController();
    resourceController.queryParams = req.query;
    let result = await resourceController.getAllResource(
        {
            addressId:"",
            cartId:"",
            orderReviewId:""
        }
    );
    if(result.error){
        return handleError(500,result.error,res);
    }
    return response(200, {data:result.data},res)
})

router.put('/:_id',async(req,res)=>{
    let resourceController = new OrdersController();
    resourceController.req_body = req.body;
    let result = await resourceController.updateResource(req.params._id);
    if(result.error){
        return handleError(500,result.error,res);
    }
    return response(200, {data:result.data},res)
})


router.get('/:resource_id',async(req,res)=>{
    let resourceController = new OrdersController();
    let result = await resourceController.getResource(req.params.resource_id,{
        addressId:"",
        cartId:"",
        orderReviewId:""
    });
    if(result.error){
        return handleError(500,result.error,res);
    }
    return response(200, {data:result.data},res)
})







export default router