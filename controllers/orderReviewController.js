import BaseController from "./BaseController.js";
import orderReviews from "../models/orderReviewModel.js";


class OrderReviewController extends BaseController {

    entityType = "orderReviews";
    entitySchema = "orderReviewModel";


    constructor() {
        super();
        super.initSchema(this.entityType,this.entitySchema,orderReviews)
    }

}

export default OrderReviewController