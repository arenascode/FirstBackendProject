import { ManagerMongoose } from "./ManagerMongoose.js";

const cartsManagerDB = new ManagerMongoose("carts", {
  products: [{ pid: {type: String}, quantity: {type: Number, required: true}}],
})
export default cartsManagerDB