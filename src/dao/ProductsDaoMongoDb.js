import mongoosePaginate from "mongoose-paginate-v2";
import mongoose from "mongoose";

const productsCollection = "products";
const productsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnails: {
      type: [String],
    },
  },
  { versionKey: false }
);
productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productsSchema);

//*-------*-------*-------*-------*-------*

export class ProductsDaoMongodb {
  constructor() {
    this.collection = productsModel;
  }
  // To manage Products
  async saveItem(registro) {
    //console.log(`vengo de ManagerMongoose ${JSON.stringify(registro)}`);

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
    const categoria = category;
    const orden = order;
    const limit = limite;
    const page = pagina;

    if (categoria || limit) {
      console.log(`soy categoria en getAll de ManagMongoo LINE 78 ${categoria}`);

      if (!limit) {
        if (orden) {
          return await this.collection.find().sort({ price: orden }).limit(10);
        } else {
          console.log(`else Line 84 ${categoria}`);
          const query = { category: categoria };
          const options = { limit: 10, page: 1, lean: true };
          const result = await this.collection.paginate( query, options)
          //console.log(`resultado consulta 86 ${result}`);
          return result;
        }
      } else {
        if (categoria) {
          console.log(`entré al if de la linea 135`);
          return await this.collection
            .find({ category: categoria })
            .sort({ price: orden })
            .limit(limit);
        } else {
          console.log(`entre en el else de la linea 141`);
          return await this.collection.paginate(
            {},
            { limit: limit, page: page }
          );
        }
      }
    } else {
      if (orden) {
        console.log(`entré al if de la linea 140`);
        if (categoria) {
          return await this.collection
            .find({ category: categoria })
            .sort({ price: orden });
        } else {
          console.log(`else linea 109`);
          return await this.collection.find().sort({ price: orden });
        }
      } else {
        console.log(`entre en el else en ManagerMongoose de la linea 112`);
        return await this.collection.paginate(
          {},
          { limit: 10, page: 1, lean: true }
        );
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

  // async insertMany(motos) {
  //   const products = motos
  //   const modifyProducts = products.map((p) => { p.status = true; return p })
  //   console.log(modifyProducts);
  //   return await this.collection.insertMany(modifyProducts);
  // }
}
const productsDaoMongoDb = new ProductsDaoMongodb();

export default productsDaoMongoDb;
// ostras