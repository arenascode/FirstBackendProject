import {
  Router
} from "express";
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

routerProducts.post('/', async (req, res) => {
  try {
    const productToAdd = req.body
    const newProduct = await producstManager.addProduct(productToAdd)
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(400).json({
      msj: error.message
    })
  }
})

routerProducts.put("/:pid", async (req, res) => {
  const productToUpdate = req.params.pid;
  const dataToUpdate = req.body
  const updateProduct = await producstManager.updateProduct(productToUpdate, dataToUpdate)
  res.json(`The update of ${JSON.stringify(updateProduct.title)} was succesfull`)
});

routerProducts.delete("/:pid", async (req, res) => {
  try {
    const productToDelete = req.params.pid;
  const deletedProduct = await producstManager.deleteProduct(productToDelete)
  res.send(`the ${JSON.stringify(deletedProduct.title)} was deleted succesfull`)
  } catch (error) {
    res.status(400).json({
      msj: error.message
    })
  } });

export default routerProducts