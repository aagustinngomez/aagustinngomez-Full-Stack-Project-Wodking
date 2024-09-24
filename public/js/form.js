// redirect to home page if user logged in
window.onload = () => {
    if(sessionStorage.user){
        user = JSON.parse(sessionStorage.user);
        if(compareToken(user.authToken, user.email)){
            location.replace('/');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const submitBtn = document.querySelector('.submit-btn');
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const confirmEmail = document.querySelector('#confirm-email');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm-password');
    const number = document.querySelector('#number');
    const gender = document.querySelector('#gender');
    const tac = document.querySelector('#terms-and-cond');
    const notification = document.querySelector('#notification');

    submitBtn.addEventListener('click', () => {
        if (name.value.length < 3) {
            showAlert('El nombre debe tener al menos 3 letras');
        } else if (!email.value.length) {
            showAlert('Introduce tu correo electrónico');
        } else if (password.value.length < 8) {
            showAlert('La contraseña debe tener al menos 8 caracteres');
        } else if (!number.value.length) {
            showAlert('Introduce tu número de teléfono');
        } else if (!Number(number.value) || number.value.length < 10) {
            showAlert('Número inválido, introduce uno válido');
        } else if (!tac.checked) {
            showAlert('Debes aceptar los términos y condiciones');
        } else {
            loader.style.display = 'block';
            fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    number: number.value,
                    gender: gender.value
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Usuario registrado correctamente') {
                    location.replace('/');
                } else {
                    showAlert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('Algo salió mal');
            })
            .finally(() => {
                loader.style.display = 'none';
            });
        }
    });
});