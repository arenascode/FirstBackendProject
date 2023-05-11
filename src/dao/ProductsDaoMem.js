import fs, { read } from 'fs'
import Product from '../entities/Product.js'
import { v4 as uuidv4 } from 'uuid'

class ProductsDaoMemory {

  constructor(path) {

    this.products = []

    this.path = path

    // I already have an existing file of products?
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]))
    }
  }

  //methods

  // To add a New Product
  async addProduct({ title, description, code, price, stock, category, thumbnails }) {
    
    const product = new Product({
      title, description, code, price, stock, category, thumbnails
    })
    
    const products =  JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    
    const isTheProductAdd = Boolean(products.find(e => e.code == code))

    if (isTheProductAdd) {
        throw new Error('This Product Already Exist');
    } else {
      product.id = uuidv4()

      products.push(product)
      
      await fs.promises.writeFile(this.path, JSON.stringify(products))

      return console.log(
        `the ${JSON.stringify(product.title)} ${JSON.stringify(
          product.description
        )} was added.`
      )
    }
  }

  async getProducts() {
    const products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    return products
  } 

  async getProductById(id) {
    const products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    const productById = products.find(e => e.id === id)
    if (!productById) {
      console.log('This product does not exist')
    } else {
      return productById
    }
  }

  async updateProduct(id, dataToUpdate) {
    const products = JSON.parse(
      await fs.promises.readFile(this.path, "utf-8")
    );
    const productById = products.find((e) => e.id === id);
    if (!productById) {
      console.log("This product does not exist");
    } else {
      const newArray = products.filter(e => e.id !== id)
      const updateProducts = [...newArray, { id, ...dataToUpdate }]
      await fs.promises.writeFile(this.path, JSON.stringify(updateProducts))
      return productById ;
    }
  }

  async deleteProduct(id) {
    const products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    const productToDelete = products.find(e => e.id === id)
    const productExist = Boolean(productToDelete)

    if (productExist) {
      const newArray = products.filter(e => e.id !== id)
      await fs.promises.writeFile(this.path, JSON.stringify(newArray))
    return productToDelete
    } else {
      throw new Error('the id product does not exist')
    }
  }
}

const productsManager = new ProductsDaoMemory('./src/db/products.json');

export default productsManager

