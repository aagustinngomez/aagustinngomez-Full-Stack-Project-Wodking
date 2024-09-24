document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const submitBtn = document.querySelector('.submit-btn');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    submitBtn.addEventListener('click', () => {
        if (!email.value.length) {
            showAlert('Introduce tu correo electrónico');
        } else if (password.value.length < 8) {
            showAlert('La contraseña debe tener al menos 8 caracteres');
        } else {
            loader.style.display = 'block';
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Inicio de sesión exitoso') {
                    sessionStorage.setItem('user', JSON.stringify(data));
                    location.replace('/');
                } else {
                    showAlert(data.message);
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