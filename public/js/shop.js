import { db } from '../config/firebaseConfig.js'; 
import { collection, getDocs } from 'firebase/firestore';

const getProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log("Productos obtenidos:", products);
        renderProducts(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
};

const renderProducts = (products) => {
    const productContainer = document.querySelector('.product-container');
    if (!productContainer) {
        console.error("No se encontró el contenedor de productos");
        return;
    }

    productContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.images[0]}" alt="${product.name}" class="product-img">
            <h3>${product.name}</h3>
            <p>${product.shortDes}</p>
            <span>$${product.sellPrice}</span>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    `).join('');

    console.log(`Número de productos renderizados: ${products.length}`);
};

getProducts();