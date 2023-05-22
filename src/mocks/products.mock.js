import { faker } from "@faker-js/faker";
import Product from "../entities/Product.js";
import mongoose from "mongoose";


export function createMockProduct() {
  return new Product({
    id: faker.string.uuid(),
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(6),
    code: faker.string.alphanumeric(5),
    price: Number(faker.commerce.price()),
    status: true,
    stock: faker.number.int({ min: 5, max: 10 }),
    category: faker.commerce.department(),
    thumbnails: []
  })
}



