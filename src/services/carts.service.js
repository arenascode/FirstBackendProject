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
}
const cartsService = new CartsService()

export default cartsService