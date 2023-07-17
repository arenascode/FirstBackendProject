import { cartsRepository } from "../repositories/carts.repository.js";
import { productsRepository } from "../repositories/products.repository.js";
import { usersRepository } from "../repositories/users.repository.js";
import { winstonLogger } from "../utils/logger.js";

class CartsService {
  async addNewCart(productId, userId) {
    winstonLogger.debug(`LINE 6 cartsService ${JSON.stringify(productId)}`);
    const user = await usersRepository.findById(userId)
    winstonLogger.debug(`user searched in Mongo ${user}`)
    const productToAdd = await productsRepository.getProductById(productId)

    const userHasCart = user.cart? user.cart._id : null
    winstonLogger.debug(`I'm userHasCart CartsService ${JSON.stringify(userHasCart)}`);

    if (userHasCart) {
      if (productToAdd.owner  == userId)  throw new Error(`You can't add in the cart a product added by you. Add other product`)
      const productAdded = this.addProductToCart(productId, userId, userHasCart)
      return productAdded
    } else {
      const cartCreated = await cartsRepository.saveNewCart(productId, userId, userHasCart);
      winstonLogger.debug(`I'm cartCreated in C.Service ${cartCreated}`);
      await usersRepository.updateOneById(userId, {cart: cartCreated._id})
      return cartCreated
    }
  }
  async addProductToCart(productId, userId, cartId) {
    const productAdded = await cartsRepository.addProductToCart(productId, userId, cartId);
    return productAdded;
  }
  async showCarts(category, limit, page, order) {

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
    return await cartsRepository.showCarts(queryFilter, paginationOptions);
  }

  async showCartById(id) {
    const cartById = await cartsRepository.showCartById(id);
    // winstonLogger.debug(`I'm cartById ${cartById}`);
    return cartById
  }

  async deleteProductInCart(cartId, productId) {
    const cid = cartId;
    const pid = productId;
    winstonLogger.debug(`Line 25: cid ${cid}`);
    winstonLogger.debug(`Line 26: pid ${pid}`);
    const productEliminated = await cartsRepository.deleteProductInCart(cid, pid);
    return productEliminated;
  }

  async updateCart(cid, dataToUpdate) {
    const cartUpdated = await cartsRepository.update(
      cid,
      dataToUpdate
    );
    return cartUpdated;
  }

  async deleteAllProductsInCart(cid) {
    const cartId = cid;
    winstonLogger.debug(`LINE 40 of cartsService IDCart ${cartId}`);
    const emptyCart = await cartsRepository.deleteAllProductsInCart(cartId);
    return emptyCart;
  }
}

const cartsService = new CartsService();

export default cartsService;
