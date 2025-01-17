import { db } from "../config/firebaseConfig.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Función para configurar el efecto de deslizamiento
const setupSlidingEffect = () => {
    const productContainers = [...document.querySelectorAll('.product-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];

    productContainers.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        });

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        });
    });
};

// Función para obtener productos desde Firebase Firestore
const fetchProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const products = [];
        querySnapshot.forEach(doc => {
            products.push(doc.data());
        });

        console.log("Productos obtenidos desde Firebase:", products);

        // Aquí puedes llamar a tus funciones para mostrar productos
        createProductSlider(products, '#men-tshirt-products', 'Men');
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
};

// Función para crear un slider de productos
const createProductSlider = (data, parent, title) => {
    const slideContainer = document.querySelector(parent);

    if (!slideContainer) {
        console.error(`Contenedor no encontrado: ${parent}`);
        return;
    }

    const productsWithImages = data.filter(product => product.images?.length > 0);

    if (productsWithImages.length === 0) {
        console.warn('No hay productos con imágenes disponibles.');
        return;
    }

    slideContainer.innerHTML = `
        <section class="product">
            <h2 class="product-category">${title}</h2>
            <button class="pre-btn"><img src="public/img/arrow.png" alt="Prev"></button>
            <button class="nxt-btn"><img src="public/img/arrow.png" alt="Next"></button>
            <div class="product-container">
                ${productsWithImages.map(product => `
                    <a href="public/pages/product.html?id=${product.id}" class="product-card">
                        <div class="product-image">
                            <img src="${product.images[0]}" class="product-thumb" alt="${product.name}">
                            <button class="card-btn" onclick="addToCart('${product.id}')">add to cart</button>
                        </div>
                        <div class="product-info">
                            <h2 class="product-brand">${product.name}</h2>
                            <p class="product-short-des">${product.shortDes || 'No description'}</p>
                            <span class="price">$${product.sellPrice || 0}</span>
                            <span class="actual-price">$${product.actualPrice || 0}</span>
                        </div>
                    </a>
                `).join('')}
            </div>
        </section>
    `;

    setupSlidingEffect();
};

// Ejecuta la función para obtener los productos
fetchProducts();