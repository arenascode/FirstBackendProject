import { Router } from "express";
import ProductManager from "../manager/ProductManager.js";

const routerViews = Router()
const producstManager = new ProductManager()

routerViews.get('/', (req, res) => {
  producstManager.getProducts()
})

export default routerViews