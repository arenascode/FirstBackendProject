import Cart from "../entities/Cart.js";
import cartsDaoMongoDb from "../dao/cart/CartsDaoMongoDb.js";
import { cartsRepository } from "../repositories/carts.repository.js";

class CartsService {
  async addNewCart(productToCart, userId) {
    console.log(`LINE 6 cartsService ${JSON.stringify(productToCart)}`);
    const cartAdded = await cartsRepository.saveNewCart(productToCart, userId);
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
    return await cartsRepository.showCartById(id);
  }

  async deleteProductInCart(cartId, productId) {
    const cid = cartId;
    const pid = productId;
    console.log(`Line 25: cid ${cid}`);
    console.log(`Line 26: pid ${pid}`);
    const productEliminated = await cartsRepository.deleteProductInCart(cid, pid);
    return productEliminated;
  }

  async updateCart(cid, productToUpdate, quantityToUpdate) {
    const newQuantity = quantityToUpdate;
    const itemToUpdate = productToUpdate;
    const idCartToUpdate = cid;
    const cartUpdated = await cartsRepository.update(
      idCartToUpdate,
      itemToUpdate,
      newQuantity
    );
    return cartUpdated;
  }

  async deleteAllProductsInCart(cid) {
    const cartId = cid;
    console.log(`LINE 40 of cartsService IDCart ${cartId}`);
    const emptyCart = await cartsRepository.deleteAllProductsInCart(cartId);
    return emptyCart;
  }
}

const cartsService = new CartsService();

export default cartsService;
