import { productsService } from "../src/services/products.service.js";
import { DataNewProduct } from "../src/models/products.model.js";
import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../src/config/mongodbCnxStr.js";

await mongoose.connect(MONGODB_CNX_STR)

const dataNewProduct = new DataNewProduct({
  title: 'Ducati',
  description: 'RoadCoster',
  price: 200,
  code: '347',
  stock: 8,
  category: 'Ruta',
  thumbnails: ["sin ruta", "ruta2"]
})

const productAdded = await productsService.addNewProduct(dataNewProduct)

const getProducts = await productsService.getProducts()

const updateById = await productsService.updateById(
  "6417786cb305822db4bb7fa1",
  {
    title: "Ducati",
    description: "Actualizado",
    price: 200,
    code: "347",
    stock: 8,
    category: "Ruta",
    thumbnails: ["ruta1", "ruta2"],
  }
);
console.log(updateById);

// const deleteById = await productsService.deleteById("64171f7c3b8d3fafd8b9b417");
// console.log(getProducts);
//console.log(deleteById);

mongoose.connection.close()