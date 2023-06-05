import { Router } from "express";
import {
  controllerAddNewProduct,
  controllerDeleteProductById,
  controllerGetProductById,
  controllerGetProducts,
  controllerUpdateProductById,
} from "../../controllers/api/products.controller.js";
import { authenticationJwtApi } from "../../middlewares/passport.js";
import {
  checkItIsAdmin,
  checkItIsPremium,
} from "../../middlewares/handlePolicies.js";

export const routerProducts = Router();

// To show all products
routerProducts.get("/", controllerGetProducts);

// to get one product by ID
routerProducts.get("/:pid", controllerGetProductById);

// To add a new product
routerProducts.post(
  "/",
  authenticationJwtApi,
  checkItIsAdmin,
  controllerAddNewProduct
); // Only Admin & Premium user

// To update a product
routerProducts.put(
  "/:pid",
  authenticationJwtApi,
  checkItIsAdmin,
  controllerUpdateProductById
); // Only Admin

// To Delete a product
routerProducts.delete(
  "/:pid",
  authenticationJwtApi,
  checkItIsAdmin,
  controllerDeleteProductById
); //Only Admin

export default routerProducts;
