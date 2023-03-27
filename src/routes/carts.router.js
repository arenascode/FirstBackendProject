import {Router} from "express";
import CartManager from "../manager/CartManager.js";

const routerCart = Router()
const cartsManager = new CartManager('./src/db/carts.json')

// to get a especific cart
routerCart.get('/:cid', async (req, res) => {
  try {
    const idCart = req.params.cid
    const cartById = await cartsManager.showCartById(idCart)
    res.json(cartById)
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }
});
// to get all carts
routerCart.get("/", async (req, res) => {
  try {
    const carts = await cartsManager.showCart();
  res.json(carts);
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
});

// To add a new cart
routerCart.post('/', async (req, res) => {
  try {
    const productToCart = req.body
    console.log(`Line 21 OF Cart.Router ${productToCart}`);
    await cartsManager.addCart(productToCart)
    res.json(`the ${JSON.stringify(productToCart)} was added succesfull`)
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }

})

routerCart.post('/:cid/product/:pid', async (req, res) => {
  try {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    await cartsManager.addProductToCart(idCart, idProduct)
    res.json(`The product was added succesfull`)
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }

})

export default routerCart