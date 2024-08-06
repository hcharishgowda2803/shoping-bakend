import express from 'express';
import CartController from "../controllers/cartController.js";
import {handleError, response} from "../utils/response.js";
import result from "jsonwebtoken/lib/JsonWebTokenError.js";


const router = express.Router();


router.get('/', async (req, res) => {
    let resourceController = new CartController();
    resourceController.queryParams = req.query;

    let result = await resourceController.getAllResource();
    if (result.error) {
        return handleError(result.status ? result.status : 500, result.message, res);
    }

    return response(200, {data: result.data}, res)

})


router.post('/', async (req, res) => {
    let resourceController = new CartController();
    if (!req.body.userId) {
        return handleError(400, 'User id is require', res);
    }
    if (!req.body.productDetails) {
        return handleError(400, 'ProductDetails require', res);
    }
    let outOfStock = await resourceController.checkOutOfStock(req.body.productDetails);
    if (outOfStock.error) {
        return handleError(500, outOfStock.message, res)
    }
    let cartItems = await resourceController.prepareCart(req.body.userId, req.body.productDetails);
    if (cartItems.error) {
        handleError(500, 'internal server error', res)
    }
    if (cartItems.body && cartItems._id) {
        resourceController.req_body = cartItems.body;
        let result = await resourceController.updateResource(cartItems._id);
        if (result.error) {
            return handleError(500, 'Internal server error', res)
        }
        return response(200, {data: result.data}, res)
    } else if (cartItems.body) {
        resourceController.req_body = cartItems.body
        let result = await resourceController.createEntity();
        if (result.error) {
            return handleError(500, 'Internal server error', res)
        }

        return response(200, {data: result.data}, res)
    }

})


router.get('/:resource_id', async (req,res)=>{
    let resourceController = new CartController();
    let result = await resourceController.getResource(req.params.resource_id);
    if(result.error){
        return handleError(500, 'Internal server error', res)
    }
    return response(200,{data:result.data},res)
})



router.put('/:resource_id', async (req, res) => {
    let resourceController = new CartController();
    if (!req.body.productDetails) {
        return handleError(400, 'Product id is require', res);
    }
    let foundResult = await resourceController.getResource(req.params.resource_id);
    if (foundResult.error) {
        return handleError(foundResult.status ? foundResult.result : 500, foundResult.message ? foundResult.message : 'Internal Server Error', res);
    }
    if(foundResult && foundResult.data && !foundResult.data.length){
        return handleError(400,'Resource not found',res)
    }
    let updatedResult = await resourceController.removeCartItems(foundResult.data[0], req.body.productDetails);
    if(updatedResult.error){
        return handleError(500,updatedResult.message,res)
    }
    if(updatedResult.body){
        resourceController.req_body = updatedResult.body
        let result = await resourceController.updateResource(req.params.resource_id);
        if(result.error){
           return  handleError(500, result.message , res)
        }
        return response(200,{data:result.data},res)
    }else{
        return handleError(500,'Cart update failed',res)
    }
})



export default router;