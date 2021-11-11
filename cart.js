const productsElement = document.querySelector(".products");
const cartItemsElement = document.querySelector(".cart-items");

function renderProducts() {
    products.forEach((product) => {
        productsElement.innerHTML += `

        `
    });
}

renderProducts()

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
    cart.forEach((item) => {
        cartItemsElement.innerHTML += `
        <div class="cart-item">
            <div class="cart-info">
                <img src="${item.imagen}" alt="${item.nombre}">
                <h4>${item.nombre}</h4>
            </div>
            <div class="unit-price">
                ${item.precio}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.NumberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
            </div>
        </div>
        `
    })
}