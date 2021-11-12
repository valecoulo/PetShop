const url = "https://apipetshop.herokuapp.com/api/articulos";
const productosEl = document.querySelector("#articulos");
const cartItemsEl = document.querySelector("#cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

var articulos = [];

async function traerProductos() {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      articulos = data.response;
      console.log(articulos);
    });

  let juguetes = articulos.filter((articulo) => articulo.tipo === "Juguete");
  let farmacia = articulos.filter(
    (articulo) => articulo.tipo === "Medicamento"
  );
  /* console.log(juguetes);
  console.log(farmacia); */
  document.title === "Juguetes - Franco Pet Shop"
    ? renderProductos(juguetes)
    : renderProductos(farmacia);

  let loader = document.querySelector(".loader");

  loader.style.display = "none";

  const botonCarrito = document.querySelectorAll(".card-btn");
  botonCarrito.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (cart.some((item) => item._id === e.target.id)) {
        changeNumberOfUnits("plus", e.target.id);
      } else {
        const item = articulos.find((product) => product._id === e.target.id);

        cart.push({
          ...item,
          numberOfUnits: 1,
        });
      }
      console.log(cart);
      updateCart();
    });
  });
}
function renderProductos(arr) {
  arr.forEach((articulo) => {
    productosEl.innerHTML += `
            <div class="articulo card m-2 cont-art col-10 col-md-5 col-lg-4 col-xl-4">
            <div class="card-body">
                <img class="card-img" src="${
                  articulo.imagen
                }" width="150px" alt="imagen" class="card-img-top">
                <h3 class="card-title fs-5">${articulo.nombre}</h3>
                <div class="card-description"> 
                  <p>${truncate(articulo.descripcion, 120)}</p>
                  <p class="description fs-6">${articulo.descripcion}</p>
                </div>
                  <p class="card-text fw-bold">${
                    articulo.stock <= 5
                      ? "Stock: <b style='color: red;'>¡Ultimas unidades!</b>"
                      : "Stock: " + articulo.stock
                  }</p>
                <p class="card-text fs-5 fw-bold">Precio: $${
                  articulo.precio
                }</p>
                <button class="btn btn-danger card-btn " id="${
                  articulo._id
                }">Añadir al Carro</a>
            </div>   
        </div>
            `;
  });
}
traerProductos();

let cart = JSON.parse(localStorage.getItem("CART")) || [];
//let cart = [];
updateCart();

function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
          <div class="cart-item ">
          <div class="d-flex">   
            <img width="80" height="80" src="${item.imagen}" alt="${
      item.nombre
    }"></img>
             <p>${item.nombre}</p>
              <p>$${item.precio}</p>
              </div>
              <div class="units">
              <button class="btn minus" onclick="changeNumberOfUnits('minus', ${parseInt(
                item._id,
                16
              )})">-</button>
              <div class="number">${item.numberOfUnits}</div>
              <button id="${
                item.id
              }" class="btn plus" onclick="(e)=>{console.log(e)}">+</button>           
          </div>
              <button id="${
                item._id
              }" type="button" class=" btn btn-danger remove" >Quitar</button>
          </div>
        `;
  });

  /* let btnPlus = document.querySelector();
  btnPlus.addEventListener("click", (e) => {
    changeNumberOfUnits("plus", e.target.id);
  }); */

  let btnsQuitar = document.querySelectorAll(".remove");

  btnsQuitar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      cart = cart.filter((item) => item._id !== e.target.id);
      updateCart();
    });
  });
}

function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item._id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.stock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}

function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.precio * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(
    2
  )}`;
  //totalItemsInCartEl.innerHTML = totalItems;
}

/* function removeItemFromCart(id) {
  cart = cart.filter((item) => item._id !== id);

  updateCart();
} */

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
