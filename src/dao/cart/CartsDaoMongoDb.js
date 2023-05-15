import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import Cart from "../../entities/Cart.js";
import productsDaoMongoDb from "../products/ProductsDaoMongoDb.js";

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

// cartsSchema.pre(/^find/, function (next) {
//   this.populate('products._id')
//   next()
// })

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

// -----*--------*---------*-----------*---------*

class CartsDaoMongoDb {
  constructor() {
    this.collection = cartsModel;
  }

  async saveNewCart(productToAdd, userId) {
    console.log(`cartsmanager Line 14 ${JSON.stringify(productToAdd.user)}`);
    const product = {};
    const cart = new Cart(userId);
    //Nos aseguramos de saber si el carrito existe previamente para saber si creamos uno nuevo o lo actualizamos simplemente
    const cartExist = await this.collection.findOne({
      user: userId,
    });
    console.log(`I'm cartExist ${cartExist}`);
    const searchedProduct = await productsDaoMongoDb.findByCode({ code: productToAdd.code }) // when I'll do a FE change this for search by ID
    console.log(`producto encontrado por código ${searchedProduct}`);
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
            console.log(`element didn't found. Will be create`);
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
      console.log(
        `El cart ${JSON.stringify(cart)} fue agregado a la coleccion`
      );
      return newCart;
    }
  }

  async addProductToCart(productToCart, userId, cartId) {
    const idProduct = productToCart._id;
    console.log(idProduct);
    const productInCartExist = await this.collection.findOne({
      _id: cartId,
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
        { _id: cartId },
        { $push: { products: newProductAdd } },
        { new: true }
      );
    }
  }

  async getAllCarts(queryFilter, paginationOptions) {

    if (queryFilter) {
      console.log(`if linea 131 MONGO`);
      const result = await this.collection.paginate(
        queryFilter,
        paginationOptions
      );
      return result;
    } else {
      console.log(`else Linea 138 Mongo`);
      const result = await this.collection.paginate({}, paginationOptions);
      console.log(result);
      return result;
    }
  }

  async getCartById(id) {
    const cartById = await this.collection.findById(id).populate("products._id").lean();
    console.log(`cartbyId mongo 124 ${JSON.stringify(cartById)}`);
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

    console.log(`Line 113: Cart ${cartExist}`);

    if (cartExist) {
      const productInCart = await cartExist.products.find(
        (e) => e._id == pidToDelete
      );
      console.log(productInCart);

      if (productInCart.quantity > 1) {
        productInCart.quantity -= 1;
        console.log(`Line 121 ${productInCart}`);
        await cartExist.save();
      } else {
        const newArray = cartExist.products.filter((p) => p._id != pidToDelete);
        cartExist.products = newArray;
        await cartExist.save();
        console.log(`new cartExist ${cartExist}`);
      }
      return await cartExist;
    } else {
      console.log(`the product In cart Doesn't exist`);
    }
  }

  async updateCart(cid, pid, dataToUpdate) {
    const cartId = cid;
    const idProduct = pid;
    const quantityToUpdate = dataToUpdate.quantity;
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
      console.log(
        `LINE 156 Carts Manager Product to update ${productToUpdateCart}`
      );
      const filtro = { _id: cartId, "products._id": idProduct };
      const result = await this.collection.updateOne(filtro, {
        $set: { "products.$.quantity": quantityToUpdate },
      });
      console.log(`Line 158 ${JSON.stringify(result)}`);
    } else {
      console.log(`Line 161: The cart doesn't exist`);
    }
  }

  async deleteAllProductsInCart(cid) {
    const cartExist = await this.collection.findOne({ _id: cid });
    console.log(`Line 170 CartsManag ${cartExist}`);

    const productsInCart = cartExist.products;
    console.log(productsInCart);
    const emptyCart = this.collection.updateOne(
      { _id: cid },
      { $set: { products: [] } }
    );
    return await emptyCart;
  }
}

const cartsDaoMongoDb = new CartsDaoMongoDb();
export default cartsDaoMongoDb;
