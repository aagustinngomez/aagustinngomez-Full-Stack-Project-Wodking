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
            showAlert('Name must be at least 3 characters long');
        } else if (!email.value.length) {
            showAlert('Please enter your email address');
        } else if (password.value.length < 8) {
            showAlert('Password must be at least 8 characters long');
        } else if (!number.value.length) {
            showAlert('Please enter your phone number');
        } else if (!Number(number.value) || number.value.length < 10) {
            showAlert('Invalid number, please enter a valid phone number');
        } else if (!tac.checked) {
            showAlert('You must accept the terms and conditions');
        } else {
            loader.style.display = 'block';
            console.log({
                name: name.value,
                email: email.value,
                password: password.value,
                number: number.value,
                gender: gender.value
            });
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
                if (data.message === 'User registered successfully') {
                    location.replace('/');
                } else {
                    showAlert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('Something went wrong');
            })
            .finally(() => {
                loader.style.display = 'none';
            });
        }
    });
});