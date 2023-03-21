import Cart from "../manager/Cart.js";
import cartsManagerDB from "../manager/CartsManager.js";

class CartsService {
  async addNewCart(newCart) {
    // const idProduct = await cartsManagerDB.getById(newItemCart._id)
    console.log(`vengo de CartsService ${JSON.stringify(newCart)}`);
    const cartAdded = await cartsManagerDB.saveNewCart(newCart)
    // const createdCart = await cartsManagerDB.saveCart(newItemCart)
    // return createdCart
  }
}
const cartsService = new CartsService()

export default cartsService