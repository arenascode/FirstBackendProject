const socket = io()

socket.on('cartById', async (data) => {
  // const divData = document.getElementById("showData");
  // divData.innerHTML = ``;
  console.log(`I'm data from Line 6 of carts.js ${JSON.stringify(data)}`);
  // await data.docs.forEach((p) => {
  //   const card = document.createElement("div");
  //   card.className = "col";
  //   card.innerHTML = `
  //     <div class="card" width=50px>
  //       <div class="card-body">
  //         <h4 class="card-title">${p.title}</h4>
  //         <h5 class="card-text">${p.description}</h5>>
  //         <h5 class="card-text font-bold">Precio: ${p.price}</h5>>
  //         <button id="addBtn-${p._id}" href="#" class="btn btn-secondary" data-idProduct=${p._id}>Add To Cart</button>
  //       </div>
  //     </div>
  //   `;
  //   divData.appendChild(card);
  // })
})