function generateCode () {
  const purchaseCode = Math.floor(Math.random() * Date.now()).toString(16)
  return purchaseCode
}

function purchaseDate() {
  const today = new Date()
  const purchaseDate = today.toUTCString()
  return purchaseDate
}

export default class Ticket {
  
  constructor(amount, purchaser) {
    this.code = generateCode()
    this.purchase_datetime = purchaseDate()
    this.amount = Number(amount)
    this.purchaser = purchaser
  }
}
