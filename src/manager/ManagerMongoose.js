import mongoose from "mongoose"
import Cart from "./Cart.js";

export class ManagerMongoose {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(
      collectionName,
      new mongoose.Schema(schema, {
        versionKey: false,
      })
    );
  }
  // To manage Products
  async saveItem(registro) {
    console.log(`vengo de ManagerMongoose ${JSON.stringify(registro)}`);

    const codeProduct = registro.code;
    console.log(codeProduct);

    const productExist = await this.collection.findOne({
      code: codeProduct,
    });
    console.log(`este es product exist ${productExist}`);

    if (productExist) {
      console.log("This product Already Exist");
      // throw new Error('This product Already Exist')
    } else {
      console.log("the Product was created successfull");
      return await this.collection.create(registro);
    }
  }
  // To add New Cart
  async saveNewCart(productToAdd) {
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

  async getAll(category, limite, pagina, order) {
    const categoria = category
    const orden = order
    const limit = limite
    const page = pagina
    console.log(`soy category en manager ${categoria}`);
    console.log(`soy orden en mongoose ${orden}`);
    console.log(`soy limit en mongoose ${limit}`);
    console.log(`soy page en mongoose ${page}`);
    // const { limit, page } = paginationOptions;
    if (categoria || limit) {
      console.log(`soy orden en getAll de ManagMongoo ${orden}`);
      
      if (!limit) {
        if (orden) {
          return await this.collection.find().sort({ price: orden }).limit(10);
        } else {
          return await this.collection.find({category: categoria})
        }
      } else {
        if (categoria) {
          console.log(`entré al if de la linea 135`);
          return await this.collection.find(
            { category: categoria },
          ).sort({price: orden}).limit(limit);
        } else {
          console.log(`entre en el else de la linea 141`);
          return await this.collection.paginate({}, {limit: limit, page: page})
        }
      }
    } else {
      if (orden) {
        console.log(`entré al if de la linea 140`);
        if (categoria) {
          return await this.collection.find({category: categoria}).sort({price: orden})
        } else {
          return await this.collection.find().sort({price: orden})
        }
      } else {
        console.log(`entre en el else de la linea 142`);
        return await this.collection.paginate({}, {limit: 10, page: 1})
      }
    }
  }

  async getById(id) {
    return await this.collection.findById(id);
  }
  async updateById(id, dataToUpdate) {
    return await this.collection.updateOne(
      {
        _id: id,
      },
      dataToUpdate
    );
  }

  async deleteProduct(id) {
    return await this.collection.deleteOne({
      _id: id,
    });
  }

  async deleteAll() {
    await this.collection.deleteMany({});
  }
}