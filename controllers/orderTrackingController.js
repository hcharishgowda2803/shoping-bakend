import BaseController from "./BaseController.js";
import orderStatus from "../models/orderTrackingModel.js";


class OrderTrackingController extends  BaseController {

    entityType = 'orderStatus';
    entitySchema = 'orderTrackingSchema';

    constructor() {
        super();
        super.initSchema(this.entityType,this.entitySchema,orderStatus)

    }

}


export default OrderTrackingController;