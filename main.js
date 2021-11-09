
function renderArticulos (array) {
    let newDiv = document.createElement('div');
    newDiv.classList.add('row')
    let main = document.querySelector('main')
    array.forEach(articulo => {
        newDiv.innerHTML += `
        <div class="div-articulo col-12 col-lg-4">
            <img src="${articulo.imagen}" width="150px" alt="imagen">
            <h3>${articulo.nombre}</h3>
            <p>${articulo.descripcion}</p>
            <p>$${articulo.precio}</p>
            <p>${articulo.stock <= 5 ? 'Ultima unidades' : "Stock: " + articulo.stock}</p>
        </div>
        `
    main.appendChild(newDiv)
})
}




let url = 'https://apipetshop.herokuapp.com/api/articulos'

fetch(url)
.then(res => res.json())
.then(data => {
    let articulos = data.response
    let juguetes = articulos.filter(articulo => articulo.tipo === 'Juguete')
    let farmacia = articulos.filter(articulo => articulo.tipo === 'Medicamento')
    console.log(juguetes)
    console.log(farmacia)
    document.title === 'Juguetes' ? renderArticulos(juguetes) : renderArticulos(farmacia)
})