
const socket = io()

const form = document.querySelector('#form')
console.log(form);
const formInputs = form.elements


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

socket.on("showProducts", async (data) => {
  const divData = document.getElementById("showData");
  divData.innerHTML = ``;

  await data.forEach((p) => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card" width=50px>
        <div class="card-body">
          <h4 class="card-title">${p.title}</h4>
          <h5 class="card-text">${p.description}</h5>>
          <h5 class="card-text font-bold">Precio: ${p.price}</h5>>
          <button id="deleteBtn-${p.id}" href="#" class="btn btn-secondary" data-idProduct=${p.id}>Delete</button>
        </div>
      </div>
    `;
    divData.appendChild(card);

    // Agregar el listener de eventos en el botón
    const deleteBtn = card.querySelector(`#deleteBtn-${p.id}`);
    deleteBtn.addEventListener("click", (e) => {
      // Lógica para eliminar el producto
      e.preventDefault();
      const productToDelete = e.target.dataset.idproduct;
      console.log(productToDelete);
  
      socket.emit("deleteProduct", productToDelete);
      const divData = document.getElementById("showData");

      alert("the Product Was Deleted");
      console.log(`Id Product Deleted ${p.id}`);
    });
  });
});
