import productsDaoMongoDb from "../dao/products/ProductsDaoMongoDb.js";

class ProductsService {
  async addNewProduct(dataNewProduct) {
    const productAdded = await productsDaoMongoDb.saveItem(dataNewProduct);
    return productAdded;
  }
  
  async getProducts(category, limit, page, order) {
    console.log(`Category en ProductService ${ category}`);
    console.log(`Soy order en product.service ${order}`);
    const resultDao = await productsDaoMongoDb.getAll(category, limit, page, order)
    return resultDao
      ;
  }

  async getProductById(id) {
    const productById = await productsDaoMongoDb.getById(id);
    return productById;
  }

  async updateById(id, dataToUpdate) {
    return await productsDaoMongoDb.updateById(id, dataToUpdate);
  }

  async deleteById(id) {
    return await productsDaoMongoDb.deleteProduct(id);
  }

  async deleteAll() {
    return await productsDaoMongoDb.deleteAll();
  }

  async insertMany(arrayOfProducts) {
    return await productsDaoMongoDb.insertMany(arrayOfProducts)
  }
}

export const productsService = new ProductsService();
