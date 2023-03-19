import mongoose from "mongoose"

export class ManagerMongoose {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, new mongoose.Schema(schema, {versionKey: false}))
  } 
  
  async guardar(registro) {
    console.log(`vengo de ManagerMongoose ${JSON.stringify(registro)}`);
    
    const codeProduct = registro.code
    // console.log(codeProduct);

    const productExist = await this.collection.findOne({ code: codeProduct })
    
    if (productExist) {
      console.log("This product Already Exist");
      // throw new Error('This product Already Exist')
    } else {
      console.log('the Product was created successfull');
      return await this.collection.create(registro)
    }
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

