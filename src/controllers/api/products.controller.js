import {productsService} from "../../services/products.service.js";

//To show all products
export async function GetProducts(req, res) {
  let limit = Number(req.query.limit);
  let page = parseInt(req.query.page);
  const category = req.query.category;
  
  let order = req.query.sort;
  if (order === 'undefined' || order == undefined) {order = 1 }

  if (isNaN(limit) || limit === 'undefined') {limit = 10}
  
  if (isNaN(page)) {page = 1}
  try {
    const showProducts = await productsService.getProducts(
      category,
      limit,
      page,
      order
    );

    const prevPage = `/api/products?page=${showProducts.prevPage}&limit=${limit}&query=${category}&sort=${order}`
    
    const nextPage = `/api/products?page=${showProducts.nextPage}&limit=${limit}&query=${category}&sort=${order}`

    const paginationOptions = {
      hasNextPage: showProducts.hasNextPage,
      hasPrevPage: showProducts.hasPrevPage,
      prevLink: prevPage,
      nextLink:nextPage,
      page: page,
      category: category,
      limit: limit
    }

    res.render("products", {
      pageTitle: "Products",
      productsExist: showProducts.docs.length > 0,
      products: showProducts.docs,
      pagination: paginationOptions
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
}

// to get one product by ID
export async function GetProductById(req, res) {
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
export async function AddNewProduct(req, res) {
  try {
    const productToAdd = req.body;
    const user = req.user // come from jwt token
    console.log(user._id);
    const newProduct = await productsService.addNewProduct(productToAdd, user._id);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
};

// To update a product
export async function UpdateProductById (req, res) {
  try {
  const productToUpdate = req.params.pid;
  const dataToUpdate = req.body
  await productsService.updateProductById(productToUpdate, dataToUpdate)
  res.json(
    `The update of ${dataToUpdate.title} ${dataToUpdate.description} was succesfull`
  );
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
  
}

// To Delete a product
export async function DeleteProductById (req, res) {
  try {
  const productToDelete = req.params.pid;
    await productsService.deleteProductById(productToDelete, req.user)
    
  res.send(
    `the product with ID: ${productToDelete} was succesfully deleted`
  );
  } catch (error) {
    res.status(400).json({
      msg: error.message
    })
  } }