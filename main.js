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
                      <a href="#" class="btn btn-primary">Añadir al Carro</a>
                  </div>    
              </div>
          `;
    main.appendChild(newDiv);
  });
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
  let loader = document.querySelectorAll(".loader");
  loader = Array.from(loader)
  loader.forEach(load => load.style.display = "none");
}

let url = "https://apipetshop.herokuapp.com/api/articulos";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let articulos = data.response;
    
    printMainFunctions(articulos);

  });