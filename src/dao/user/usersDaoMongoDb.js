import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import { User } from "../../entities/User.js";
import { json } from "express";

//function to transform the DBO to DTO

function toPoJo(object) {
  return JSON.parse(JSON.stringify(object))
}

//------*------*------*------*------*

const usersCollection = 'users' 
const userSchema = mongoose.Schema({
  name: { type: String },
  lastName: { type: String },
  email: { type: String},
  age: { type: String },
  password: { type: String },
  role: {type: String}
},
  { versionKey: false }); 
userSchema.plugin(mongoosePaginate)

const usersModel = mongoose.model(usersCollection, userSchema)

//------*------*------*------*-------*-----

class UsersDaoMongodb {
  #collection
  constructor() {
    this.#collection = usersModel
  }

  async createNewUser(userToSave) {
    const newUser = toPoJo(new User(userToSave))
    console.log(`new user daoMongo ${newUser}`);
    const userSaved = await this.#collection.create(newUser)
    return toPoJo(userSaved)
  }

  async findUserById(id) {
    const idUser = id
    const userById = await this.#collection.findById(idUser)
    return toPoJo(userById)
  }
  
  async findOne(criteria) {
    console.log(`criteria userMongodb ${JSON.stringify(criteria)}`);
    const searchedUser = await this.#collection.findOne(criteria)
    // if (!searchedUser) throw new Error("NOT FOUND");
    return searchedUser
  }

  async findAllUsers(criteria, paginationOptions) {
    console.log(criteria);
    console.log(paginationOptions);
    const userSearched = await this.#collection.paginate(criteria, paginationOptions) // make sure that the criteria arrives as an object
    return userSearched
  }
  
  async updateUser(userId, dataToUpdate) {
    const userIdSearched = userId
    const newData = dataToUpdate
    const userUpdated = this.#collection.findByIdAndUpdate(userIdSearched, newData)

    return userUpdated
  }

  async deleteUserById(userId) {
    const userDeleted = await this.#collection.findOneAndDelete(userId)
    return userDeleted
  }

  async deleteAllUsers(criteria) {
    const resultDeletedUsers = await this.#collection.deleteMany(criteria)
    return resultDeletedUsers
  }
}

const usersDaoMongodb = new UsersDaoMongodb();
export default usersDaoMongodb