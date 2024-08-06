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
        if(result.error){
            return {error:true , message:result.message? result.message : 'Not found'}
        }
        if(result && result.data && result.data[0].stock > 0){
            result.data[0].stock -= 1;
            product.req_body = {stock:result.data[0].stock}
          await product.updateResource(result.data[0]._id);
            return {error:false,message:''}
        }else{
            return {error:true, message:"Item is out of stock"}
        }

    }


    async prepareCart(user_id,product_id){
      let userCart = await cartModel.findOne({userId:user_id},{},{}).exec();
      if(userCart && userCart._id){
          let body ={};
          let items = userCart.items;
          let index = items.findIndex(item => item.product_id === product_id);
          if(index > -1){
              items[index].quantity += 1
          }else {
              items.push({
                  product_id: product_id,
                  quantity: 1
              })
          }
          body['items'] = items;
          let productDetails = await products.findOne({_id:product_id},{},{}).exec();
          let productPrice = productDetails.price
          if(productDetails && productDetails.discount){
              productPrice = (1 * productDetails.price) * (productDetails.discount/100);
          }
          body['cartTotal'] = userCart.cartTotal + productPrice
          return {error:false,body:body,_id:userCart._id}
      }else {
        let item = [
            {
                product_id:product_id,
                quantity:1
            }
        ];
        let body = {};
        body['userId']= user_id;
        body['items'] = item;
        body['quantity'] = 1;
        let productDetails = await products.findOne({_id:product_id},{},{}).exec();
        if(productDetails && productDetails.discount){
            body['cartTotal'] = (1 * productDetails.price) * (productDetails.discount/100);
        }
          body['cartTotal'] = 1 * productDetails.price
        return {error:false, body:body,_id:null}

      }
    }


}


export default CartController

