const cartItemsElement = document.querySelector(".cart-items");

function renderArticulos(array) {
  let newDiv = document.querySelector("#articulos");
  newDiv.innerHTML = "";
  let main = document.querySelector("main");
  array.forEach((articulo) => {
    newDiv.innerHTML += `
          
              <div class="card m-2 col-2">
                  <div class="card-body">
                      <img src="${
                        articulo.imagen
                      }" width="150px" alt="imagen" class="card-img-top">
                      <h3 class="card-title fs-5">${articulo.nombre}</h3>
                      <p class="card-text fs-6">${articulo.descripcion}</p>
                      <p class="card-text">${
                        articulo.stock <= 5
                          ? "Ultima unidades"
                          : "Stock: " + articulo.stock
                      }</p>
                      <p class="card-text fs-5 ">Precio: $${articulo.precio}</p>
                      <a href="#" class="btn btn-primary" onclick="addToCart(${articulo.id})">Añadir al Carro</a>
                  </div>    
              </div>
          `;
    main.appendChild(newDiv);
  });
}

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart()

function addToCart (id) {
  if(cart.some((item) => item.id === id)) {
      alert("Product already in cart!");
  } else {
      const item = products.find((product) => product.id === id);

      cart.push({
          ...item,
          numberOfUnits: 1,
      });

      console.log(item)
  }
  updateCart();
}

function updateCart() {
  renderCartItems();
  // renderSubtotal();

  localStorage.setItem("CART", JSON.stringify(cart))
}

function renderCartItems() {
  cartItemsElement.innerHTML = "";
  cart.forEach((articulo) => {
      cartItemsElement.innerHTML += `
      <div class="cart-item">
          <div class="cart-info">
              <img src="${articulo.imagen}" alt="${articulo.nombre}">
              <h4>${articulo.nombre}</h4>
          </div>
          <div class="unit-price">
              ${articulo.precio}
          </div>
          <div class="units">
              <div class="btn minus" onclick="changeNumberOfUnits('minus', ${articulo.id})">-</div>
              <div class="number">${articulo.NumberOfUnits}</div>
              <div class="btn plus" onclick="changeNumberOfUnits('plus', ${articulo.id})">+</div>
          </div>
      </div>
      `
  })
}

function printMainFunctions(array) {
  
  let juguetes = array.filter((articulo) => articulo.tipo === "Juguete");
  let farmacia = array.filter((articulo) => articulo.tipo === "Medicamento");
  document.title === "Juguetes" ? renderArticulos(juguetes) : renderArticulos(farmacia);

  const search = document.querySelector("#buscador");
  search.addEventListener("keyup", e => {
    const buscar = e.target.value.toLowerCase()
    const juguetesFiltrados = juguetes.filter(juguete => {
          if(juguete.nombre.toLowerCase().includes(buscar)) {
            return juguete
          }
        })
    const farmaciaFiltrados = farmacia.filter(medicamento => {
          if(medicamento.nombre.toLowerCase().includes(buscar)) {
            return medicamento
          }
        })
    document.title === "Juguetes" ? renderArticulos(juguetesFiltrados) : renderArticulos(farmaciaFiltrados);
  })

  // document.title === "Juguetes" ? renderArticulos(juguetes) : renderArticulos(farmacia);
  let loader = document.querySelector(".loader");

   loader.style.display = "none"
}

let url = "https://apipetshop.herokuapp.com/api/articulos";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let articulos = data.response;
    
    printMainFunctions(articulos);

  });