const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = `
        <div class="nav">
            <img src="../img/wodking.png" class="brand-logo" alt="Brand logo">
            <div class="nav-items">
                <div class="search">
                    <input type="text" class="search-box" placeholder="Search brand, product">
                    <button class="search-btn">Search</button>
                </div>
                <a>
                    <img src="../img/user.png" id="user-img" alt="User icon">
                    <div class="login-logout-popup hide">
                        <p class="account-info">Log in as, name</p>
                        <button class="btn" id="user-btn">Log out</button>
                    </div>
                </a>
                <a href="../pages/cart.html"><img src="../img/cart.png" alt="Cart icon"></a>
            </div>
        </div>
        <ul class="links-container">
            <li class="link-item"><a href="../pages/index.html" class="link">Home</a></li>
            <li class="link-item"><a href="../pages/shop.html" class="link">Shop</a></li>
            <li class="link-item"><a href="../pages/collections.html" class="link">Collections</a></li>
            <li class="link-item"><a href="../pages/contact.html" class="link">Contact</a></li>
        </ul>
    `;
}

createNav();

// nav popup
const userImageButton = document.querySelector('#user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popupText = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

userImageButton.addEventListener('click', () => {
    userPopup.classList.toggle('hide');
});

window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
    if (user != null) {
        // User is logged in
        popupText.innerHTML = `Log in as, ${user.name}`;
        actionBtn.innerHTML = 'Log out';
        actionBtn.addEventListener('click', () => {
            sessionStorage.clear();
            location.reload();
        });
    } else {
        // User is logged out
        popupText.innerHTML = 'Log in to place an order';
        actionBtn.innerHTML = 'Log in';
        actionBtn.addEventListener('click', () => {
            location.href = '../pages/login.html';
        });
    }
};

// Search box
const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');
searchBtn.addEventListener('click', () => {
    if (searchBox.value.length) {
        const searchValue = encodeURIComponent(searchBox.value);
        location.href = `../pages/search.html?q=${searchValue}`;
    }
});

// Capture the search parameter from the URL
const params = new URLSearchParams(window.location.search);
const searchKey = params.get('q');

// Check if there is a search term
if (searchKey) {
    // Update the DOM content to reflect the search term
    document.querySelector('#search-key').textContent = `Search results for "${searchKey}"`;

    // Call the function to fetch related products
    getProducts(searchKey).then(data => {
        createProductCards(data, '.card-container'); // Render the products
    }).catch(error => {
        console.error('Error fetching products:', error);
    });
} else {
    document.querySelector('#search-key').textContent = "No search key provided";
}

// Function to fetch products from the backend based on the search term
function getProducts(searchKey) {
    return fetch(`/api/search?q=${encodeURIComponent(searchKey)}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error fetching products:', error));
}