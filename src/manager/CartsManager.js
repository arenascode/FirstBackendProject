import mongoose from "mongoose";
import { Schema } from "mongoose";
import Cart from "./Cart.js"
import { productsSchema } from "./ProductsManager.js";
class cartManagerMongoose {
  constructor(CartCollection, schema) {
    this.collection = mongoose.model(
      CartCollection,
      new mongoose.Schema(schema, { versionKey: false })
    );
  }

  async saveNewCart(productToAdd) {
    console.log(`cartsmanager Line 14 ${JSON.stringify(productToAdd)}`);
    const product = {};
    const cart = new Cart();
    //Nos aseguramos de saber si el carrito existe previamente para saber si creamos uno nuevo o lo actualizamos simplemente
    const cartExist = await this.collection.findOne({
      user: productToAdd.user,
    });

    if (cartExist) {
      const productInCartExist = await this.collection.findOne({
        user: productToAdd.user,
        products: {
          $elemMatch: {
            _id: productToAdd._id,
          },
        },
      });

      if (productInCartExist) {
        await productInCartExist.products.forEach((element) => {
          if (element._id.equals(productToAdd._id)) {
            element.quantity += 1;
          } else {
            console.log(`element didn't found. Will be create`);
          }
        });
        await productInCartExist.save();
        return cartExist;
      } else {
        product._id = productToAdd._id;
        product.quantity = 1;
        cartExist.products.push(product);
        await cartExist.save();
      }
    } else {
      // Si el producto no existe, lo agrega como nuevo objeto
      product._id = productToAdd._id;
      product.quantity = 1;
      cart.user = productToAdd.user;
      cart.products.push(product);
      const newCart = await this.collection.create(cart);
      console.log(
        `El cart ${JSON.stringify(cart)} fue agregado a la coleccion`
      );
      return newCart;
    }
  }

  async addProductToCart(productToCart) {
    const idProduct = productToCart._id;
    console.log(idProduct);
    const productInCartExist = await this.collection.findOne({
      user: productToCart.user,
      products: {
        $elemMatch: {
          _id: idProduct,
        },
      },
    });
    console.log(productInCartExist);

    if (productInCartExist) {
      const productToUpdateCart = productInCartExist.products.find(
        (e) => e._id == idProduct
      );
      productToUpdateCart.quantity += 1;
      console.log(productToUpdateCart);
      await productInCartExist.save();
    } else {
      const newProductAdd = {
        _id: idProduct,
        quantity: 1,
      };
      const newProductAdded = await this.collection.findOneAndUpdate(
        { user: productToCart.user },
        { $push: { products: newProductAdd } },
        { new: true }
      );
    }
  }

  async getAllCarts (){
  return await this.collection.find().populate('products._id')
  }

  async getCartById(id) {
    return await this.collection.findById(id).populate('products._id')
  }

  async deleteItemInCart(cartId, productId) {
    const cid = cartId
    const pidToDelete = productId
    
    const cartExist = await this.collection.findOne({
      _id: cid,
      products: {
        $elemMatch: {
          _id: pidToDelete,
        },
      },
    });
    
    console.log(`Line 113: Cart ${cartExist}`);

    if (cartExist) {
      const productInCart = await cartExist.products.find((e) => e._id == pidToDelete)
      console.log(productInCart);

      if (productInCart.quantity > 1) {
        productInCart.quantity -= 1
        console.log(`Line 121 ${productInCart}`);
        await cartExist.save()
      } else {
        const newArray = cartExist.products.filter(p => p._id != pidToDelete)
        cartExist.products = newArray
        await cartExist.save()
        console.log(`new cartExist ${cartExist}`);
      }
      return await cartExist
    } else {
      console.log(`the product In cart Doesn't exist`);
    }
  }

  async update(cid, pid, dataToUpdate) {
    const cartId = cid
    const idProduct = pid;
    const quantityToUpdate = dataToUpdate.quantity
    console.log(`LINE 138 CartsManager ${idProduct}`);
    console.log(`LINE 140 CartsManager ${quantityToUpdate}`);
    console.log(`LINE 141 CartsManager ${JSON.stringify(quantityToUpdate)}`);

    const cartExist = await this.collection.findOne({
      _id: cartId,
      products: {
        $elemMatch: {
          _id: idProduct,
        },
      },
    });
    console.log(cartExist);

    if (cartExist) {
      const productToUpdateCart = cartExist.products.find(
        (e) => e._id == idProduct
      );
      console.log(`LINE 156 Carts Manager Product to update ${productToUpdateCart}`);
      const filtro = {_id: cartId, "products._id": idProduct}
      const result = await this.collection.updateOne(filtro, {
        $set: { "products.$.quantity": quantityToUpdate },
      });
      console.log(`Line 158 ${JSON.stringify(result)}`);
    } else {
      console.log(`Line 161: The cart doesn't exist`);
    }
  }

  async deleteAllProductsInCart(cid) {
    const cartExist = await this.collection.findOne({ _id: cid })
    console.log(`Line 170 CartsManag ${cartExist}`);

    const productsInCart = cartExist.products
    console.log(productsInCart);
    const emptyCart = this.collection.updateOne({ _id: cid }, { $set: { "products": [] } })
    return await emptyCart
  }
}

const cartsManagerDB = new cartManagerMongoose("carts", {
  user: { type: String },
  products: {
    type: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "products"
        },
        quantity: {type: Number, required: true}
      },
    ],
    default: []
  },
});

export default cartsManagerDB