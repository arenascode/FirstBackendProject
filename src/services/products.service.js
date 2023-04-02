import productsManagerDB from "../manager/ProductsManager.js";

class ProductsService {
  async addNewProduct(dataNewProduct) {
    const productAdded = await productsManagerDB.saveItem(dataNewProduct)
    return productAdded
  }
  async getProducts(category, limite, pagina, order) {
    const orden = order
    console.log(`Category en ProductService ${typeof category}`);
    // console.log(`paginationOptions en ProductService ${JSON.stringify(paginationOptions.limit)}`);
    console.log(`Soy order en product.service ${orden}`);
      return await productsManagerDB.getAll(
      category,
      limite,
      pagina,
      order
    );
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
  async deleteAll() {
    return await productsManagerDB.deleteAll()
  }
} 

export const productsService = new ProductsService()