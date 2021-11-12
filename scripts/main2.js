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

  let alerta = document.querySelectorAll('.card-btn')

  alerta.forEach(boton => {
    boton.addEventListener('click', () => {
      Swal.fire({
        title: 'Añadiste el producto al carrito!',
        backgroundColor: 'red',
        imageUrl: './assets/carrito_meme.png',
        imageHeight: 240
    })
    })
  })

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

  /* const search = document.querySelector("#buscador");
  search.addEventListener("keyup", (e) => {
    const buscar = e.target.value.toLowerCase();
    const juguetesFiltrados = juguetes.filter((juguete) => {
      if (juguete.nombre.toLowerCase().includes(buscar)) {
        return juguete;
      }
    });
    const farmaciaFiltrados = farmacia.filter((medicamento) => {
      if (medicamento.nombre.toLowerCase().includes(buscar)) {
        return medicamento;
      }
    });
    document.title.includes("Juguetes")
      ? renderProductos(juguetesFiltrados)
      : renderProductos(farmaciaFiltrados);
  }); */
}

function renderProductos(arr) {
  let newDiv = document.querySelector("#articulos");
  newDiv.innerHTML = "";
  let main = document.querySelector("main");
  arr.forEach((articulo) => {
    newDiv.innerHTML += `
            <div class="articulo card m-2 cont-art col-10 col-md-5 col-lg-4 col-xl-4">
            <div class="card-body">
                <img class="card-img" src="${
                  articulo.imagen
                }" width="150px" alt="imagen" class="card-img-top">
                <h3 class="card-title fs-5">${articulo.nombre}</h3>
                <div class="card-description"> 
                  <p>${truncate(articulo.descripcion, 100)}</p>
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
    main.appendChild(newDiv);
  });
}
traerProductos();

let cart = JSON.parse(localStorage.getItem("CART")) || [];
//let cart = [];
updateCart();

function updateCart() {
  renderCartItems();
  renderSubtotal();

  localStorage.setItem("CART", JSON.stringify(cart));
}

function renderCartItems() {
  cartItemsEl.innerHTML = "";
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item ">
        <hr>
        <div class="d-flex">   
            <img width="80" height="80" src="${item.imagen}" alt="${item.nombre}"></img>
             <p>${item.nombre}</p>
              <p>$${item.precio}</p>
        </div>
        <div class="units d-flex justify-content-end">
            <button id="${item._id}" class="btn-warning  btn-cantidad m-2" >-</button>
            <div class="number m-1">${item.numberOfUnits}</div>
            <button id="${item._id}" class="btn-warning plus btn-cantidad m-2">+</button> 
            <button id="${item._id}" type="button" class=" btn btn-danger remove" >Quitar</button>          
            
        </div> 
        `;
  });

  let btnCant = document.querySelectorAll(".btn-cantidad");
  btnCant.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;

        if (item._id === e.target.id) {
          if (e.target.innerHTML === "-" && numberOfUnits > 1) {
            numberOfUnits--;
          } else if (e.target.innerHTML === "+" && numberOfUnits < item.stock) {
            numberOfUnits++;
          }
        }

        return {
          ...item,
          numberOfUnits,
        };
      });

      updateCart();
    });
  });

  let btnsQuitar = document.querySelectorAll(".remove");

  btnsQuitar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      cart = cart.filter((item) => item._id !== e.target.id);
      updateCart();
    });
  });
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
  totalItemsInCartEl.innerHTML = totalItems;
}

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
