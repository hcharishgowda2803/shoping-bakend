import express from "express";
import OrdersController from "../controllers/ordersController.js";
import {handleError, response} from "../utils/response.js";



const router = express.Router();

router.post('/', async(req,res)=>{
    let resourceController = new OrdersController();
    if(!req.body.userId){
        return handleError(400, 'User Id require', res);
    }
    resourceController.req_body = req.body;
    let result = await resourceController.createEntity();
    if(result.error){
        return handleError(500, 'InternalServer Error' ,res)
    }
    return response(200,{data:result.data},res)
})


router.get('/', async(req,res)=>{
    let resourceController = new OrdersController();
    resourceController.queryParams = req.query;
    let result = await resourceController.getAllResource();
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
    let result = await resourceController.getResource(req.params.result);
    if(result.error){
        return handleError(500,result.error,res);
    }
    return response(200, {data:result.data},res)
})







export default router