import productsDaoMongoDb from "../dao/products/ProductsDaoMongoDb.js";
import { productsRepository } from "../repositories/products.repository.js";

class ProductsService {
  
  async addNewProduct(dataNewProduct) {
    const productAdded = await productsRepository.createNewProduct(dataNewProduct);
    return productAdded;
  }
  
  async getProducts(category, limit, page, order) {
      const queryFilter = category;

      if (order === "undefined" || order == undefined) {
        order = 1;
      }

      if (isNaN(limit) || limit === "undefined") {
        limit = 10;
      }

      if (isNaN(page)) {
        page = 1;
      }
      const paginationOptions = {
        order: order,
        limit: limit,
        page: page,
        lean: true,
      };
    console.log(`Category en ProductService ${ category}`);
    console.log(`Soy order en product.service ${order}`);
    const ListOfProducts = await productsRepository.getAllProducts(queryFilter, paginationOptions)

    return ListOfProducts
      ;
  }

  async getProductById(productId) {
    const productById = await productsRepository.getById(productId);

    return productById;
  }

  async updateProductById(id, dataToUpdate) {
    return await productsDaoMongoDb.updateById(id, dataToUpdate);
  }

  async deleteProductById(id) {
    return await productsRepository.deleteProduct(id);
  }

  async deleteAll() {
    return await productsRepository.deleteAllProducts();
  }

  async insertMany(arrayOfProducts) {
    return await productsRepository.insertManyProducts(arrayOfProducts)
  }
}

export const productsService = new ProductsService();
