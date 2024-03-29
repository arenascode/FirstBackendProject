import { query } from "express"
import cartsDaoMongoDb from "../dao/cart/CartsDaoMongoDb.js"

class CartsRepository {
  constructor(daoSelected) {
    this.dao = daoSelected
  }

  async saveNewCart(dataNewCart, userId, userHasCart) {
    const savedCart = this.dao.saveNewCart(dataNewCart, userId, userHasCart)
    return savedCart
  }

  async addProductToCart(productId, userId, cartId) {
    const addedProduct = this.dao.addProductToCart(productId, userId, cartId)
    return addedProduct
  }

  async showCarts(queryFilter, paginationOptions) {
    return await this.dao.getAllCarts(queryFilter, paginationOptions)
  }

  async showCartById(cartId) {
    return await this.dao.getCartById(cartId)
  }

  async deleteProductInCart(cartId, productId) {
    return await this.dao.deleteItemInCart(cartId, productId)
  }

  async updateCart(cid, dataToUpdate) {
    return await this.dao.updateCart(cid, dataToUpdate)
  }

  async deleteAllProductsInCart(cid) {
    return this.dao.deleteAllProductsInCart(cid)
  }
}

export const cartsRepository = new CartsRepository(cartsDaoMongoDb)