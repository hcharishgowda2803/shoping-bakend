import express from "express";
import UserRegistrationController from "../controllers/userRegistrationController.js";
import {handleError, response} from "../utils/response.js";


const router = express.Router();


router.post('/', async (req, res) => {
    let resourceController = new UserRegistrationController();
    resourceController.req_body = req.body;
    let validateResult = await resourceController.validateUser();
    if (validateResult.error) {
        return handleError(500, validateResult.message, res);
    }
    let result = await resourceController.createEntity();

    if (result.error) {
        return handleError(500, result.message, res)
    }
    return response(200, {data: result.data}, res)
})




router.post('/login', async (req, res) => {
    if(!req.body.emailId || !req.body.password){
        return handleError(500, 'Email and password id required',res);
    }
    let resourceController = new UserRegistrationController();
    resourceController.req_body = req.body;
    let result = await resourceController.login(req.body.emailId, req.body.password);
    if (result.error) {
        return handleError(500, result.message, res);
    }
    return response(200, {data: result.data}, res)
})


router.put('/:resource_id', async (req, res) => {
    let resourceController = new UserRegistrationController();
    let foundResult = await resourceController.getResource(req.params.resource_id);
    if(foundResult.error){
        return handleError(500,'User not found', res)
    }
    resourceController.req_body = req.body;
    let result = await resourceController.updateResource(req.params.resource_id);
    if(result.error){
        return handleError(result.status ? result.status : 500 , result.message , res)
    }
    return response(200, {data:result.data},res)
})



router.get('/:resource_id',async(req,res)=>{
    let resourceController = new UserRegistrationController();
    let result = await resourceController.getResource(req.params.resource_id);
    if(result.error){
        return handleError(result.status ? result.status : 500 , result.message , res);
    }
    return response(200,{data:result.data},res)
})




export default router