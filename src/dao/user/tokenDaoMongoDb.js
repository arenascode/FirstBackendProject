import mongoose, { Schema } from "mongoose";

const tokensCollection = 'tokens'

const tokenSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true, 
    ref: "users"
  },
  token: { type: String, required: true },
  createdAt: {type: Date}
}, { versionKey: false})

const tokenModel = mongoose.model(tokensCollection, tokenSchema)
tokenModel.collection.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 300 }
);

// tokenSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'userId',
//     options: {lean: true }
//   })
// })

/* // // // // // // // // // // /// // // / */

class TokenDaoMongoDb {
  #collection
  constructor() {
    this.#collection = tokenModel
  }

  async readToken(userId) {
    return await this.#collection.findOne({userId: userId})
  }

  async saveToken(userId, token) {
    let newToken = {
      userId: userId,
      token: token,
      createdAt: new Date()
    }
    return this.#collection.create(newToken)
  }
}

export const tokenDaoMongoDb = new TokenDaoMongoDb()