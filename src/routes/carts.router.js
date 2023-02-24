import { Router } from "express";
import CartManager from "../manager/CartManager.js";

const routerCart = Router()
const cartsManager = new CartManager('./src/db/carts.json')

routerCart.get('/:cid', async (req, res) => {
  const idProduct = req.params.cid

  if (!idProduct) {
    console.log('This Cart doesnt exists');
  } 
  const showCart = await cartsManager.showCart()
  // develop logic to show all products of cart
  res.json(showCart)
});


routerCart.post('/', async (req, res) => {
  const productToCart = req.body
  console.log(`Line 21 OF Cart.Router ${productToCart}`);
  await cartsManager.addCart(productToCart)
  res.json(`the ${JSON.stringify(productToCart)} was added succesfull`)
// develop logic to create a new cart
})

// routerCart.get('/:cid', (req, res) => {
//   // Develop logic to show products of the cart id in the argument
// })

routerCart.post('/:cid/product/:pid', (req, res) => {
  // Develop logic to add a product in a object to array with only id and quantity
})

export default routerCart

