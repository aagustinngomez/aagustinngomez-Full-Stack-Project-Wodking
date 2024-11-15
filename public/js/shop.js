document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.querySelector(".product-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");

    const fetchProducts = () => {
        return fetch('https://agustin-b41f3-default-rtdb.firebaseio.com/products.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && typeof data === "object" && !Array.isArray(data)) {
                    data = Object.values(data);
                }
    
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error('No products found or data is not in the expected format.');
                }

                data.forEach((product, index) => {
                    if (!product.name || !product.sellPrice || !product.actualPrice || !product.images || !product.tags) {
                        console.warn(`Producto en índice ${index} no tiene los campos esperados:`, product);
                    }
                });
    
                console.log('Fetched products:', data);
                return data;
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                return []; 
            });
    };

    const renderProducts = (products) => {
        console.log('Number of products rendered:', products.length);
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = '';

        products.forEach(product => {
            const productHTML = `
                <a href="../pages/product.html?id=${product.id}" class="product-card">
                    <div class="product-image">
                        <img src="${product.images && product.images[0] ? product.images[0] : 'default-image-path.png'}" class="product-thumb" alt="Product Image">
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
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");

            fetchProducts().then(products => {
                const filteredProducts = filterProductsByCategory(products, category);
                renderProducts(filteredProducts);
            });
        });
    });

    fetchProducts().then(products => {
        renderProducts(products);
    });
});