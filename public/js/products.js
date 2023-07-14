//Get the elements 
const addToCartBtns = document.querySelectorAll('button[data-idProduct]')
// console.log(addToCartBtns.dataset.idProduct);


async function addToCart() {
  const idProduct = this.dataset.idproduct
  const productId = {
    idproduct: idProduct
  }
  console.log(productId);
  const response = await fetch("http://localhost:8080/api/carts", {
    method: "POST",
    body: JSON.stringify(productId),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.log('Error Request. Please try Again');
  }

  const data = await response.json()
  console.log(data);
}

addToCartBtns.forEach(btn => btn.addEventListener('click', addToCart))







// socket.on("productsList", async (data) => {
//   const divData = document.getElementById("showData");
//   divData.innerHTML = ``;
//   winstonLogger(`I'm data from Line 6 of products.js ${JSON.stringify(data)}`);
//   await data.docs.forEach((p) => {
//     const card = document.createElement("div");
//     card.className = "col";
//     card.innerHTML = `
//       <div class="card" width=50px>
//         <div class="card-body">
//           <h4 class="card-title">${p.title}</h4>
//           <h5 class="card-text">${p.description}</h5>>
//           <h5 class="card-text font-bold">Precio: ${p.price}</h5>>
//           <button id="addBtn-${p._id}" href="#" class="btn btn-secondary" data-idProduct=${p._id}>Add To Cart</button>
//         </div>
//       </div>
//     `;
//     divData.appendChild(card);

//     // Agregar el listener de eventos en el botón
//     const addBtn = card.querySelector(`#addBtn-${p._id}`);
//     const user1 = 'user123'
//     addBtn.addEventListener("click", (e) => {
//       // Lógica para eliminar el producto
//       e.preventDefault();
//       const productToAdd = {
//         _id: e.target.dataset.idproduct,
//         user: user1
//       };
//       winstonLogger(`LINE 31 product.js ${JSON.stringify(productToAdd._id)}`);

//       socket.emit("addProductToCart", productToAdd);
//       const divData = document.getElementById("showData");

//       alert("the Product Was added to cart");
//       winstonLogger(`Id Product added ${p._id}`);
//     });
//   });

// });
