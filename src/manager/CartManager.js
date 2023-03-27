import fs from 'fs'
import Cart from './Cart.js'
import {
  v4 as uuidv4
} from 'uuid'

class CartManager {

  constructor(path) {

    this.carts = []

    this.path = path

    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]))
    }
  }

  // Methods

  async addCart(productToAdd) {

    const routeProducts = './src/db/products.json';

    const readProducts = JSON.parse(await fs.promises.readFile(routeProducts, "utf-8"))

    const productExist = readProducts.find(e => e.code == productToAdd.code)

    const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))

    const indexProductInCart = carts.find((e) =>
      e.products[0].idProduct == productExist.id);

    const product = {}
    const cart = new Cart()

    if (!indexProductInCart) {
      cart.id = uuidv4();
      product.idProduct = productExist.id,
        product.quantity = 1
      cart.products.push(product)
      carts.push(cart)
    } else {
      indexProductInCart.products[0].quantity += 1
    }
    await fs.promises.writeFile(this.path, JSON.stringify(carts))
  }

  async showCart() {
    const readJson = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    return readJson
  }

  async showCartById(cid) {
    const carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));

    const cartById = carts.find(e => e.id == cid)

    if (!cartById) {
      console.log('This Cart doesnt exist');
    } else {
      return cartById
    }
  }
  async addProductToCart(cid, pid) {
    const carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));

    const cartById = carts.find((e) => e.id == cid);

    const routeProducts = "./src/db/products.json";

    const readProducts = JSON.parse(
      await fs.promises.readFile(routeProducts, "utf-8")
    );

    const productExist = readProducts.find(
      (e) => e.id == pid
    );

    const productInCart = cartById.products.find(e => e.idProduct == pid)

    if (!cartById) {
      console.log("This Cart doesnt exist. A new cart is being created");
      this.addCart(productExist)
    } else {
      if (!productInCart) {
        console.log('the product doesnt exist. Its going to be added');
        cartById.products.push({
          idProduct: productExist.id,
          quantity: 1
        })
      } else {
        console.log('the product already exists. one more unit will be added');
        const indexProduct = cartById.products.findIndex(e => e.idProduct == pid)
        cartById.products[indexProduct].quantity += 1
      }
      await fs.promises.writeFile(this.path, JSON.stringify(carts))
    }
  }
}

export default CartManager