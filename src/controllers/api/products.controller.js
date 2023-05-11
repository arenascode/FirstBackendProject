import { productsService } from "../../services/products.service.js";

//To show all products
export async function controllerGetProducts(req, res) {
  const limite = parseInt(req.query.limit);
  // console.log(limite);
  const pagina = parseInt(req.query.page);
  //console.log(pagina);
  const category = req.query.category;
  console.log(`Category Line 10 Controller ${category}`);
  const order = req.query.sort;
  //console.log(`soy order en router ${order}`);
  try {
    const showProducts = await productsService.getProducts(
      category,
      limite,
      pagina,
      order
    );
    console.log(`line 20 products.router Showproducts ${JSON.stringify(showProducts)}`);
    // const limitedProducts = showProducts.splice(0, limite)
    res.render("products", {
      pageTitle: "Products",
      productsExist: showProducts,
      products: showProducts.docs,
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
}

// to get one product by ID
export async function controllerGetProductById(req, res) {
  try {
  const idProduct = req.params.pid
  const showProductByID = await
  productsService.getProductById(idProduct)
  res.json(showProductByID)
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
  
}

// To add a new product
export async function controllerAddNewProduct(req, res) {
  try {
    const productToAdd = req.body;
    const newProduct = await productsService.addNewProduct(productToAdd);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
};

// To update a product
export async function controllerUpdateProductById (req, res) {
  try {
    const productToUpdate = req.params.pid;
  const dataToUpdate = req.body
  const updateProduct = await productsService.updateById(productToUpdate, dataToUpdate)
  res.json(
    `The update of ${dataToUpdate.title} ${dataToUpdate.description} was succesfull`
  );
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
  
}

// To Delete a product
export async function controllerDeletProductById (req, res) {
  try {
  const productToDelete = req.params.pid;
  const deletedProduct = await productsService.deleteById(productToDelete)
  res.send(
    `the product with ID: ${productToDelete} was deleted succesfull`
  );
  } catch (error) {
    res.status(400).json({
      msg: error.message
    })
  } }