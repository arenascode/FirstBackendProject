import { Router } from "express";
import CartManager from "../manager/CartManager.js";

const routerCart = Router()
const cartsManager = new CartManager('./src/db/carts.json')

routerCart.get('/', (req, res) => {
  // develop logic to show all products of ca
});

// routerCart.post('/', async (req, res) => {
//   const cartToAdd = req.body
//   await cartsManager.addCart(cartToAdd)
//   res.json(`the ${JSON.stringify(cartToAdd)} was added succesfull`)
// // develop logic to create a new cart
// })

routerCart.get('/:cid', (req, res) => {
  // Develop logic to show products of the cart id in the argument
})

routerCart.post('/:cid/product/:pid', (req, res) => {
  // Develop logic to add a product in a object to array with only id and quantity
})

export default routerCart

