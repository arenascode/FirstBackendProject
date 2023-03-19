import {
  Router
} from "express";
import productsManager from "../manager/ProductManager.js"
import { productsService } from "../services/products.service.js";

const routerProducts = Router()

// To show all products
async function controllerProducts(req, res) {
  try {
    const limit = parseInt(req.query.limit)
  const showProducts = await productsService.getProducts()
  if (limit) {
    const limitedProducts = showProducts.splice(0, limit)
    res.json(limitedProducts)
    // res.render("home", {products: limitedProducts})
  } else {
    // res.render("home", {products: showProducts});
    res.json(showProducts)
  }
  } catch (error) {
    res.status(400).json({
      msj: error.message,
    });
  }
  
}
routerProducts.get('/', controllerProducts)

async function controllerProductById(req, res) {
  try {
    const idProduct = req.params.pid
  const showProductByID = await
  productsService.getProductById(idProduct)
  res.json(showProductByID)
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
  
}
routerProducts.get('/:pid', controllerProductById)

// To add a new product
routerProducts.post('/', async (req, res) => {
  try {
    const productToAdd = req.body
    const newProduct = await productsService.addNewProduct(productToAdd)
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(400).json({
      msg: error.message
    })
  }
})

routerProducts.put("/:pid", async (req, res) => {
  try {
    const productToUpdate = req.params.pid;
  const dataToUpdate = req.body
  const updateProduct = await productsService.updateById(productToUpdate, dataToUpdate)
  res.json(
    `The update of ${dataToUpdate.title} ${dataToUpdate.description} was succesfull`
  );
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
  
});

routerProducts.delete("/:pid", async (req, res) => {
  try {
    const productToDelete = req.params.pid;
  const deletedProduct = await productsService.deleteById(productToDelete)
  res.send(
    `the product with ID: ${productToDelete} was deleted succesfull`
  );
  } catch (error) {
    res.status(400).json({
      msg: error.message
    })
  } });

export default routerProducts