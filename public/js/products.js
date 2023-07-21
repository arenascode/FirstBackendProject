//Get the elements
const addToCartBtns = document.querySelectorAll("button[data-idProduct]");
const getCartBtn = document.getElementById("getCart");
const cartProductsList = document.querySelector(".cartProducts");
const modalCart = document.querySelector(".modalCart");
const closeModalBtn = document.getElementById("closeModalBtn");
const totalAmountdiv = document.querySelector(".cartDetails_totalAmount");
const deleteCartBtn = document.getElementById("deleteCartBtn");
const buyCartBtn = document.getElementById("buyCartBtn");

let cartId = JSON.parse(localStorage.getItem("cartId")) || "";
console.log(cartId);

//Functions
async function addToCart() {
  const idProduct = this.dataset.idproduct;
  const productId = {
    idproduct: idProduct,
  };
  try {
    const response = await fetch("/api/carts", {
      method: "POST",
      body: JSON.stringify(productId),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product Added To Cart",
        showConfirmButton: false,
        timer: 1500,
        width: "200px",
        heightAuto: false,
        customClass: {
          popup: "custom-alert-height",
        },
      });
    }
    const cart = await response.json();
    console.log(`I'm CartID ${cart._id}`);
    localStorage.setItem("cartId", JSON.stringify(cart._id));
  } catch (error) {
    console.error("error ocurred", error);
  }
}

let total = 0;
async function getCartById(e) {
  e.preventDefault();
  const cartId = JSON.parse(localStorage.getItem("cartId"));
  console.log(`I'm cartId saved in LocalStorage ${cartId}`);
  if (!cartId) {
    alert("Your Cart is empty. Please add one product");
  }

  const response = await fetch(`/api/carts/${cartId}`);
  const productsToRender = await response.json();
  total = totalAmount(productsToRender);
  if (total === 0) {
    modalCart.style.display = "flex";
    setTimeout(() => {
      modalCart.style.opacity = 1;
    }, 100);
    deleteCartBtn.disabled = true;
    buyCartBtn.disabled = true;
    totalAmountdiv.innerText = `Total Amount: $${total / 1000}`;
    return (cartProductsList.innerHTML = `
    <li>The Cart Is Empty</li>
    `);
  }
  buyCartBtn.disabled = false;
  deleteCartBtn.disabled = false;
  totalAmountdiv.innerText = `Total Amount: $${total / 1000}`;
  cartProductsList.innerHTML = await productsToRender
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
  // To show modal
  modalCart.style.display = "flex";
  setTimeout(() => {
    modalCart.style.opacity = 1;
  }, 100);
}

function totalAmount(arrayOfProducts) {
  let total = 0;
  arrayOfProducts.forEach((product) => {
    const eachOne = product.id.price * product.quantity;
    total += eachOne;
  });
  return total;
}

//Close Cart Modal
function closeModal() {
  console.log("closing modal");
  modalCart.style.opacity = 0;
  setTimeout(() => {
    modalCart.style.display = "none";
  }, 300);
}

window.onclick = function (e) {
  if (e.target === modalCart) {
    modalCart.style.opacity = 0;
    setTimeout(() => {
      modalCart.style.display = "none";
    }, 300);
  }
};

// Delete Product of Cart
// btns to delete cart
async function deleteProductInCart(e) {
  console.log("deleting product of cart");
  const productId = e.dataset.productid;
  const cartId = JSON.parse(localStorage.getItem("cartId"));
  const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
    method: "DELETE",
  });
  const cartAfterDelete = await response.json();
  console.log(cartAfterDelete);
  let total = totalAmount(cartAfterDelete);
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
  if (cartAfterDelete.length === 0) {
    buyCartBtn.disabled = true;
    deleteCartBtn.disabled = true;
    cartProductsList.innerHTML = `
    <li>The Cart Is Empty</li>
    `;
  }
}

async function deleteAllProductsInCart() {
  console.log("Im going to leave the cart empty");
  cartId = JSON.parse(localStorage.getItem('cartId'))
  try {
    const response = await fetch(`/api/carts/${cartId}`, {
    method: "DELETE"});
    const result = await response.json();
    console.log(result);
    buyCartBtn.disabled = true;
    deleteCartBtn.disabled = true;
    totalAmountdiv.textContent = `Total Amount: $0`;
    cartProductsList.innerHTML = `
  <li> ${result.msg}</li>`;
  } catch (error) {
    console.error(error)
  }
}

async function confirmPurchase() {
  if (!confirm(`Are you sure to buy the cart for $${total / 1000}?`)) {
    return;
  }
  const response = await fetch(`/api/carts/${cartId}/purchase`);
  const data = await response.json();
  console.log(data);
  buyCartBtn.disabled = true;
  deleteCartBtn.disabled = true;
  totalAmountdiv.textContent = `Total Amount: $${parseInt(data.amount) / 1000}`;
  cartProductsList.innerHTML = `
  <li>
  <div>Thank you for your purchase. Please check Your Email</div>
  <br>
  <div>Save this code for track your order: <b style="font-style: italic">${
    data.code
  }</b></div>
  <br>
  <div>Total Of Your Purchase: <b>$${parseInt(data.amount) / 1000}</b></div>
  </li>`;
}

// Event Listeners

addToCartBtns.forEach((btn) => btn.addEventListener("click", addToCart));
getCartBtn.addEventListener("click", getCartById);
closeModalBtn.addEventListener("click", closeModal);
deleteCartBtn.addEventListener("click", deleteAllProductsInCart);
buyCartBtn.addEventListener("click", confirmPurchase);
