import {Router} from "express";
import cartsService from "../../services/carts.service.js";

const routerCart = Router()

// to get a especific cart
routerCart.get('/:cid', async (req, res) => {
  try {
    const idCart = req.params.cid
    const cartById = await cartsService.showCartById(idCart)
    const arrayOfProducts = []
    const productsOfCart = cartById.products.forEach(e => {
      const product = {
        name: e._id.title,
        description: e._id.description,
        price: e._id.price,
        category: e._id.category,
        quantity: e.quantity
      }
      arrayOfProducts.push(product)
    });
    res.render('carts', {
          pageTitle: 'Your Cart',
          cartExist: Boolean(cartById),
          cart: arrayOfProducts
        })
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }
});
// to get all carts
routerCart.get("/", async (req, res) => {
  try {
    const carts = await cartsService.showCarts();
  res.json(carts);
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
});

// To add a new cart
routerCart.post('/', async (req, res) => {
  try {
    const productToCart = req.body
    await cartsService.addNewCart(productToCart)
    res.json(`the ${JSON.stringify(productToCart)} was added succesfull`)
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }

})
// To update new product an existing cart
routerCart.put('/:cid/', async (req, res) => {
  try {
    // const idCart = req.params.cid
    // const idProduct = req.params.pid
    const productToAdd = req.body
    await cartsService.addProductToCart(productToAdd)
    res.json(`The product was added succesfull`)
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }

})
// to delete product in existing cart
routerCart.delete('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid
    console.log(cartId);
    const productId = req.params.pid
    console.log(productId);

    if (cartId && productId) {
      await cartsService.deleteProductInCart(cartId, productId)
      res.status(200).json({ msg: 'product delete successfull'})
    } else {
      console.log(`missing data`);
    }
  } catch (error) {
    res.status(400).json({
      msg: error.message
    })
  }
  // res.json(`the product with ID ${productId} in Cart with ID ${cartId} was deleted.`)
});
// to update a cart 
routerCart.put('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = req.params.cid
    const productToUpdate = req.params.pid
    const quantityToUpdate = req.body
    await cartsService.updateCart(cid, productToUpdate, quantityToUpdate)
    res.json(`the cart was update successfull`)
  } catch (error) {
    res.status(400).json({
      msg: error.message
    })
  }

})
// to delete all products in the cart
routerCart.delete('/:cid', async (req, res) => {
  const cartID = req.params.cid
  try {
    await cartsService.deleteAllProductsInCart(cartID)
    res.status(200).json({msg: `the Cart is empty`})
  } catch (error) {
    res.status(400).json({
      msg: error.message
    })
  }
})

export default routerCart