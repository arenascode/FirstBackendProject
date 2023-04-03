import Cart from "../manager/Cart.js";
import cartsManagerDB from "../manager/CartsManager.js";

class CartsService {
  async addNewCart(newCart) {
  
    const cartAdded = await cartsManagerDB.saveNewCart(newCart)
    return cartAdded
  }
  async addProductToCart(newProduct) {
    
    const productAdded = await cartsManagerDB.addProductToCart(newProduct)
    return productAdded
  }
  async showCarts() {
    return await cartsManagerDB.getAllCarts()
  }
  async showCartById(id) {
    return await cartsManagerDB.getCartById(id)
  }

  async deleteProductInCart(identifiers) {
    const cid = identifiers.cid
    const pid = identifiers.pid
    return await cartsManagerDB.deleteItemInCart(cid, pid)
  }
}

const cartsService = new CartsService()

export default cartsService