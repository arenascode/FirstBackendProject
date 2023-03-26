import { ManagerMongoose } from "./ManagerMongoose.js";

const cartsManagerDB = new ManagerMongoose("carts", {
  user: { type: String },
  products: [{ pid: {type: String}, quantity: {type: Number, required: true}}],
})
export default cartsManagerDB