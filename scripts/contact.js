const buttonSubmit = document.querySelector("#buttonSubmit");

buttonSubmit.addEventListener("click", e => {
    e.preventDefault();
    Swal.fire({
        title: 'Hemos recibido tus datos correctamente!',
        text: 'Muchas gracias!',
        imageUrl: './assets/dog_smiling_contact.jpeg',
        // imageWidth: 400,
        imageHeight: 200,
        backgroundColor: 'black'
    })
});