import { Router } from "express";
import
  * as productsController from "../../controllers/api/products.controller.js";
import { authenticationJwtApi } from "../../middlewares/passport.js";
import {
  checkItIsAdmin,
  checkItIsAdminOrPremium,
  checkItIsPremium,
} from "../../middlewares/handlePolicies.js";

export const routerProducts = Router();

// To show all products
routerProducts.get("/", productsController.GetProducts);

// to get one product by ID
routerProducts.get("/:pid", productsController.GetProductById);

// To add a new product
routerProducts.post(
  "/",
  authenticationJwtApi,
  checkItIsAdminOrPremium, productsController.AddNewProduct
); // Only Admin & Premium user

// To update a product
routerProducts.put(
  "/:pid",
  authenticationJwtApi,
  checkItIsAdmin,
  productsController.UpdateProductById
); // Only Admin

// To Delete a product
routerProducts.delete(
  "/:pid",
  authenticationJwtApi,
  checkItIsAdmin,
  productsController.DeleteProductById
); //Only Admin

export default routerProducts;
