import {
  productsManagerMongoose
} from "./ManagerMongoose.js";
import mongoosePaginate from "mongoose-paginate-v2"
import { Schema } from "mongoose";

const productsCollection = 'products'
const productsSchema = new Schema({
    title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean
  },
  category: {
    type: String,
    required: true
  },
  thumbnails: {
    type: [String]
  }
})
productsSchema.plugin(mongoosePaginate)
const productsManagerDB = new productsManagerMongoose(productsCollection, productsSchema);

export default productsManagerDB