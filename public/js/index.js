
const socket = io()

const form = document.querySelector('#form')
console.log(form);
const formInputs = form.elements
const deleteBtn = document.getElementById('deleteBtn')
console.log(deleteBtn);

const productName = formInputs["nameProduct"].value;
const productDescription = formInputs["description"].value;
const productCode = formInputs["code"].value;
const productPrice = formInputs["price"].value;
const productStock = formInputs["stock"].value;
const productCategory = formInputs["category"].value;
const productImgPath = formInputs["imgPath"].value;

  form.addEventListener('submit', (ev) => {
  ev.preventDefault()
  // const productName = formInputs['nameProduct'].value;
  // const productDescription = formInputs['description'].value;
  // const productCode = formInputs['code'].value;
  // const productPrice = formInputs['price'].value;
  // const productStock = formInputs['stock'].value;
  // const productCategory = formInputs["category"].value;
  // const productImgPath = formInputs['imgPath'].value
    
  const newProduct = {
      title: productName,
      description: productDescription,
      code: productCode,
      price: productPrice,
      stock: productStock,
      category: productCategory,
      thumbnails: productImgPath
    };
    console.log(newProduct);
    socket.emit('addProduct',newProduct)
  })

socket.on('showProducts', data => {
  const divData = document.getElementById('showData')
  divData.innerText = JSON.stringify(data);
  console.log(JSON.stringify(data));
})

deleteBtn.addEventListener('click', (e) => {
  e.preventDefault()

  const productToDelete = {
    title: productName,
    code: productCode
  }
  socket.emit("deleteProduct", productToDelete)
});


