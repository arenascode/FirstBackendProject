class FileManager {

  constructor(path) {

    this.carts = []
    this.products = []
    this.path
  }

  //methods

  addElement(element) {
    this.products.push(element)
    return element
  }
}