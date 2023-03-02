import { Router } from "express";
import productsManager from "../manager/ProductManager.js";

const routerRealTimeProducts = Router()
// const producstManager = new ProductManager('./products.json')

routerRealTimeProducts.get('/', async (req, res) => {
  const products = await productsManager.getProducts()
  res.render('realTimeProducts', {catalogue: products})
})

export default routerRealTimeProducts