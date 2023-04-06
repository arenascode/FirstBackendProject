import mongoose from "mongoose"
import Cart from "./Cart.js";

export class productsManagerMongoose {
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

  async getAll(category, limite, pagina, order) {
    const categoria = category
    const orden = order
    const limit = limite
    const page = pagina

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
        console.log(`entre en el else en ManagerMongoose de la linea 142`);
        return await this.collection.paginate({}, {limit: 10, page: 1, lean: true})
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