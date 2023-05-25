import Cart from "../entities/Cart.js";
import cartsDaoMongoDb from "../dao/cart/CartsDaoMongoDb.js";
import { cartsRepository } from "../repositories/carts.repository.js";
import { usersRepository } from "../repositories/users.repository.js";

class CartsService {
  async addNewCart(productToCart, userId) {
    winstonLogger.debug(`LINE 6 cartsService ${JSON.stringify(productToCart)}`);
    const user = await usersRepository.findById(userId)
    const userHasCart = user.cart? user.cart._id : null
    winstonLogger.debug(`I'm userHasCart CartsService ${JSON.stringify(userHasCart)}`);
    const cartAdded = await cartsRepository.saveNewCart(productToCart, userId, userHasCart);
    winstonLogger.debug(`I'm cartAdded in C.Service ${cartAdded}`);
    await usersRepository.updateOneById(userId, {cart: cartAdded._id})
    return cartAdded;
  }
  async addProductToCart(newProduct, userId, cartId) {
    const productAdded = await cartsRepository.addProductToCart(newProduct, userId, cartId);
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
    winstonLogger.debug(`I'm cartById ${cartById}`);
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
