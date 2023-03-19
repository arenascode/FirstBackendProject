import productsManagerDB from "../manager/ProductsManager.js";

class ProductsService {
  async addNewProduct(dataNewProduct) {
    const productAdded = await productsManagerDB.guardar(dataNewProduct)
    return productAdded
  }
  async getProducts() {
    const productsDB = await productsManagerDB.getAll()
    return productsDB
  }
  async getProductById(id) {
    const productById = await productsManagerDB.getById(id)
    return productById
  }
  async updateById(id, dataToUpdate) {
    return await productsManagerDB.updateById(id, dataToUpdate)
  }
  async deleteById(id) {
    return await productsManagerDB.deleteProduct(id)
  }
} 

export const productsService = new ProductsService()