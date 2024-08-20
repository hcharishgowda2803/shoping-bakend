import BaseController from "./BaseController.js";
import userRegistrationModel from "../models/userRegistrationModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {secret_key} from "../config/config.js";


class UserRegistrationController extends BaseController {

    entityType = 'userRegistrationModel';
    entitySchema = 'userRegistrationSchema'


    constructor() {
        super();
        super.initSchema(this.entityType, this.entitySchema)
    }


//     validate and generate hashed password
    async validateUser() {
        if (!this.schemaDetails) {
            return {error: true, message: 'Schema not initialized'}
        }
        if (!this.req_body.emailId) {
            return {error: true, message: 'Email Id require'}
        }
        let user = await userRegistrationModel.findOne({emailId: this.req_body.emailId}, {}, {}).exec();
        if (user) {
            return {error: true, message: 'User already exits'}
        }
        this.req_body.password = await this.bcrypt(this.req_body.password);
        return {error: false, message: ''}
    }


    async bcrypt(password) {
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hashSync(password, salt)
        } catch (error) {
            return error
        }
    }


    async login() {
        let {emailId, password} = this.req_body;
        const userData = await userRegistrationModel.findOne({emailId: emailId}, {}, {}).exec();
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                let token = await this.signToken(userData._id);
                return {error: false, data: {token: token, user_id: userData._id}}
            }
        } else {
            return {error: true, message: 'User not exits'}
        }
    }




    async signToken(id){
        try{
            let payLoad = {
             resource_id:id
            }
            return jwt.sign(payLoad, secret_key, {expiresIn: '1h'})
        } catch (error) {
            console.error('Error signing JWT token:', error.message);
            return {error:true, message:''};
        }

    }


}


export default UserRegistrationController