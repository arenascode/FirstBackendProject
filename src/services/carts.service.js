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
    return await cartsManagerDB.getAll()
  }
  async showCartById(id) {
    return await cartsManagerDB.getById(id)
  }
}
const cartsService = new CartsService()

export default cartsService