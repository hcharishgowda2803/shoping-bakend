import express from 'express';
import WishListController from "../controllers/wishListController.js";
import {handleError,response} from "../utils/response.js";


const router = express.Router();

router.post('/', async (req, res) => {
    let resourceController = new WishListController();
    if(!req.body.userId){
        return handleError(400, 'User id require',res);
    }
    if(!req.body.productDetails){
        return handleError(400, 'ProductDetails require',res);
    }
    resourceController.req_body = req.body;
    let result = await resourceController.createEntity();
    if(result.error){
        return handleError(result.status ? result.status : 500 , result.message,res)
    }
    return response(200, {data:result.data},res)
})


router.get('/',async (req,res)=>{
    let resourceController = new WishListController();
    resourceController.queryParams = req.query;
    let result = await resourceController.getAllResource({
        productDetails:""
    });
    if(result.error){
        return handleError(result.status ? result.status : 500 , result.message,res);
    }
    return response(200, {data:result.data},res)
})


router.delete('/:resource_id',async (req,res)=>{
    let resourceController = new WishListController();
    let result = await resourceController.deleteResource(req.params.resource_id);
    if(result.error){
        return handleError(result.status ? result.status : 500 , result.message,res)
    }

    return response(200, {data:result.data},res)
})

export default router;
