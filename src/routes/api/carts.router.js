import {Router} from "express";
import { controllerAddANewCart, controllerDeleteAllProductsInCart, controllerDeleteProductInCart, controllerGetCartById, controllerGetCarts, controllerUpdateCartById, controllerUpdateProductInCart } from "../../controllers/api/carts.controller.js";

const routerCart = Router()

// to get a especific cart
routerCart.get('/:cid', controllerGetCartById);

// to get all carts
routerCart.get("/", controllerGetCarts);

// To add a new cart
routerCart.post('/', controllerAddANewCart)

// To update new product an existing cart
routerCart.put('/:cid/', controllerUpdateCartById)

// to delete product in existing cart
routerCart.delete('/:cid/product/:pid', controllerDeleteProductInCart);

// to update a cart 
routerCart.put('/:cid/product/:pid', controllerUpdateProductInCart);

// to delete all products in the cart
routerCart.delete('/:cid', controllerDeleteAllProductsInCart)

export default routerCart