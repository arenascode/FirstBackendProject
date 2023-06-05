import Product from "../entities/Product.js";
import { productsRepository } from "../repositories/products.repository.js";
import { usersRepository } from "../repositories/users.repository.js";
import { winstonLogger } from "../utils/logger.js";

class ProductsService {
  async addNewProduct(dataNewProduct, userId) {
    const userExist = await usersRepository.findById(userId);
    const productToAdd = new Product(dataNewProduct);

    if (!userExist) throw new Error("The user doesn't exist");

    if (userExist.role === "premium") {
      productToAdd.owner = userId;
    }

    const productAdded = await productsRepository.createNewProduct(
      productToAdd
    );

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
    winstonLogger.debug(`Category en ProductService ${category}`);
    winstonLogger.debug(`Soy order en product.service ${order}`);
    const ListOfProducts = await productsRepository.getAllProducts(
      queryFilter,
      paginationOptions
    );

    return ListOfProducts;
  }

  async getProductById(productId) {
    const productById = await productsRepository.getProductById(productId);

    return productById;
  }

  async updateProductById(id, dataToUpdate) {
    return await productsRepository.updateProduct(id, dataToUpdate);
  }

  async deleteProductById(id, user) {
    const productToDelete = await productsRepository.getProductById(id);
    console.log(`i'm productToDelete ${productToDelete}`);

    if ((user._id === productToDelete.owner)) {
      // throw new Error(`You don't have permission to delete this product`);
      console.log(`deleted by premium`);
      return await productsRepository.deleteProduct(id);
    } else {
      if (user.role === 'admin') {
        console.log(`deleted By Admin`);
      return await productsRepository.deleteProduct(id);
      } else {
        throw new Error(`You don't have permission to delete products`)
      }
    }

  }

  async deleteAll() {
    return await productsRepository.deleteAllProducts();
  }

  async insertMany(arrayOfProducts) {
    return await productsRepository.insertManyProducts(arrayOfProducts);
  }
}

export const productsService = new ProductsService();
