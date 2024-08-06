import BaseController from "./BaseController.js";
import wishLists from "../models/wishListModel.js";

class WishListController extends BaseController {

    entityType = "wishLists";
    entitySchema = "wishListModelSchema";

    constructor() {
        super();
        super.initSchema(this.entityType, this.entitySchema,wishLists);
    }
}


export default WishListController