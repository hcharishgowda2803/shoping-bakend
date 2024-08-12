import BaseController from "./BaseController.js";
import orders from "../models/ordersModel.js";

class OrdersController extends BaseController {

    entityType='orders';
    entitySchema = 'ordersModel';


    constructor() {
        super();
        super.initSchema(this.entityType,this.entitySchema,orders);
    }





}


export default OrdersController