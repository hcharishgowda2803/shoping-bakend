import BaseController from "./BaseController.js";
import ProductsController from "./productsController.js";
import cartModel from "../models/cartModel.js";
import products from "../models/productsModel.js";


class CartController extends BaseController {

    entityType = "userCart";
    entitySchema = "CartSchema";

    constructor() {
        super();
        super.initSchema(this.entityType, this.entitySchema);
    }


    async checkOutOfStock(_id) {
        let product = new ProductsController();
        let result = await product.getResource(_id);
        if (result.error) {
            return {error: true, message: result.message ? result.message : 'Not found'}
        }
        if (result && result.data && result.data[0].stock > 0) {

            result.data[0].stock -= 1;
            product.req_body = {stock: result.data[0].stock}
            let updateResult = await product.updateResource(result.data[0]._id);
            if(updateResult.error){
                return {error:true,message: updateResult.message ? updateResult.message : 'Failed to update product stock'}
            }
            return {error: false, message: ''}
        } else {
            return {error: true, message: "Item is out of stock"}
        }

    }


    async prepareCart(user_id, product_id) {
        let userCart = await cartModel.findOne({userId: user_id}, {}, {}).exec();
        if (userCart && userCart._id) {
            let body = {};
            let items = userCart.items;
            let index = items.findIndex(item => item.product_id === product_id);
            if (index > -1) {
                items[index].quantity += 1
            } else {
                items.push({
                    product_id: product_id,
                    quantity: 1
                })
            }
            body['items'] = items;
            body['cartTotal'] = await this.calculateTotalAmount(items);
            body['userId'] = user_id;
            return {error: false, body: body, _id: userCart._id}
        } else {
            let item = [
                {
                    product_id: product_id,
                    quantity: 1
                }
            ];
            let body = {};
            body['userId'] = user_id;
            body['items'] = item;
            body['quantity'] = 1;
            body['cartTotal'] = await this.calculateTotalAmount(item)
            return {error: false, body: body, _id: null}
        }
    }


    async removeCartItems(cartInfo, product_id) {
        let items = cartInfo.items
        let findIndex = items.findIndex(item => item.product_id === product_id);
        if (findIndex > -1) {
            items[findIndex].quantity > 1 ? items[findIndex].quantity -= 1 : items.splice(findIndex,1)
            let product = await products.findOne({_id: product_id}, {}, {}).exec();
            product['stock'] += 1
            let productController = new ProductsController();
            productController.req_body = product
            await productController.updateResource(product_id)
            cartInfo['cartTotal'] = (items && items.length) ? await this.calculateTotalAmount(items) : 0;
            return {error: false, body: cartInfo}
        } else {
            return {error: true, message: 'Items not found in cart'}
        }
    }

    async calculateTotalAmount(items) {
        let cartTotal = 0
        await Promise.all(items.map(async (item) => {
            let productDetails = await products.findOne({_id: item.product_id}, {}, {}).exec();
            const discountMultiplier = productDetails.discount ? (1 - (productDetails.discount / 100)) : 1;
            cartTotal += productDetails.price * item.quantity * discountMultiplier;
        }))
        return cartTotal
    }


}


export default CartController

