document.addEventListener("DOMContentLoaded", () => {
    // Page elements
    const productGrid = document.querySelector(".product-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // Function to fetch products from Firebase or backend
    const fetchProducts = () => {
        return fetch('/test-firebase')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error('No products found or data is not in the expected format.');
                }
                console.log('Fetched products:', data);
                return data;
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                return []; // Return an empty array on error
            });
    };

    // Function to render products in a grid format
    const renderProducts = (products) => {
        console.log('Number of products rendered:', products.length);
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = '';

        // Generate HTML for each product
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
                        <span class="price">$${product.sellPrice || 0}</span>
                        <span class="actual-price">$${product.actualPrice || 0}</span>
                    </div>
                </a>
            `;
        
            productGrid.innerHTML += productHTML;
        });
    };

    // Filter products by category
    const filterProductsByCategory = (products, category) => {
        if (category === "all") return products;
        return products.filter(product => product.tags.includes(category));
    };

    // Handle filtering by category events
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");

            fetchProducts().then(products => {
                const filteredProducts = filterProductsByCategory(products, category);
                renderProducts(filteredProducts);
            });
        });
    });

    // Show all products when the page loads
    fetchProducts().then(products => {
        renderProducts(products);
    });
});