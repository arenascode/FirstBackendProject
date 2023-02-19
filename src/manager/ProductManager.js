import fs, { read } from 'fs'
import Product from './Product.js'
import { v4 as uuidv4 } from 'uuid'

class ProductManager {

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
        console.log('this product already exist');
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
    }

  }

  async deleteProduct(id) {
    const products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));

    const newArray = products.filter(e => e.id !== id)
    await fs.promises.writeFile(this.path, JSON.stringify(newArray))
    return console.log(`the product with id: ${id} was deleted`);
  }
}
    


const producstManager = new ProductManager('./Products.json');
    
(async () => {
  await producstManager.addProduct({
  title: 'Bugatti',
  description: 'Veyron',
  code: '001',
  price: 1900000,
  stock: 5,
  category: 'hyper-sports',
  thumbnails: ['']
  })
  await producstManager.addProduct({
    title: "Rolls Royce",
    description: "Phantom",
    code: "002",
    price: 400000,
    stock: 10,
    category: "Luxury",
    thumbnails: [""],
  });
  // console.log(await instanceTest.getProducts())
  await producstManager.updateProduct("c1d7cca3-f507-4c55-b3ed-286044f22015", {
    title: "Rolls Royce",
    description: "Phantom",
    code: "002",
    price: 350000,
    stock: 10,
    category: "Luxury",
    thumbnails: [""],
  });
  console.log(await producstManager.getProducts());

  await producstManager.deleteProduct("c1d7cca3-f507-4c55-b3ed-286044f22015");

  console.log(await producstManager.getProducts());
}
)()