import {Router} from "express";
import { controllerAddANewCart, controllerAddProductInCart, controllerDeleteAllProductsInCart, controllerDeleteProductInCart, controllerGetCartById, controllerGetCarts, controllerUpdateProductInCart } from "../../controllers/api/carts.controller.js";
import { authenticationJwtApi, authenticationJwtView } from "../../middlewares/passport.js";
import { checkItIsUser } from "../../middlewares/handlePolicies.js";

const routerCart = Router()

// to get a especific cart
routerCart.get('/:cid', controllerGetCartById);

// to get all carts
routerCart.get("/", controllerGetCarts);

// To add a new cart
routerCart.post('/', authenticationJwtApi, checkItIsUser, controllerAddANewCart) // Only User

// To update new product an existing cart
routerCart.post('/:cid',authenticationJwtApi, checkItIsUser, controllerAddProductInCart) // Only User

// to delete product in existing cart
routerCart.delete('/:cid/product/:pid', checkItIsUser, controllerDeleteProductInCart); // Only User

// to update product in cart 
routerCart.put('/:cid/product/:pid', checkItIsUser, controllerUpdateProductInCart); // Only User

// to delete all products in the cart
routerCart.delete('/:cid', checkItIsUser, controllerDeleteAllProductsInCart) // Only User

export default routerCart