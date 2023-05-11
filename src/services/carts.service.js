import Cart from "../entities/Cart.js";
import cartsManagerDB from "../manager/CartsManager.js";

class CartsService {
  async addNewCart(newCart) {
    console.log(`LINE 6 cartsService ${JSON.stringify(newCart)}`);
    const cartAdded = await cartsManagerDB.saveNewCart(newCart);
    return cartAdded;
  }
  async addProductToCart(newProduct) {
    const productAdded = await cartsManagerDB.addProductToCart(newProduct);
    return productAdded;
  }
  async showCarts() {
    return await cartsManagerDB.getAllCarts();
  }
  async showCartById(id) {
    return await cartsManagerDB.getCartById(id);
  }

  async deleteProductInCart(cartId, productId) {
    const cid = cartId;
    const pid = productId;
    console.log(`Line 25: cid ${cid}`);
    console.log(`Line 26: pid ${pid}`);
    const productEliminated = await cartsManagerDB.deleteItemInCart(cid, pid);
    return productEliminated;
  }

  async updateCart(cid, productToUpdate, quantityToUpdate) {
    const newQuantity = quantityToUpdate;
    const itemToUpdate = productToUpdate;
    const idCartToUpdate = cid;
    const cartUpdated = await cartsManagerDB.update(
      idCartToUpdate,
      itemToUpdate,
      newQuantity
    );
    return cartUpdated;
  }

  async deleteAllProductsInCart(cid) {
    const cartId = cid;
    console.log(`LINE 40 of cartsService IDCart ${cartId}`);
    const emptyCart = await cartsManagerDB.deleteAllProductsInCart(cartId);
    return emptyCart;
  }
}

const cartsService = new CartsService();

export default cartsService;
