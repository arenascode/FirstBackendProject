import { Router } from "express";

const routerProducts = Router()

routerProducts.get('/', (req, res) => {
  // Logic to list all of products. Use the limit too with querys to show a limit of products
})

routerProducts.get('/:pid', (req, res) => {
  const idProduct = req.params.pid
  // here we going to show a product by id through params
})

routerProducts.post('/', (req, res) => {
  const productToAdd = req.body
  // here we add to our products.json a new product especified in body of peticion
})

routerProducts.put("/:id", (req, res) => {
  const productToUpdate = req.body;
  // here we update the products by id without modyfing their id.
});

routerProducts.delete("/", (req, res) => {
  const productToDelete = req.params.id;
  // here we add to our products.json a new product especified in body of peticion
});

export default routerProducts