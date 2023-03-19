import { ManagerMongoose } from "./ManagerMongoose.js";

 const productsManagerDB = new ManagerMongoose("products", {
   title: { type: String, required: true },
   description: { type: String, required: true },
   price: { type: Number, required: true },
   code: { type: String, required: true },
   stock: { type: Number, required: true },
   status: { type: Boolean },
   category: { type: String, required: true },
   thumbnails: {type:[String]}
 });
 
 export default productsManagerDB