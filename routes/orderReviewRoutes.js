import express from 'express';
import OrderReviewController from "../controllers/orderReviewController.js";
import {handleError,response} from "../utils/response.js";
import OrderTrackingController from "../controllers/orderTrackingController.js";
import OrdersController from "../controllers/ordersController.js";
import mongoose from "mongoose";



const router = express.Router();


router.post('/', async (req, res) => {
    let resourceController = new OrderReviewController();
    if(!req.body.orderId){
        return handleError(400,'Order Id require',res);
    }
    resourceController.req_body = req.body;
    let result = await resourceController.createEntity();
    if(result.error){
        return handleError(500, result.message, res);
    }
    if(!result.error && result.data){
      let orderController = new OrdersController();
        orderController.req_body = {
          orderReviewId:result.data._id,
          orderReviewed:1
      }
      let findOrder = await orderController.getResource(req.body.orderId);
        if(!findOrder.error && findOrder.data && findOrder.data._id && !findOrder.data.orderReviewed){
            let updateOrder = await orderController.updateResource(req.body.orderId);
        }else{
            return handleError(500,'Review already given',res)
        }
        return response(200, {data: result.data}, res)
    }

})


router.get('/:id', async(req,res)=>{
    let resourceController = new OrderReviewController();
    let result = await resourceController.getResource(req.params.id);
    if(result.error){
        return handleError(500,result.message,res);
    }
    return response(200, {data: result.data},res)
})


router.get('/',async(req,res)=>{
    let resourceController = new OrderTrackingController();
    resourceController.queryParams = req.query;
    let result = await resourceController.getAllResource();
    if(result.error){
        return handleError(500,result.message, res);
    }
    return response(200, {data: result.data},res)
})


router.put('/:id',async(req,res)=>{
    let resourceController = new OrderTrackingController();
    resourceController.req_body = req.body;
    let result = await resourceController.updateResource(req.params.id);
    if(result.error){
        return handleError(500,result.message,res);
    }
    return response(200, {data: result.data},res)
})



router.delete('/:id',async(req,res)=>{
    let resourceController = new OrderTrackingController();
    let result = await resourceController.deleteResource(req.params.id);
    if(result.error){
            return handleError(500,result.message,res);
    }
    return response(200, {data: result.data},res)
})








export default router;