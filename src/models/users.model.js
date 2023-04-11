import mongoose from "mongoose";
import { Schema } from "mongoose";

const usersCollection = 'users' 
const userSchema = new Schema({
  name: { type: String },
  lastName: { type: String },
  email: { type: String},
  age: { type: String },
  password: { type: String },
}); 
const userManagerDB = new mongoose.model(usersCollection, userSchema)

export default userManagerDB