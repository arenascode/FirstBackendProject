import ticketDaoMongoDb from "../dao/ticket/ticketDaoMongodb.js"

class TicketRepository {
  constructor(daoSelected) {
    this.dao = daoSelected
  }

  async createNewTicket(dataNewTicket) {
    return await this.dao.createNewTicket(dataNewTicket)
  }


}

const ticketRepository = new TicketRepository(ticketDaoMongoDb)
export default ticketRepository