document.addEventListener("DOMContentLoaded", () => {
    // Elementos de la página
    const productGrid = document.querySelector(".product-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // Función para obtener productos desde Firebase o el backend
    const fetchProducts = () => {
        return fetch('/test-firebase') // Cambia el endpoint si usas otro backend
            .then(response => response.json())
            .then(data => {
                console.log('Fetched products:', data);
                return data;
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    // Función para renderizar los productos en un formato de cuadrícula
    const renderProducts = (products) => {
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = ''; 
    
        // Generar HTML para cada producto
        products.forEach(product => {
            const productHTML = `
                <a href="../pages/product.html?id=${product.id}" class="product-card">
                    <div class="product-image">
                        <img src="${product.images[0]}" class="product-thumb" alt="Product Image">
                        <button class="card-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
                    </div>
                    <div class="product-info">
                        <h2 class="product-brand">${product.name || 'Name not available'}</h2>
                        <p class="product-short-des">${product.shortDes || 'Description not available'}</p>
                        <span class="price">$${product.sellPrice || 0}</span>
                        <span class="actual-price">$${product.actualPrice || 0}</span>
                    </div>
                </a>
            `;
    
            // Insertar cada producto en el grid
            productGrid.innerHTML += productHTML;
        });
    };

    // Filtrar productos por categoría
    const filterProductsByCategory = (products, category) => {
        if (category === "all") return products;
        return products.filter(product => product.tags.includes(category));
    };

    // Manejar eventos de filtrado por categoría
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");
            
            fetchProducts().then(products => {
                const filteredProducts = filterProductsByCategory(products, category);
                renderProducts(filteredProducts);
            });
        });
    });

    // Mostrar todos los productos al cargar la página
    fetchProducts().then(products => {
        renderProducts(products);
    });
});