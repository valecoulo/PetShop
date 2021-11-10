function renderArticulos(array) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("row");
  let main = document.querySelector("main");
  array.forEach((articulo) => {
    newDiv.innerHTML += `
          
              <div class="card m-2" >
                  <div class="card-body">
                      <img class="card-img" src="${
                        articulo.imagen
                      }" width="150px" alt="imagen" class="card-img-top">
                      <h3 class="card-title fs-5">${articulo.nombre}</h3>
                      <div class="card-description"> 
                        <p>${truncate(articulo.descripcion, 80)}</p>
                        <p class="description fs-6">${articulo.descripcion}</p>
                        <p class="card-text">${
                          articulo.stock <= 5
                            ? "Ultima unidades"
                            : "Stock: " + articulo.stock
                        }</p>
                      </div>
                      <p class="card-text fs-5 ">Precio: $${articulo.precio}</p>
                      <a href="#" class="btn btn-danger card-btn">Añadir al Carro</a>
                  </div>   
              </div>
            
          `;
    main.appendChild(newDiv);
  });
}

function printMainFunctions(array) {
  let juguetes = array.filter((articulo) => articulo.tipo === "Juguete");
  let farmacia = array.filter((articulo) => articulo.tipo === "Medicamento");

  document.title === "Juguetes"
    ? renderArticulos(juguetes)
    : renderArticulos(farmacia);
  let loader = document.querySelectorAll(".loader");
  loader = Array.from(loader);
  loader.forEach((load) => (load.style.display = "none"));
}

let url = "https://apipetshop.herokuapp.com/api/articulos";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let articulos = data.response;

    printMainFunctions(articulos);
  });

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
