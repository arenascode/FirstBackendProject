import cartsService from "../../services/carts.service.js";
import ticketService from "../../services/ticket.service.js";
import { winstonLogger } from "../../utils/logger.js";

// To get a cart By Id
export async function controllerGetCartById(req, res) {
  try {
    const idCart = req.params.cid;
    const cartById = await cartsService.showCartById(idCart);

    const arrayOfProducts = [];
    cartById.products.forEach((e) => {
      const product = {
        user: e.user,
        id: e._id,
        quantity: e.quantity,
      };
      arrayOfProducts.push(product);
    });

    res.status(200).json(arrayOfProducts);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
}

//To get all carts
export async function controllerGetCarts(req, res) {
  let limit = Number(req.query.limit);
  let page = parseInt(req.query.page);

  const category = req.query.category;

  let order = req.query.sort;
  try {
    const showCarts = await cartsService.showCarts(
      category,
      limit,
      page,
      order
    );

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
    winstonLogger.info(showCarts.docs);
    res.render("carts", {
      pageTitle: "Carts",
      cartsExist: showCarts.docs.length > 0,
      carts: showCarts.docs,
      pagination: paginationOptions,
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
}

//To add new cart
export async function controllerAddANewCart(req, res) {
  try {
    const productId = req.body.idproduct;
    const userId = req.user._id;
    const cartAdded = await cartsService.addNewCart(productId, userId);
    res.json(cartAdded);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
}

// To update new product an existing cart
export async function controllerAddProductInCart(req, res) {
  try {
    const cartId = req.params.cid;
    const productToAdd = req.body;
    const userId = req.user._id;
    await cartsService.addProductToCart(productToAdd, userId, cartId);
    const cartUpdated = await cartsService.showCartById(cartId);
    res.json(cartUpdated);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
}

// to delete product in existing cart
export async function controllerDeleteProductInCart(req, res) {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    if (cartId && productId) {
      const resultOfDelete = await cartsService.deleteProductInCart(
        cartId,
        productId
      );
      let arrayOfProducts = [];
      resultOfDelete.products.forEach((e) => {
        const product = {
          id: e._id,
          quantity: e.quantity,
        };
        arrayOfProducts.push(product);
      });
      res.status(200).json(arrayOfProducts);
    } else {
      req.logger.debug(`missing data`);
    }
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
}

//To update a Cart
export async function controllerUpdateProductInCart(req, res) {
  try {
    const cid = req.params.cid;
    const productToUpdate = req.params.pid;
    const quantityToUpdate = req.body;
    await cartsService.updateCart(cid, productToUpdate, quantityToUpdate);
    res.json(`the cart was successfully updated`);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
}

// to delete all products in the cart
export async function controllerDeleteAllProductsInCart(req, res) {
  const cartID = req.params.cid;
  try {
    await cartsService.deleteAllProductsInCart(cartID);
    res.status(200).json({ msg: `The Cart Is Empty` });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
}

//To buy a cart
export async function purcharsePostController(req, res, next) {
  try {
    const purchasedCart = req.params.cid;
    const createdTicket = await ticketService.createNewTicket(purchasedCart);
    res.json(createdTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
