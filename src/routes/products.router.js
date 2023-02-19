import { Router } from "express";
import ProductManager from "../manager/ProductManager.js"

const routerProducts = Router()

const producstManager = new ProductManager('./src/db/products.json')

async function controllerProducts(req, res) {
  const limit = parseInt(req.query.limit)
  const showProducts = await producstManager.getProducts()
  
  if (limit) {
    const limitedProducts = showProducts.splice(0, limit)
    res.json(limitedProducts)
  } else {
    res.json(showProducts)
  }
}
routerProducts.get('/', controllerProducts)

async function controllerProductById(req, res) {
  const idProduct = req.params.pid
  const showProductByID = await
  producstManager.getProductById(idProduct)
  res.json(showProductByID)
}
routerProducts.get('/:pid', controllerProductById)

routerProducts.post('/', (req, res) => {
  const productToAdd = req.body
  // here we add to our products.json a new product especified in body of peticion
})

routerProducts.put("/:id", (req, res) => {
  const productToUpdate = req.body;
  // here we update the products by id without modyfing their id.
});

routerProducts.delete("/", (req, res) => {
  const productToDelete = req.params.id;
  // here we add to our products.json a new product especified in body of peticion
});

export default routerProducts