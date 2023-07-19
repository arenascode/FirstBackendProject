import  Ticket from "../entities/Ticket.js";
import { cartsRepository } from "../repositories/carts.repository.js";
import { productsRepository } from "../repositories/products.repository.js";
import ticketRepository from "../repositories/ticket.repository.js";
import mailService from "./mail.service.js";
import userService from "./users.service.js";
import nodemailer from "nodemailer"
class TicketService {

  async createNewTicket(purchasedCartId) {
    const purchasedCart = await cartsRepository.showCartById(purchasedCartId)
    const productsDetail = purchasedCart.products

    //check if there is stock
    const productsInStock = productsDetail.filter((p) => {
      return p.quantity < p._id.stock })
    
    const productsNotInStock = productsDetail.filter((p) => {
      return p.quantity > p._id.stock
    })
    
    // ready to generate a Ticket
    const searchedPurchaser = await userService.findUser(purchasedCart.user)
    const purchaser = searchedPurchaser.email

    const amount = (productsInStock.map(p => p._id.price * p.quantity)).reduce((accumulator, currentValue) => accumulator + currentValue)
    
    //update a stock of products 
    productsInStock.forEach(async (p) => {
      const updateStock = p._id.stock -= p.quantity
      await productsRepository.updateProduct(p._id._id,{stock:updateStock})
    });

    // return products that haven't enough stock to cart 
    await cartsRepository.updateCart(purchasedCartId, { products: productsNotInStock },);
    
    const newTicket = new Ticket(amount, purchaser)
    const sendMailToUser = await mailService.sendConfirmPurchaseMail(purchaser, newTicket)
    return await ticketRepository.createNewTicket(newTicket)
  }
}

const ticketService = new TicketService()
export default ticketService