import mongoose from "mongoose"
import Cart from "./Cart.js";

export class ManagerMongoose {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, new mongoose.Schema(schema, {versionKey: false}))
  } 
  // To manage Products
  async saveItem(registro) {
    console.log(`vengo de ManagerMongoose ${JSON.stringify(registro)}`);
    
    const codeProduct = registro.code
    console.log(codeProduct);

    const productExist = await this.collection.findOne({ code: codeProduct })
    console.log(`este es product exist ${productExist}`);
    
    if (productExist) {
      console.log("This product Already Exist");
      // throw new Error('This product Already Exist')
    } else {
      console.log('the Product was created successfull');
      return await this.collection.create(registro)
    }
  }
  // To add New Cart
  async saveNewCart(productToAdd) {
    console.log(`Soy el productToAdd ${JSON.stringify(productToAdd)}`);
    console.log(`Soy el id del PTAdd ${productToAdd._id}`);
    
    const product = {}
    const cart = new Cart()
    
    
    const productInCartExist = cart.products.find((e) => e._id == productToAdd._id)
    console.log(`Soy productInCarExist ${productInCartExist}`);
    
    if (!productInCartExist) {
      product._id = productToAdd._id
      product.quantity = 1
      cart.products.push(product)
    } else {
      cart.products[0].quantity += 1
    }
    console.log(`soy cart en managerMongoose ${JSON.stringify(cart)}`);
    // const newCart = await this.collection.create(cart)

  }

  async addProductToCart(cid, pid) {
    const productToAddCart = pid // continue here
    console.log(`Vengo de addProductToCart ${productToAddCart}`);
    const cartExist = this.collection.findById(cid)
    console.log(`Soy cartExist ${cartExist}`);

    const productExist = await this.collection.findOne(productToAddCart)
    console.log(`productExist in saveCart  ${productExist}`);
    
    // console.log(`I came from saveCart in ManagerMongoose ${productToAddCart}`);
  }

  async getAll() {
    return await this.collection.find({}).lean()
  }
  
  async getById(id) {
    return await this.collection.findById(id)
  }
  async updateById(id, dataToUpdate) {
    return await this.collection.updateOne({_id: id}, dataToUpdate)
  }

  async deleteProduct(id) {
    return await this.collection.deleteOne({_id: id})
  }
 }

