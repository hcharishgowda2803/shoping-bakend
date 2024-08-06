import express from "express";
import ProductsController from "../controllers/productsController.js";
import {handleError, response} from "../utils/response.js";



const router = express.Router();

router.post('/',async (req,res)=>{
    let resourceController = new ProductsController();
    resourceController.req_body = req.body;
    let result = await resourceController.createEntity();
    if(result.error){
        return handleError(result.status ? result.status : 500 , result.message, res);
    }
    return response(200, {data:result.data},res);
})


router.get('/',async (req,res)=>{
    let resourceController = new ProductsController();
    resourceController.queryParams = req.query;
    resourceController.sortParams = {created_at:-1};
    let result = await resourceController.getAllResource();
    if(result.error){
        return handleError(result.status ? result.status : 500 , result.message,res);
    }
    return response(200,{data:result.data},res)
})

router.get("/:resource_id", async(req,res)=>{
    let resourceController = new ProductsController();
    let result = await resourceController.getResource(req.params.resource_id);
    if(result.error){
        return handleError(result.status ? result.status : 500 , result.message,res);
    }
    return response(200,{data:result.data},res)
})


router.put('/:resource_id', async(req,res)=>{
    let resourceController = new ProductsController();
    let foundResult = await resourceController.getResource(req.params.resource_id);
    if(foundResult.error){
        return handleError(result.status ? result.status : 500 , result.message,res)
    }
    resourceController.req_body = req.body
    let result = await resourceController.updateResource(req.params.resource_id);
    if(result.error){
        return handleError(result.status ? result.status : 500 , result.message,res);
    }
    return response(200,{data:result.data},res)
})


router.delete('/:resource_id', async (req,res)=>{
    let resourceController = new ProductsController();
    let result = await resourceController.deleteResource(req.params.resource_id);
    if(result.error){
        return handleError(result.status ? result.status : 500 , result.message,res);
    }
    return response(200,'Resource Deleted Successfully',res)
})



export default router