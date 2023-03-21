import { productsService } from "../src/services/products.service.js";
import { DataNewProduct } from "../src/models/products.model.js";
import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../src/config/mongodbCnxStr.js";
import cartsService from "../src/services/carts.service.js";

await mongoose.connect(MONGODB_CNX_STR)

// const dataNewProduct = new DataNewProduct({
//   title: 'Ducati',
//   description: 'RoadCoster',
//   price: 200,
//   code: '347',
//   stock: 8,
//   category: 'Ruta',
//   thumbnails: ["sin ruta", "ruta2"]
// })

// const productAdded = await productsService.addNewProduct(dataNewProduct)

// const getProducts = await productsService.getProducts()

// const updateById = await productsService.updateById(
//   "6417786cb305822db4bb7fa1",
//   {
//     title: "Ducati",
//     description: "Actualizado",
//     price: 200,
//     code: "347",
//     stock: 8,
//     category: "Ruta",
//     thumbnails: ["ruta1", "ruta2"],
//   }
// );
// console.log(updateById);

// const deleteById = await productsService.deleteById("64171f7c3b8d3fafd8b9b417");
// console.log(getProducts);
//console.log(deleteById);

// TEST CART SERVICE 

// const addNewCart = await cartsService.addNewCart({
//     products: [
//         {
//           _id: '641788b132b54c0973da011a',
//           quantity: 6
//         },
//         {
//           _id: "6417786cb305822db4bb7fa1",
//           quantity: 1
//         }
//     ]
// })

const addNewCart2 = await cartsService.addNewCart({
  _id: "641788b132b54c0973da011a",
  title:"Ford",
  description:"Mustang",
  price:370000,
  code:"007",
  stock:13,
  category:"Sport",
  thumbnails: "Ruta1",
});

mongoose.connection.close()