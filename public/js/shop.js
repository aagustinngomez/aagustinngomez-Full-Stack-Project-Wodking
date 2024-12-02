import { db } from "../config/firebaseConfig.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.querySelector(".product-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const products = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log("Fetched products:", products);
            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    };

    const renderProducts = (products) => {
        console.log("Number of products rendered:", products.length);
        productGrid.innerHTML = "";

        if (products.length === 0) {
            productGrid.innerHTML = '<p>No products found.</p>';
            return;
        }

        products.forEach(product => {
            const productHTML = `
                <a href="../pages/product.html?id=${product.id}" class="product-card">
                    <div class="product-image">
                        <img src="${product.images && product.images[0] ? product.images[0] : 'default-image-path.png'}" class="product-thumb" alt="${product.name || 'Product Image'}">
                        <button class="card-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
                    </div>
                    <div class="product-info">
                        <h2 class="product-brand">${product.name || 'Name not available'}</h2>
                        <p class="product-short-des">${product.shortDes || 'Description not available'}</p>
                        <span class="price">$${parseFloat(product.sellPrice) || 0}</span>
                        <span class="actual-price">$${parseFloat(product.actualPrice) || 0}</span>
                    </div>
                </a>
            `;
            productGrid.innerHTML += productHTML;
        });
    };

    const filterProductsByCategory = (products, category) => {
        if (category === "all") return products;
        return products.filter(product => Array.isArray(product.tags) && product.tags.includes(category));
    };

    filterButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const category = button.getAttribute("data-category");
            const products = await fetchProducts();
            const filteredProducts = filterProductsByCategory(products, category);
            renderProducts(filteredProducts);
        });
    });

    (async () => {
        const products = await fetchProducts();
        renderProducts(products);
    })();
});