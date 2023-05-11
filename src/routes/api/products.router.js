import {
  Router
} from "express";
import { controllerAddNewProduct, controllerDeletProductById, controllerGetProductById, controllerGetProducts, controllerUpdateProductById } from "../../controllers/api/products.controller.js";

export const routerProducts = Router()

// To show all products
routerProducts.get('/', controllerGetProducts)

// to get one product by ID
routerProducts.get('/:pid', controllerGetProductById)

// To add a new product
routerProducts.post('/', controllerAddNewProduct)

// To update a product
routerProducts.put("/:pid", controllerUpdateProductById);

// To Delete a product
routerProducts.delete("/:pid", controllerDeletProductById);

export default routerProducts