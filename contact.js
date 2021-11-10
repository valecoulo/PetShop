const buttonSubmit = document.querySelector("#buttonSubmit");

buttonSubmit.addEventListener("click", e => {
    e.preventDefault();
    Swal.fire({
        title: "Hemos recibido sus datos correctamente"
    })
});