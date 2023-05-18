import productsDaoMongoDb from "../dao/products/ProductsDaoMongoDb.js"

class ProductsRepository {
  constructor(daoSelected) {
    this.dao = daoSelected
  }

  async createNewProduct(dataNewProduct) {
    const createdProduct = await this.dao.saveItem(dataNewProduct)
    return createdProduct
  }
  
  async getAllProducts(queryFilter, paginationOptions) {
    const productsList = await this.dao.getAll(queryFilter, paginationOptions)
    return productsList
  }

  async getProductById(productId) {
    const productById = await this.dao.getById(productId)
    return productById
  }

  async updateProduct(productId, dataToUpdate) {
    const updatedProduct = await this.dao.updateById(productId, dataToUpdate)
    return updatedProduct
  }

  async deleteProduct(productId) {
    const deletedProduct = await this.dao.deleteProduct(productId)
    return deletedProduct
  }

  async deleteAllProducts() {
    const deletedProducts = await this.dao.deleteAll()
    return deletedProducts
  }

  async insertManyProducts(arrayOfProducts) {
    const productsAdded = await this.dao.insertMany(arrayOfProducts)
    return productsAdded
  }
}

export const productsRepository = new ProductsRepository(productsDaoMongoDb)