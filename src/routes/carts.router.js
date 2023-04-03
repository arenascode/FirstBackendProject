import {Router} from "express";
import CartManager from "../manager/CartManager.js";
import cartsService from "../services/carts.service.js";

const routerCart = Router()
const cartsManager = new CartManager('./src/db/carts.json')

// to get a especific cart
routerCart.get('/:cid', async (req, res) => {
  try {
    const idCart = req.params.cid
    const cartById = await cartsService.showCartById(idCart)
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
    const carts = await cartsService.showCarts();
  res.json(carts);
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
});

// To add a new cart
routerCart.post('/', async (req, res) => {
  try {
    const productToCart = req.body
    await cartsService.addNewCart(productToCart)
    res.json(`the ${JSON.stringify(productToCart)} was added succesfull`)
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }

})
// To add new product an existing cart
routerCart.post('/:cid/product/:pid', async (req, res) => {
  try {
    // const idCart = req.params.cid
    // const idProduct = req.params.pid
    const productToAdd = req.body
    await cartsService.addProductToCart(productToAdd)
    res.json(`The product was added succesfull`)
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }

})
// to delete product in existing cart
routerCart.delete("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid
  console.log(cartId);
  const productId = req.params.pid
  console.log(productId);
  try {
    if (cartId && productId) {
      return await cartsService.deleteProductInCart(cartId, productId)
    } else {
      console.log(`missing data`);
    }
  } catch (error) {
    
  }
  res.status(204).json({cartID: cartId, productId: productId})
});

export default routerCart