import fs from 'fs'
import Cart from './Cart.js'
import {v4 as uuidv4} from 'uuid'

class CartManager {

  constructor(path) {

    this.carts = []

    this.path = path
      
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]))
    }
  }

  // Methods

  async addCart({productCode}) {

    const routeProducts = './src/db/products.json';

    const readProducts = JSON.parse(await fs.promises.readFile(routeProducts, "utf-8"))

    const productExist = readProducts.find(e => e.code === productCode)

    console.log((`line 27 says: ${JSON.stringify(productExist)}`));

    const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    console.log(`line 31 says: ${JSON.stringify(carts)}`);
    
    // const indexProductInCart = carts.find(e => e.products.findIndex(p => p.idProduct === productExist.id))
    const indexProductInCart = carts.find((e) =>
      e.products[0].idProduct == productExist.id)
    ;

    console.log(`line 35 show ${JSON.stringify(indexProductInCart)}`);

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
      console.log(` LINEA 50 Says: ${JSON.stringify(indexProductInCart)}`);
      // review this part
      // const index = carts.findIndex(e => e.products == productInCart.idProduct)
      // console.log(`line 53: ${index}`);
      // const productToUpdate = { ...cart.products[index] }
      // console.log(`line 55: ${JSON.stringify(productToUpdate)}`);
      // productToUpdate.quantity= + 1
      // const updateProducts = [...cart.products.slice(0,index), productToUpdate, cart.products.slice(index + 1)]
      // cart.products.push(updateProducts)
    }
    await fs.promises.writeFile(this.path, JSON.stringify(carts))
  }

  async showCart() {
    const readJson = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    return readJson
  }
}

const instanceTest = new CartManager('./Carts.json');

(async () => {
  await instanceTest.addCart({productCode: "001"})
  await instanceTest.addCart({productCode: "002"});
  await instanceTest.addCart({productCode: "003"})
  // await instanceTest.addCart({productCode: "003"});

  console.log(await instanceTest.showCart())
})()

export default CartManager