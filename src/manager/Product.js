class Product {

  constructor({ title, description, code, price, status = true, stock, category, thumbnails }) {
    
    if (title === ' ') console.log('Ingresa el nombre del producto')
    this.title = title

    if (description === " ") console.log("Ingresa la descripción del producto");
    this.description = description

    if (code === ' ') console.log('Ingresa el Código del producto');
    this.code = code

    if (isNaN(price) || price === ' ' || price== null){ throw new Error('Ingresa el precio del producto') } else {
      this.price = price
    }

    this.status = status

    isNaN(stock) && console.log('Ingresa el Stock del producto');
    this.stock = stock 

    if(category === ' ') console.log('Ingresa la categoria del producto');
    this.category = category

    this.thumbnails = thumbnails

  }
}

export default Product