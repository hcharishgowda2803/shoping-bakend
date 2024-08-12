import BaseController from "./BaseController.js";


class OrderTrackingController extends  BaseController {

    entityType = 'orderStatus';
    entitySchema = 'orderTrackingSchema';

    constructor() {
        super();
        super.initSchema(this.entityType,this.entitySchema)

    }

}


export default OrderTrackingController;