const socket = io()

// socket.on("productsList", async (data) => {
//   const divData = document.getElementById("showData");
//   divData.innerHTML = ``;
//   console.log(`I'm data from Line 6 of products.js ${JSON.stringify(data)}`);
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
//       console.log(`LINE 31 product.js ${JSON.stringify(productToAdd._id)}`);

//       socket.emit("addProductToCart", productToAdd);
//       const divData = document.getElementById("showData");

//       alert("the Product Was added to cart");
//       console.log(`Id Product added ${p._id}`);
//     });
//   });
  
// });