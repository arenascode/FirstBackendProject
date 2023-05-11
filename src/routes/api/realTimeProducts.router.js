import { Router } from "express";
import { productsService } from "../../services/products.service.js";

const routerRealTimeProducts = Router()
// const producstManager = new ProductManager('./products.json')

routerRealTimeProducts.get('/', async (req, res) => {
  const products = await productsService.getProducts()
  res.render('realTimeProducts', {catalogue: products})
})

export default routerRealTimeProducts