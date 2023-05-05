import cartsService from "../../services/carts.service.js";

// To get a cart By Id
export async function controllerGetCartById (req, res) {
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
}

//To get all carts
export async function controllerGetCarts (req, res){
  try {
    const carts = await cartsService.showCarts();
  res.json(carts);
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

//To add new cart
export async function controllerAddANewCart (req, res) {
  try {
    const productToCart = req.body
    await cartsService.addNewCart(productToCart)
    res.json(`the ${JSON.stringify(productToCart)} was added succesfull`)
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }

}

// To update new product an existing cart
export async function controllerUpdateCartById (req, res) {
  try {
    const productToAdd = req.body
    await cartsService.addProductToCart(productToAdd)
    res.json(`The product was added succesfull`)
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }

}

// to delete product in existing cart
export async function controllerDeleteProductInCart (req, res) {
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
}

//To update a Cart
export async function controllerUpdateProductInCart (req, res) {
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

}

// to delete all products in the cart
export async function controllerDeleteAllProductsInCart (req, res) {
  const cartID = req.params.cid
  try {
    await cartsService.deleteAllProductsInCart(cartID)
    res.status(200).json({msg: `the Cart is empty`})
  } catch (error) {
    res.status(400).json({
      msg: error.message
    })
  }
}