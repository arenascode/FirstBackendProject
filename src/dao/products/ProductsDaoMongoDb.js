import mongoosePaginate from "mongoose-paginate-v2";
import mongoose from "mongoose";
import Product from "../../entities/Product.js";

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

class ProductsDaoMongodb {
  constructor() {
    this.collection = productsModel;
  }
  // To manage Products
  async saveItem(productToSave) {
    //console.log(`vengo de ManagerMongoose ${JSON.stringify(registro)}`);

    const codeProduct = productToSave.code;
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
      const validatedProduct = new Product(productToSave)
      return await this.collection.create(validatedProduct);
    }
  }

  async getAll(queryFilter, paginationOptions) {
    
    if (queryFilter) {
      console.log(`if linea 90 MONGO`);
      const result = await this.collection.paginate(queryFilter, paginationOptions)
      return result
    } else {
      console.log(`else Linea 94 Mongo`);
      const result = await this.collection.paginate({}, paginationOptions)
      return result
    }
  }

  async getById(id) {
    return await this.collection.findById(id);
  }
  async updateById(id, dataToUpdate) {
    return await this.collection.findByIdAndUpdate(id, {$set: dataToUpdate,});
  }

  async deleteProduct(id) {
    return await this.collection.deleteOne({
      _id: id,
    });
  }

  async deleteAll() {
    await this.collection.deleteMany({});
  }
  
  async findByCode(code) {
    return await this.collection.findOne(code)
  }

  async insertMany(arrayOfProducts) {
    const products = arrayOfProducts
    const modifyProducts = products.map((p) => { p.status = true; return p })
    console.log(modifyProducts);
    return await this.collection.insertMany(modifyProducts);
  }
}

const productsDaoMongoDb = new ProductsDaoMongodb();
export default productsDaoMongoDb;
