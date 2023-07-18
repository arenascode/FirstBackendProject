//Get the elements 
const addToCartBtns = document.querySelectorAll('button[data-idProduct]')
const getCartBtn = document.getElementById('getCart')
const cartProductsList = document.querySelector('.cartProducts')
const modalCart = document.querySelector('.modalCart')
let data
const closeModalBtn = document.getElementById('closeModalBtn')
const totalAmountdiv = document.querySelector('.cartDetails_totalAmount')
//Functions 
async function addToCart() {
  const idProduct = this.dataset.idproduct
  const productId = {
    idproduct: idProduct
  }
  const response = await fetch("http://localhost:8080/api/carts", {
    method: "POST",
    body: JSON.stringify(productId),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert('Your session expired. Log in again!');
  }
  
  cart = await response.json()
  console.log(cart._id);
  localStorage.setItem('cartId', JSON.stringify(cart._id))
}

let deleteProductCartBtns



async function getCartById(e) {
  e.preventDefault()
  const cartId = JSON.parse(localStorage.getItem('cartId'))
  console.log(`I'm cartId saved in LocalStorage ${cartId}`);
  if (!cartId) {
    alert('Your Cart is empty. Please add one product')
  }

  const response = await fetch(`http://localhost:8080/api/carts/${cartId}`)
  const productsToRender = await response.json()
  let total = totalAmount(productsToRender)
  console.log(total);
  totalAmountdiv.innerText = `Total Amount: $${total}`
  cartProductsList.innerHTML = await productsToRender.map(product => {
    return `
    <li>
    <div class=ItemCartList>
    Motorcycle: ${product.id.title}
    <br>
    <small>Model: ${product.id.description}</small>
    <br
    <small>Quantity: ${product.quantity}</small>
    <br
    <small>Price: $${product.id.price}</small>
    </div>
    <div class="itemCartListBtns">
    <button class="deleteProductCart btn btn-sm btn-danger rounded" style="--bs-btn-padding-y: .10rem; --bs-btn-padding-x: .4rem; --bs-btn-font-size: .55rem;" onclick=deleteProductInCart(this) data-productid=${product.id._id} >Delete Product</button>
    </div>
    </li>
    <hr>
    `;
  }).join("")
  // To show modal
  modalCart.style.display = 'flex'
  setTimeout(() => {
    modalCart.style.opacity = 1
  }, 100);
}

function totalAmount(arrayOfProducts) {
  let total = 0
  arrayOfProducts.forEach((product) => {
    const eachOne = product.id.price * product.quantity
    total += eachOne
  })
  return total
}

function calculateAmount(arrayOfProducts) {
  return 
}

//Close Cart Modal
function closeModal () {
  console.log('closing modal');
  modalCart.style.opacity = 0
  setTimeout(() => {
    modalCart.style.display = 'none'
  }, 300);
}

window.onclick = function (e) {
  if (e.target === modalCart) {
    modalCart.style.opacity = 0;
    setTimeout(() => {
      modalCart.style.display = "none";
    }, 300);
  }
}

// Delete Product of Cart
// btns to delete cart
async function deleteProductInCart(e) {

  console.log('deleting product of cart');
  const productId = e.dataset.productid
  const cartId = JSON.parse(localStorage.getItem('cartId'))
  const response = await fetch(`http://localhost:8080/api/carts/${cartId}/product/${productId}`, {
    method: "DELETE"
  });
  const cartAfterDelete = await response.json()
  console.log(cartAfterDelete);
  let total = totalAmount(cartAfterDelete);
  console.log(total);
  totalAmountdiv.innerText = `Total Amount: $${total}`;
  cartProductsList.innerHTML = cartAfterDelete
    .map((product) => {
      return `
    <li>
    <div class=ItemCartList>
    Motorcycle: ${product.id.title}
    <br>
    <small>Model: ${product.id.description}</small>
    <br
    <small>Quantity: ${product.quantity}</small>
    <br
    <small>Price: $${product.id.price}</small>
    </div>
    <div class="itemCartListBtns">
    <button class="deleteProductCart btn btn-sm btn-danger rounded" style="--bs-btn-padding-y: .10rem; --bs-btn-padding-x: .4rem; --bs-btn-font-size: .55rem;" onclick=deleteProductInCart(this) data-productid=${product.id._id} >Delete Product</button>
    </div>
    </li>
    <hr>
    `;
    })
    .join("");
}
// Event Listeners

addToCartBtns.forEach(btn => btn.addEventListener('click', addToCart))
getCartBtn.addEventListener('click', getCartById)
closeModalBtn.addEventListener('click', closeModal)







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
