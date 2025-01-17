document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const submitBtn = document.querySelector('.submit-btn');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    // Detect if the project is hosted on GitHub Pages
    const isGitHubPages = window.location.href.includes('github.io');
    const basePath = isGitHubPages ? '/aagustinngomez-Full-Stack-Project-Wodking/' : '/';

    submitBtn.addEventListener('click', () => {
        if (!email.value.length) {
            showAlert('Please enter your email');
        } else if (password.value.length < 8) {
            showAlert('Password must be at least 8 characters long');
        } else {
            loader.style.display = 'block';
            
            // Modify the fetch URL to include `basePath`
            fetch(`${basePath}login`, {
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
                if (data.message === 'Login successful') {
                    sessionStorage.setItem('user', JSON.stringify(data));
                    // Redirect to homepage with `basePath`
                    location.replace(basePath);
                } else {
                    showAlert(data.message);
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