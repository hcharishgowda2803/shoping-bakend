import BaseController from "./BaseController.js";
import products from "../models/productsModel.js";


class ProductsController extends BaseController {

    entityType = "products";
    entitySchema = "productsModelSchema"

    constructor() {
        super();
        super.initSchema(this.entityType,this.entitySchema,products);
    }

}


export default ProductsController