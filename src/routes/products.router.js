import {
  Router
} from "express";
import productsManager from "../manager/ProductManager.js"
import { productsService } from "../services/products.service.js";

const routerProducts = Router()

// To show all products
async function controllerProducts(req, res) {
  const limite = parseInt(req.query.limit)
  console.log(limite);
  const pagina = parseInt(req.query.page)
  console.log(pagina);
  const category = req.query.category
  console.log(category);
  const order = req.query.sort
  console.log(`soy order en router ${order}`);
      try {
        const showProducts = await productsService.getProducts(category, limite, pagina, order)
        // const limitedProducts = showProducts.splice(0, limite)
        res.json(showProducts)
        // res.render("home", {products: limitedProducts})
        
      } catch (error) {
        res.status(400).json({
          msg: error.message
        });
      }
}

routerProducts.get('/', controllerProducts)

// to get one product by ID
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
// To update a product
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
// To Delete a product
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