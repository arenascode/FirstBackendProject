import mongoose from "mongoose"
import Cart from "./Cart.js";

export class ManagerMongoose {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, new mongoose.Schema(schema, {
      versionKey: false
    }))
  }
  // To manage Products
  async saveItem(registro) {
    console.log(`vengo de ManagerMongoose ${JSON.stringify(registro)}`);

    const codeProduct = registro.code
    console.log(codeProduct);

    const productExist = await this.collection.findOne({
      code: codeProduct
    })
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
    //Nos aseguramos de saber si el carrito existe previamente para saber si creamos uno nuevo o lo actualizamos simplemente.
    const cartExist = await this.collection.findOne({
      user: productToAdd.user,
    }, );
    console.log(`Soy cartExist ${typeof cartExist}`);

    if (cartExist) {
      const productInCartExist = await this.collection.findOne({
        user: productToAdd.user,
        products: {
          $elemMatch: {
            _id: productToAdd._id
          }
        },
      });
      console.log(` Soy ProductInCartExist ${productInCartExist}`);

      if (productInCartExist) {
        await productInCartExist.products.forEach((element) => {
          if (element._id.equals(productToAdd._id)) {
            element.quantity += 1
          } else {
            console.log(`element didn't found. Will be create`);
          }
        });
        await productInCartExist.save()
        console.log(
          `el producto en el cart ya existe, se actualizará la cantidad. Producto actualizado: `);
        return cartExist
      } else {
        product._id = productToAdd._id;
        product.quantity = 1;
        cartExist.products.push(product)
        await cartExist.save()
      }
    } else {
      // Si el producto no existe, lo agrega como nuevo objeto
      product._id = productToAdd._id
      product.quantity = 1
      cart.user = productToAdd.user
      cart.products.push(product)
      const newCart = await this.collection.create(cart)
      console.log(`El cart ${JSON.stringify(cart)} fue agregado a la coleccion`);
      return newCart
    }
    // if (!productInCartExist) {
    //   product._id = productToAdd._id
    //   product.quantity = 1
    //   cart.user = productToAdd.user
    //   cart.products.push(product)
    //   const newCart = await this.collection.create(cart)
    // } else {
    //   cart.products[0].quantity += 1
    // }
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
    return await this.collection.updateOne({
      _id: id
    }, dataToUpdate)
  }

  async deleteProduct(id) {
    return await this.collection.deleteOne({
      _id: id
    })
  }

}