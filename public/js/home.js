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

// Fetch products from the API
const fetchProductsFromAPI = (tag) => {
    return fetch(`/api/get-products?tag=${encodeURIComponent(tag)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => {
                throw new Error(`HTTP error! status: ${res.status} - ${err.message || 'Unknown error'}`);
            });
        }
        return res.json();
    })
    .catch(error => {
        console.error('Error fetching products:', error.message);
        return { error: 'Failed to fetch products' };
    });
};


const createProductSlider = (data, parent, title) => {
    let slideContainer = document.querySelector(`${parent}`);

    if (!slideContainer) {
        console.error(`Could not find container: ${parent}`);
        return;
    }

    // Log all products to verify their structure
    console.log('Fetched products:', data);

    const productsWithImages = data.filter(product => {
        if (!Array.isArray(product.images) || product.images.length === 0) {
            console.warn('Product without valid images:', product);
            return false;
        }
        return true;
    });

    if (productsWithImages.length === 0) {
        console.warn('No products with images available to display.');
        return;
    }

    slideContainer.innerHTML = `
    <section class="product">
        <h2 class="product-category">${title}</h2>
        <button class="pre-btn"><img src="/public/img/arrow.png" alt="Prev"></button>
        <button class="nxt-btn"><img src="/public/img/arrow.png" alt="Next"></button>
        <div class="product-container">
             ${productsWithImages.map(product => `
                 <a href="public/pages/product.html?id=${product.id}" class="product-card">
                     <div class="product-image">
                           <img src="${product.images[0]}" class="product-thumb" alt="Product Image">
                           <button class="card-btn" onclick="addToCart('${product.id}')">add to cart</button>
                       </div>
                       <div class="product-info">
                            <h2 class="product-brand">${product.name || 'Name not available'}</h2>
                            <p class="product-short-des">${product.shortDes || 'Description not available'}</p>
                            <span class="price">$${product.sellPrice || 0}</span>
                            <span class="actual-price">$${product.actualPrice || 0}</span>
                        </div>
                    </a>
             `).join('')}
            </div>
    </section>
    `;

    // Call setupSlidingEffect after creating the HTML structure
    setupSlidingEffect();
};

// Fetch and display products from Firebase
fetch('http://localhost:3000/test-firebase')
    .then(response => response.json())
    .then(products => {
        console.log("Products fetched from Firebase:", products);

        // Log each product to check its structure
        products.forEach(product => {
            if (typeof product.tags === 'string') {
                product.tags = product.tags.split(',').map(tag => tag.trim());
            } else if (!Array.isArray(product.tags)) {
                product.tags = [];  
            }
        });

        // Filtro de productos según etiquetas
        const menTshirtProducts = products.filter(product =>
            Array.isArray(product.tags) && product.tags.length > 0 && product.tags.some(tag => tag.toLowerCase().includes('men'))
        );

        const shoesProducts = products.filter(product =>
            product.tags && 
            product.tags.some(tag => tag.toLowerCase().includes('shoes'))
        );

        const bestsellerProducts = products.filter(product =>
            product.tags && 
            product.tags.some(tag => tag.toLowerCase().includes('bestseller'))
        );

        const accessoriesProducts = products.filter(product =>
            product.tags && 
            product.tags.some(tag => tag.toLowerCase().includes('accessories'))
        );

        const womenProducts = products.filter(product => 
            product.tags &&
            product.tags.some(tag => tag.toLowerCase().includes('women'))
        );

        // Crear sliders para cada categoría
        if (menTshirtProducts.length > 0) {
            createProductSlider(menTshirtProducts, '#men-tshirt-products', 'Men');
        }

        if (shoesProducts.length > 0) {
            createProductSlider(shoesProducts, '#shoes-products', 'Shoes');
        }

        if (bestsellerProducts.length > 0) {
            createProductSlider(bestsellerProducts, '#bestseller-products', 'bestseller');
        }

        if (accessoriesProducts.length > 0) {
            createProductSlider(accessoriesProducts, '#accessories-products', 'Accessories');
        }

        if (womenProducts.length > 0) {
            createProductSlider(womenProducts, '#women-products', 'Women');
        }
    }) 
    .catch(error => console.error('Error fetching products:', error));

// Create product cards
const createProductCards = (products) => {
    const productCardsContainer = document.createElement('div');
    productCardsContainer.className = 'product-cards';

    // Generate product cards
    products.forEach(product => {
        console.log(product.tags);
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Structure of each product card
        productCard.innerHTML = `
            <div class="product-image">
                ${product.draft ? `<span class="tag">Draft</span>` : ''}
                <img src="${product.images[0]}" class="product-thumb" alt="Image of ${product.name || 'Product'}">
            </div>
            <div class="product-info">
                <h2 class="product-brand">${product.name || 'Name not available'}</h2>
                <p class="product-short-des">${product.shortDes || 'Description not available'}</p>
                <span class="price">$${product.sellPrice || 0}</span> 
                <span class="actual-price">$${product.actualPrice || 0}</span>
            </div>
        `;

        // Append the card to the container
        productCardsContainer.appendChild(productCard);
        console.log(Array.isArray(product.tags));
    });

    return productCardsContainer;
};

// Add product to cart 
const add_product_to_cart = (type, product, size = null) => {
    try {
        // Ensure product has the required properties
        if (!product || !product.name || !product.sellPrice || !product.images || !product.images.length) {
            throw new Error("The product does not have all the required data.");
        }

        let data = JSON.parse(localStorage.getItem(type)) || [];

        // Check if the product already exists in the list based on name and size
        const existingProductIndex = data.findIndex(item => item.name === product.name && item.size === size);

        if (existingProductIndex > -1) {
            // If the product exists, increase the quantity
            data[existingProductIndex].item += 1;
        } else {
            // If the product doesn't exist, add it
            const newProduct = {
                item: 1,
                name: product.name,
                sellPrice: product.sellPrice,
                size: size || null,  // You could force size selection if necessary
                shortDes: product.shortDes || 'Description not available',
                image: product.images[0] || ''  // Ensure image exists
            };

            data.push(newProduct);
        }

        // Update localStorage
        localStorage.setItem(type, JSON.stringify(data));

        // Display success message
        alert(`${product.name} has been added to the cart.`);
    } catch (error) {
        console.error("Error adding product:", error.message);
        alert("There was an issue adding the product. Please try again.");
    }
};