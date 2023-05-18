import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


const ticketCollection = 'tickets'

const ticketSchema = mongoose.Schema({
  code: { type: String, require: true },
  data_purchase: { type: String, require: true },
  amount: { type: Number, require: true },
  purchaser: {type: String, require: true}
}, { versionKey: false })

ticketSchema.plugin(mongoosePaginate)

const ticketModel = mongoose.model(ticketCollection, ticketSchema)

class TicketDaoMongoDb {
  constructor() {
    this.collection = ticketModel
  }

  async createNewTicket(dataNewTicket) {
    return await this.collection.create(dataNewTicket)
  }
}

const ticketDaoMongoDb = new TicketDaoMongoDb()
export default ticketDaoMongoDb