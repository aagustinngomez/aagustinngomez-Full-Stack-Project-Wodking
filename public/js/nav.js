const isGitHubPages = window.location.href.includes('github.io');
const basePath = isGitHubPages ? '/aagustinngomez-Full-Stack-Project-Wodking/' : '/';

const createNav = () => {
    const nav = document.querySelector('.navbar');
    if (!nav) return; 

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

const handleUserAuth = () => {
    const userImageButton = document.querySelector('#user-img');
    const userPopup = document.querySelector('.login-logout-popup');
    const popupText = document.querySelector('.account-info');
    const actionBtn = document.querySelector('#user-btn');

    if (!userImageButton || !userPopup || !popupText || !actionBtn) return; // Verifica elementos

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

const handleSearch = () => {
    const searchBtn = document.querySelector('.search-btn');
    const searchBox = document.querySelector('.search-box');

    if (!searchBtn || !searchBox) return; 

    searchBtn.addEventListener('click', () => {
        if (searchBox.value.length) {
            const searchValue = encodeURIComponent(searchBox.value);
            location.href = `${basePath}public/pages/search.html?q=${searchValue}`; 
        }
    });

    const searchKeyElement = document.querySelector('#search-key');
    if (!searchKeyElement) return;

    const params = new URLSearchParams(window.location.search);
    const searchKey = params.get('q');

    if (searchKey) {
        searchKeyElement.textContent = `Search results for "${searchKey}"`;
        getProducts(searchKey)
            .then(data => {
                createProductCards(data, '.card-container'); 
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    } else {
        searchKeyElement.textContent = "No search key provided";
    }
};

document.addEventListener('DOMContentLoaded', () => {
    createNav();
    handleUserAuth();
    handleSearch();
});