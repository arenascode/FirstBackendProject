import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import Cart from "../../entities/Cart.js";
import productsDaoMongoDb from "../products/ProductsDaoMongoDb.js";
import { stringify } from "uuid";
import { winstonLogger } from "../../utils/logger.js";

const cartsCollection = "carts";
const cartsSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    products: {
      type: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            ref: "products"
          },
          quantity: { type: Number, required: true },
        },
      ],
      default: [],
    },
  },
  { versionKey: false }
);

cartsSchema.plugin(mongoosePaginate)

cartsSchema.pre(/^find/, function (next) {
this.populate('products._id')
next()
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

// -----*--------*---------*-----------*---------*

class CartsDaoMongoDb {
  constructor() {
    this.collection = cartsModel;
  }

  async saveNewCart(productIdToAdd, userId, userHasCart) {

    const product = {};
    const cart = new Cart(userId);
    //Nos aseguramos de saber si el carrito existe previamente para saber si creamos uno nuevo o lo actualizamos simplemente
    const cartExist = await this.collection.findOne({
      _id: userHasCart,
    });
    
    const searchedProduct = await productsDaoMongoDb.getById(productIdToAdd) 
    winstonLogger.info(`producto encontrado por ID ${searchedProduct}`);
    if (cartExist) {
      const productInCartExist = await this.collection.findOne({
        user: userId,
        products: {
          $elemMatch: {
            _id: searchedProduct._id,
          },
        },
      });

      if (productInCartExist) {
        await productInCartExist.products.forEach((element) => {
          if (element._id.equals(searchedProduct._id)) {
            element.quantity += 1;
          } else {
            winstonLogger.info(`element didn't found. Will be create`);
          }
        });
        await productInCartExist.save();
        return cartExist;
      } else {
        product._id = searchedProduct._id;
        product.quantity = 1;
        cartExist.products.push(product);
        await cartExist.save();
      }
    } else {
      // Si el carrito, producto no existe, lo agrega como nuevo objeto
      product._id = searchedProduct._id;
      product.quantity = 1;
      const cart = new Cart(userId);
      cart.products.push(product);
      const newCart = await this.collection.create(cart);
      const cartCreated = this.getCartById(newCart._id)
      winstonLogger.info(`${JSON.stringify(newCartcart)} fue agregado a la coleccion`);
      return cartCreated;
    }
  }

  async addProductToCart(productToCart, userId, cartId) {
    const idProduct = productToCart._id;
    const productInCartExist = await this.collection.findOne({
      _id: cartId,
      products: {
        $elemMatch: {
          _id: idProduct,
        },
      },
    });
    //winstonLogger.info(`I'm productInCartExist ${JSON.stringify(productInCartExist)}`);

    if (productInCartExist) {
      const productToUpdateCart = productInCartExist.products.find(
        (e) => e._id._id == idProduct
      );
      //winstonLogger.info(`I'm productToUpdateCart ${productToUpdateCart}`);
      productToUpdateCart.quantity += 1;
      await productInCartExist.save();
    } else {
      const newProductAdd = {
        _id: idProduct,
        quantity: 1,
      };
      const newProductAdded = await this.collection.findOneAndUpdate(
        { _id: cartId },
        { $push: { products: newProductAdd } },
        { new: true }
      );
    }
  }

  async getAllCarts(queryFilter, paginationOptions) {

    if (queryFilter) {

      const result = await this.collection.paginate(
        queryFilter,
        paginationOptions
      );
      return result;
    } else {
      const result = await this.collection.paginate({}, paginationOptions);
      return result;
    }
  }

  async getCartById(id) {
    const cartById = await this.collection.findById(id).populate("products._id").lean();
    // winstonLogger.info(`cartbyId mongo 124 ${JSON.stringify(cartById)}`);
    return cartById
  }

  async deleteItemInCart(cartId, productId) {
    const cid = cartId;
    const pidToDelete = productId;

    const cartExist = await this.collection.findOne({
      _id: cid,
      products: {
        $elemMatch: {
          _id: pidToDelete,
        },
      },
    });


    if (cartExist) {
      const productInCart = await cartExist.products.find(
        (e) => e._id == pidToDelete
      );
      winstonLogger.debug(productInCart);

      if (productInCart.quantity > 1) {
        productInCart.quantity -= 1;
        //winstonLogger.info(`Line 121 ${productInCart}`);
        await cartExist.save();
      } else {
        const newArray = cartExist.products.filter((p) => p._id != pidToDelete);
        cartExist.products = newArray;
        await cartExist.save();
        //winstonLogger.info(`new cartExist ${cartExist}`);
      }
      return await cartExist;
    } else {
      winstonLogger.error(`the product In cart Doesn't exist`);
    }
  }

  async updateCart(cid, dataToUpdate) {
    //winstonLogger.info(`LINE 140 CartsManager ${dataToUpdate}`);
    const updatedCart = await this.collection.findByIdAndUpdate(
      cid,
      { $set: dataToUpdate },
      { new: true },
    );
    return updatedCart
  }

  async deleteAllProductsInCart(cid) {
    const cartExist = await this.collection.findOne({ _id: cid });
    winstonLogger.info(`Line 170 CartsManag ${cartExist}`);

    const productsInCart = cartExist.products;
    winstonLogger.info(productsInCart);
    const emptyCart = this.collection.updateOne(
      { _id: cid },
      { $set: { products: [] } }
    );
    return await emptyCart;
  }
}

const cartsDaoMongoDb = new CartsDaoMongoDb();
export default cartsDaoMongoDb;
