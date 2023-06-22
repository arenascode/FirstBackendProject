import { productsService } from "./src/services/products.service.js";
import { DataNewProduct } from "../src/models/products.model.js";
import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "./src/config/mongodbCnxStr.js";
import cartsService from "./src/services/carts.service.js";
import motos from "../src/dao/products.json" assert { type: "json" };
import { winstonLogger } from "./src/utils/logger.js";
await mongoose.connect(MONGODB_CNX_STR);

// const insertAllProducts = await productsService.insertMany(motos)
// const dataNewProduct1 = new DataNewProduct({
//   title: 'Maseratti',
//   description: 'Gold',
//   price: 200,
//   code: '000',
//   stock: 8,
//   category: 'luxury',
//   thumbnails: ["sin ruta", "ruta2"]
// })

// const dataNewProduct2 = new DataNewProduct({
//   title: 'ferrari',
//   description: 'Enzo',
//   price: 200,
//   code: '001',
//   stock: 8,
//   category: 'luxury',
//   thumbnails: ["sin ruta", "ruta2"]
// })

// const dataNewProduct3 = new DataNewProduct({
//   title: 'Bugatti',
//   description: 'Enzo',
//   price: 200,
//   code: '002',
//   stock: 8,
//   category: 'Sport',
//   thumbnails: ["sin ruta", "ruta2"]
// })

// const productAdded1 = await productsService.addNewProduct(dataNewProduct1)

// const productAdded2 = await productsService.addNewProduct(dataNewProduct2)

// const productAdded3 = await productsService.addNewProduct(dataNewProduct3);

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
//winstonLogger.debug(updateById);

// const deleteById = await productsService.deleteById("64171f7c3b8d3fafd8b9b417");
// winstonLogger.debug(getProducts);
//winstonLogger.debug(deleteById);

// TEST CART SERVICE

// const getCart = await cartsService.showCartById('64204a6a580cd792f818a661')
// winstonLogger.debug(getCart)

// winstonLogger.debug(getCarts);
// const addNewCart2 = await cartsService.addNewCart(
//   {
//     _id: "6417786cb305822db4bb7fa1",
//     title: "Ducati",
//     description: "Actualizado",
//     price: 200,
//     code: "347",
//     stock: 8,
//     category: "Ruta",
//     thumbnails: ["ruta1", "ruta2"],
//     user: "usuario123"
//   });

// const addNewCart3 = await cartsService.addNewCart(
// {
//   _id: "641788b132b54c0973da011a",
//   title: "Ford",
//   description: "Mustang",
//   price: 370000,
//   code: "007",
//   stock: 13,
//   category: "Sport",
//   thumbnails: "Ruta1",
//   user: "usuario123",
// }
// );

// const addNewCart5 = await cartsService.addNewCart(
//   {
//   _id: "64204908ed06faa2cfcc204a",
//   title: 'Maseratti',
//   description: 'Gold',
//   price: 200,
//   code: '000',
//   stock: 8,
//   category: 'Ruta',
//   thumbnails: ["sin ruta", "ruta2"],
//   user: "usuario456",
// }
// );

// TEST FOR ADD PRODUCT IN EXISTING CART

// const addProductToCart = await cartsService.addProductToCart({
//   _id: "6417786cb305822db4bb7fa1",
//   user: "usuario456",
// });

// TEST FOR DELET PRODUCT IN EXISTING CART
// const deleteProductInCart = await cartsService.deleteProductInCart({
//   cid: "64204a6a580cd792f818a661",
//   pid: "6417786cb305822db4bb7fa1",
// });

mongoose.connection.close();
