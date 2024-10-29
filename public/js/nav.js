const createNav = () => {
    const nav = document.querySelector('.navbar');

    const isGitHubPages = window.location.href.includes('github.io');
    
    const basePath = isGitHubPages ? '/aagustinngomez-Full-Stack-Project-Wodking/' : '/';

    nav.innerHTML = `
        <div class="nav">
            <a href="${basePath}">
                <img src="${basePath}public/img/WODKING.png" class="brand-logo" alt="Brand logo">
            </a>
            <div class="nav-items">
                <div class="search">
                    <input type="text" class="search-box" placeholder="Search brand, product">
                    <button class="search-btn">Search</button>
                </div>
                <a>
                    <img src="${basePath}public/img/user.png" id="user-img" alt="User icon">
                    <div class="login-logout-popup hide">
                        <p class="account-info">Log in as, name</p>
                        <button class="btn" id="user-btn">Log out</button>
                    </div>
                </a>
                <a href="${basePath}public/pages/cart.html"><img src="${basePath}public/img/cart.png" alt="Cart icon"></a>
            </div>
        </div>
        <ul class="links-container">
            <li class="link-item"><a href="${basePath}" class="link">Home</a></li>
            <li class="link-item"><a href="${basePath}public/pages/shop.html" class="link">Shop</a></li>
            <li class="link-item"><a href="${basePath}public/pages/aboutuss.html" class="link">About Us</a></li>
            <li class="link-item"><a href="${basePath}public/pages/contact.html" class="link">Contact</a></li>
        </ul>
    `;
};

    // Function to handle user login/logout
    const handleUserAuth = () => {
        const userImageButton = document.querySelector('#user-img');
        const userPopup = document.querySelector('.login-logout-popup');
        const popupText = document.querySelector('.account-info');
        const actionBtn = document.querySelector('#user-btn');

        userImageButton.addEventListener('click', () => {
            userPopup.classList.toggle('hide');
        });

        let user = JSON.parse(sessionStorage.user || null);
        if (user) {
            popupText.innerHTML = `Log in as, ${user.name}`;
            actionBtn.innerHTML = 'Log out';
            actionBtn.addEventListener('click', () => {
                sessionStorage.clear();
                location.reload();
            });
        } else {
            popupText.innerHTML = 'Log in to place an order';
            actionBtn.innerHTML = 'Log in';
            actionBtn.addEventListener('click', () => {
                location.href = `${basePath}public/pages/login.html`;
            });
        }
    };

// Function to handle search functionality
const handleSearch = () => {
    const searchBtn = document.querySelector('.search-btn');
    const searchBox = document.querySelector('.search-box');

    if (!searchBtn || !searchBox) {
        console.error('Search button or search box not found!');
        return; // Exit if the button or search box is not found
    }

    searchBtn.addEventListener('click', () => {
        if (searchBox.value.length) {
            const searchValue = encodeURIComponent(searchBox.value);
            location.href = `/public/pages/search.html?q=${searchValue}`;
        }
    });

    // Check if we are on the search results page by looking for #search-key
    const searchKeyElement = document.querySelector('#search-key');
    if (!searchKeyElement) {
        // Not on the search results page, no need to proceed
        return;
    }

    // Capture the search parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const searchKey = params.get('q');

    // Check if there is a search term
    if (searchKey) {
        searchKeyElement.textContent = `Search results for "${searchKey}"`;
        getProducts(searchKey)
            .then(data => {
                createProductCards(data, '.card-container'); // Render the products
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    } else {
        searchKeyElement.textContent = "No search key provided";
    }
};

// Ensure DOM is ready before running search functionality
document.addEventListener('DOMContentLoaded', () => {
    createNav(); // Ensure nav is created first
    handleUserAuth(); // User authentication
    handleSearch(); // Initialize search functionality
});