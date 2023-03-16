
const socket = io()

const form = document.querySelector('#form')
console.log(form);
const formInputs = form.elements
const deleteBtn = document.getElementById('deleteBtn')
console.log(deleteBtn);

  form.addEventListener('submit', (ev) => {
  ev.preventDefault()
  const productName = formInputs['nameProduct'].value;
  const productDescription = formInputs['description'].value;
  const productCode = formInputs['code'].value;
  const productPrice = formInputs['price'].value;
  const productStock = formInputs['stock'].value;
  const productCategory = formInputs["category"].value;
  const productImgPath = formInputs['imgPath'].value
  
  const newProduct = {
      title: productName,
      description: productDescription,
      code: productCode,
      price: productPrice,
      stock: productStock,
      category: productCategory,
      thumbnails: productImgPath
    };
    socket.emit('addProduct', newProduct),
    alert('the Product was added')
  })

  socket.on("showInitialProducts", (data) => {
    const divData = document.getElementById("showData");
    data.forEach(p => {
      divData.innerHTML += `
      <div class="col">
        <div class="card" width=50px>
          <div class="card-body">
            <h4 class="card-title">${p.title}</h4>
            <h5 class="card-text">${p.description}</h5>>
            <h5 class="card-text font-bold">Precio: ${p.price}</h5>>
            <a href="#" class="btn btn-secondary">Delete</a>
          </div>
        </div>
      </div>`;
    })
    console.log(data);
  });

socket.on('showProducts', data => {
  const divData = document.getElementById('showData')
  divData.innerHTML = JSON.stringify(data);
  console.log(JSON.stringify(data));
})

deleteBtn.addEventListener('click', (e) => {
  e.preventDefault()

  const productToDelete = {
    title: formInputs["nameProduct"].value,
    code: formInputs["code"].value,
  };
  socket.emit("deleteProduct", productToDelete)
  const divData = document.getElementById("showData");
  alert('the Product Was Deleted')
});
