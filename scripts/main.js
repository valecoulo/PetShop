function renderArticulos(array) {
  let newDiv = document.querySelector("#articulos");
  newDiv.innerHTML = "";
  let main = document.querySelector("main");
  array.forEach((articulo) => {
    newDiv.innerHTML += `
          
              <div class="card m-2 cont-art col-10 col-md-5 col-lg-4 col-xl-4">
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
                      <p class="card-text fs-5 fw-bold">Precio: $${articulo.precio}</p>
                      <button class="btn btn-danger card-btn " id="${articulo._id}">Añadir al Carro</a>
                  </div>   
              </div>
            
          `;
    main.appendChild(newDiv);
  });
}

function printMainFunctions(array) {
  let juguetes = array.filter((articulo) => articulo.tipo === "Juguete");
  let farmacia = array.filter((articulo) => articulo.tipo === "Medicamento");
  document.title === "Juguetes - Franco Pet Shop"
    ? renderArticulos(juguetes)
    : renderArticulos(farmacia);

  const search = document.querySelector("#buscador");
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
    document.title === "Juguetes"
      ? renderArticulos(juguetesFiltrados)
      : renderArticulos(farmaciaFiltrados);
  });

  // document.title === "Juguetes" ? renderArticulos(juguetes) : renderArticulos(farmacia);
  let loader = document.querySelector(".loader");

  loader.style.display = "none";
  const botonCarrito = document.querySelectorAll(".card-btn");
  botonCarrito.forEach(boton => {
    boton.addEventListener("click", e => {
      const item = array.find((producto) => producto._id === e.target.id);
      console.log(item)
    })
  })

}

let url = "https://apipetshop.herokuapp.com/api/articulos";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let articulos = data.response;
    console.log(articulos)
    printMainFunctions(articulos);
  });

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
