class Product {

  constructor({ title, description, code, price, status = true, stock, category, thumbnails }) {
    
    if (title === ' ' || title == undefined) throw new Error('Ingresa el nombre del producto')
    this.title = title

    if (description === " " || description == undefined) throw new Error("Ingresa la descripción del producto");
    this.description = description

    if (code === ' ' || code == undefined) throw new Error('Ingresa el Código del producto');
    this.code = code

    if (isNaN(price) || price === ' ' || price == null){ throw new Error('Ingresa el precio del producto') } else {
      this.price = price
    }

    this.status = status

    if (isNaN(stock) || stock == undefined) throw new Error('Ingresa el Stock del producto');
    this.stock = stock 

    if(category === ' ' || category == undefined) throw new Error('Ingresa la categoria del producto');
    this.category = category

    this.thumbnails = thumbnails
  }
}

export default Product