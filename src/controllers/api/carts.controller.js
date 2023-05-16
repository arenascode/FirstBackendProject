import cartsService from "../../services/carts.service.js";

// To get a cart By Id
export async function controllerGetCartById (req, res) {
  try {
    const idCart = req.params.cid
    const cartById = await cartsService.showCartById(idCart)
    console.log(`cartById Controller 8 ${JSON.stringify(cartById)}`);

    const arrayOfProducts = []
    const productsOfCart = cartById.products.forEach(e => {
      const product = {
        user: e.user,
        id: e._id,
        // description: e.description,
        // price: e.price,
        // category: e.category,
        quantity: e.quantity
      }
      arrayOfProducts.push(product)
    });
    console.log(`arrayOfProducs Controller 21 ${JSON.stringify(arrayOfProducts)}`);
    res.render('cartById', {
          pageTitle: 'Your Cart',
          cartExist: Boolean(cartById),
          dataUser: cartById,
          productsInCart: arrayOfProducts
        })
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }
}

//To get all carts
export async function controllerGetCarts(req, res) {
  let limit = Number(req.query.limit);
  //console.log(`LINE 5 controllerCart ${typeof limit}`);
  let page = parseInt(req.query.page);
  //console.log(page);
  const category = req.query.category;
  //console.log(`Category Line 10 Controller ${category}`);
  let order = req.query.sort;
  try {
    const showCarts = await cartsService.showCarts(category, limit, page, order);

    const prevPage = `http://localhost:8080/api/carts?page=${showCarts.prevPage}&limit=${limit}&query=${category}&sort=${order}`;

    const nextPage = `http://localhost:8080/api/carts?page=${showCarts.nextPage}&limit=${limit}&query=${category}&sort=${order}`;

    const paginationOptions = {
      hasNextPage: showCarts.hasNextPage,
      hasPrevPage: showCarts.hasPrevPage,
      prevLink: prevPage,
      nextLink: nextPage,
      page: page,
      category: category,
      limit: limit,
    };
    console.log(showCarts.docs);
    res.render("carts", {
      pageTitle: "Carts",
      cartsExist: showCarts.docs.length > 0,
      carts: showCarts.docs,
      pagination: paginationOptions,
    });
    //res.json(carts);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
  

}

//To add new cart
export async function controllerAddANewCart(req, res) {
  console.log(`I'm req.user in Controller ANC ${JSON.stringify(req.user)}`);
  try {
    const productToCart = req.body
    const userId = req.user._id
    await cartsService.addNewCart(productToCart, userId)
    res.json(`the ${JSON.stringify(productToCart)} was added succesfull`)
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }

}

// To update new product an existing cart
export async function controllerAddProductInCart (req, res) {
  console.log(`I'm req.user in AddPInCart ${req.user}`);
  try {
    const cartId = req.params.cid
    const productToAdd = req.body
    const userId = req.user._id
    await cartsService.addProductToCart(productToAdd, userId, cartId)
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