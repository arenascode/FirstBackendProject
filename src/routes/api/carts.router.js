import {Router} from "express";
import * as cartsController from "../../controllers/api/carts.controller.js";
import { authenticationJwtApi } from "../../middlewares/passport.js";
import { checkItIsUser } from "../../middlewares/handlePolicies.js";

const routerCart = Router()

// Get Cart By ID
routerCart.get('/:cid', cartsController.GetCartById);

// to get all carts
routerCart.get("/", cartsController.GetCarts);

// To add a new cart
routerCart.post('/', authenticationJwtApi, checkItIsUser, cartsController.AddANewCart) // Only User

// To update new product an existing cart
routerCart.post('/:cid',authenticationJwtApi, checkItIsUser, cartsController.AddProductInCart) // Only User

// to delete product in existing cart
routerCart.delete("/:cid/product/:pid",authenticationJwtApi,checkItIsUser,cartsController.DeleteProductInCart); // Only User

// to update product in cart 
routerCart.put("/:cid/product/:pid",authenticationJwtApi,checkItIsUser,cartsController.UpdateProductInCart); // Only User

// to delete all products in the cart
routerCart.delete("/:cid",authenticationJwtApi,checkItIsUser,cartsController.DeleteAllProductsInCart); // Only User

// To purchase a cart
routerCart.get("/:cid/purchase",authenticationJwtApi,checkItIsUser,cartsController.confirmPurchase);

export default routerCart