import BaseController from "./BaseController.js";
import userAddress from "../models/userAddressModel.js";


class UserAddressController extends BaseController {

     entityType = 'userAddress';
     entitySchema = 'userAddressModelSchema';


     constructor() {
         super();
         super.initSchema(this.entityType,this.entitySchema)
     }



}



export default UserAddressController