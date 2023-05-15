import {Router} from "express";
import { controllerAddANewCart, controllerAddProductInCart, controllerDeleteAllProductsInCart, controllerDeleteProductInCart, controllerGetCartById, controllerGetCarts, controllerUpdateProductInCart } from "../../controllers/api/carts.controller.js";
import { authenticationJwtApi, authenticationJwtView } from "../../middlewares/passport.js";

const routerCart = Router()

// to get a especific cart
routerCart.get('/:cid', controllerGetCartById);

// to get all carts
routerCart.get("/", controllerGetCarts);

// To add a new cart
routerCart.post('/', authenticationJwtApi, controllerAddANewCart)

// To update new product an existing cart
routerCart.post('/:cid',authenticationJwtApi, controllerAddProductInCart)

// to delete product in existing cart
routerCart.delete('/:cid/product/:pid', controllerDeleteProductInCart);

// to update product in cart 
routerCart.put('/:cid/product/:pid', controllerUpdateProductInCart);

// to delete all products in the cart
routerCart.delete('/:cid', controllerDeleteAllProductsInCart)

export default routerCart