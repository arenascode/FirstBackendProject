import mongoose from "mongoose";
import { createMockProduct } from "../mocks/products.mock.js";



export async function poblarDB() {

  //const connection = await mongoose.connect(`mongodb://localhost/CoderHouse`);
  const products = []

  for (let i = 0; i < 100; i++) {
    const product = JSON.parse(JSON.stringify(createMockProduct()));
    products.push(product)
  }



await mongoose.connection.collection("fakeProducts").insertMany(products);

await mongoose.disconnect()
  return products
}
