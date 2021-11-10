function renderArticulos(array) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("row");
  let main = document.querySelector("main");
  array.forEach((articulo) => {
    newDiv.innerHTML += `
          
              <div class="card m-2" style="width: 20rem;">
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

let url = "https://apipetshop.herokuapp.com/api/articulos";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let articulos = data.response;
    let juguetes = articulos.filter((articulo) => articulo.tipo === "Juguete");
    let farmacia = articulos.filter(
      (articulo) => articulo.tipo === "Medicamento"
    );
    console.log(juguetes);
    console.log(farmacia);
    document.title === "Juguetes"
      ? renderArticulos(juguetes)
      : renderArticulos(farmacia);

      let loader = document.querySelectorAll(".loader");
      loader = Array.from(loader)
      loader.forEach(load => load.style.display = "none");
    
  });
