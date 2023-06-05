function validateTitle(valor) {
  if (typeof valor !== "string")
    throw new Error("el nombre del producto es una cadena de caracteres");
  if (!valor) throw new Error("el nombre no puede estar vacio");
  return valor;
}

function validateDescription(valor) {
  if (typeof valor !== "string")
    throw new Error("el nombre es una cadena de caracteres");
  if (!valor) throw new Error("La descripción no puede estar vacia");
  return valor;
}

function validatePrice(price) {
  if (typeof price !== "number") throw new Error("The price must be a number");
  // if (!Number.isInteger(Number(valor))) throw new Error('la  es un numero entero')

  if (price == undefined)
    throw new Error("Ingresa el Stock del producto");
  
  if (isNaN(price)) throw new Error(`The price must be a numeric value`)

  if (Number(price) <= 0)
    throw new Error("the price must be a positive number");
  
  return Number(price);
}

function validateCode(valor) {
  if (typeof valor !== "string")
    throw new Error("el codigo de producto es una cadena de caracteres");
  if (!valor) throw new Error("Asigna el código del producto");
  return valor;
}

function validateStock(valor) {
  if (typeof valor !== "number") throw new Error("El Stock es un numero");
  if (!Number.isInteger(Number(valor)))
    throw new Error("El stock es un numero entero");
  if (Number(valor) <= 0)
    throw new Error("El stock no puede ser un valor negativo");
  return Number(valor);
}

function validateCategory(valor) {
  if (typeof valor !== "string")
    throw new Error("La categoría es una cadena de caracteres alfabeticos");
  if (!valor) throw new Error("Asigna una categoría al producto");
  return valor;
}

class Product {
  constructor({
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails,
    owner
  }) {

    this.title = validateTitle(title);
    this.description = validateDescription(description);
    this.code = validateCode(code);
    this.price = validatePrice(price);
    this.status = status;
    this.stock = validateStock(stock);
    this.category = validateCategory(category);
    this.thumbnails = thumbnails;
    this.owner = owner
  }
}

export default Product;
