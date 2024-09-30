const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = `
        <div class="nav">
            
            <img src="../img/wodking.png" class="brand-logo" alt="">
            <div class="nav-items">
                <div class="search">
                    <input type="text" class="search-box" placeholder="search brand, product">
                    <button class="search-btn">search</button>
                </div>
                <a>
                    <img src="../img/user.png" id="user-img" alt="">
                    <div class="login-logout-popup hide">
                        <p class="account-info">Log in as, name</p>
                        <button class="btn" id="user-btn">Log out</button>
                    </div>
                </a>
                <a href="../pages/cart.html"><img src="../img/cart.png" alt=""></a>
            </div>
        </div>
        <ul class="links-container">
            <li class="link-item"><a href="../pages/index.html" class="link">home</a></li>
            <li class="link-item"><a href="../pages/shop.html" class="link">shop</a></li>
            <li class="link-item"><a href="../pages/collections.html" class="link">Collections</a></li>
            <li class="link-item"><a href="../pages/contact.html" class="link">Contact</a></li>
        </ul>
    `;
}

createNav();

// nav popup
const userImageButton = document.querySelector('#user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

userImageButton.addEventListener('click', () => {
    userPopup.classList.toggle('hide');
})

window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
    if(user != null){
        // means user is logged in
        popuptext.innerHTML = `log in as, ${user.name}`;
        actionBtn.innerHTML = 'log out';
        actionBtn.addEventListener('click', () => {
            sessionStorage.clear();
            location.reload();
        })
    } else{
        // user is logged out
        popuptext.innerHTML = 'log in to place order';
        actionBtn.innerHTML = 'log in';
        actionBtn.addEventListener('click', () => {
            location.href = '../pages/login.html';
        })
    }
}

// search box

const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');
searchBtn.addEventListener('click', () => {
    if (searchBox.value.length) {
        const searchValue = encodeURIComponent(searchBox.value);
        location.href = `../pages/search.html?q=${searchValue}`;
    }
});

// Captura el parámetro de búsqueda desde la URL
const params = new URLSearchParams(window.location.search);
const searchKey = params.get('q');

// Verifica si hay un término de búsqueda
if (searchKey) {
    // Actualiza el contenido del DOM para reflejar el término de búsqueda
    document.querySelector('#search-key').textContent = `Search results for "${searchKey}"`;

    // Llama a la función para obtener productos relacionados con la búsqueda
    getProducts(searchKey).then(data => {
        createProductCards(data, '.card-container'); // Renderiza los productos
    }).catch(error => {
        console.error('Error fetching products:', error);
    });
} else {
    document.querySelector('#search-key').textContent = "No search key provided";
}

// Función para obtener los productos desde el backend según el término de búsqueda
function getProducts(searchKey) {
    return fetch(`/api/search?q=${encodeURIComponent(searchKey)}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error fetching products:', error));
}