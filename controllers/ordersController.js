import BaseController from "./BaseController.js";

class OrdersController extends BaseController {

    entityType='orders';
    entitySchema = 'ordersModelSchema';


    constructor() {
        super();
        super.initSchema(this.entityType,this.entitySchema);
    }





}


export default OrdersController