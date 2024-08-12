import express  from 'express';
import OrderTrackingController from "../controllers/orderTrackingController.js";
import {handleError,response} from "../utils/response.js";


const router = express.Router();



router.post('/', async (req, res) => {
    let resourceController = new OrderTrackingController();
    if(!req.body.orderId){
        return handleError(400, 'Order Id require',res);
    }
    resourceController.req_body = req.body;
    let result = await resourceController.createEntity();
    if(result.error){
        return handleError(result.status ? result.status : 500 , result.message,res)
    }
    return response(200, {data: result.data}, res)
})


router.get('/:id', async(req,res)=>{
    let resourceController = new OrderTrackingController();
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
        return handleError(500,result.message,res);
    }
    return response(200, {data: result.data},res)
})

router.put('/:id',async(req,res)=>{
    let resourceController = new OrderTrackingController();
    resourceController.req_body = req.body;
    let result = await resourceController.updateResource();
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
    return response(200, 'Successfully deleted',res)
})


export default router;