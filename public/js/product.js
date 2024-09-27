// Select the main product image
const productMainImage = document.querySelector('.product-main-image');

// Select all image thumbnails
const productImages = document.querySelectorAll(".product-images img");
const productImageSlide = document.querySelector(".image-slider"); // Select the image slider

let activeImageSlide = 0; // Default active image in the slider

productImages.forEach((item, i) => {
    item.addEventListener('click', () => {
        productImages[activeImageSlide].classList.remove('active'); // Remove 'active' class from the current thumbnail
        item.classList.add('active'); // Add 'active' class to the clicked thumbnail
        productMainImage.src = item.src; // Change the main image to the clicked image
        activeImageSlide = i; // Update the active image index
    });
});

// Toggle size buttons

const sizeBtns = document.querySelectorAll('.size-radio-btn'); // Select size buttons
let checkedBtn = 0; // Default checked button
let size;

sizeBtns.forEach((item, i) => { // Iterate through each button
    item.addEventListener('click', () => { // Add click event to each button
        sizeBtns[checkedBtn].classList.remove('check'); // Remove 'check' class from the current button
        item.classList.add('check'); // Add 'check' class to the clicked button
        checkedBtn = i; // Update the checked button
        size = item.innerHTML; // Get the selected size
    });
});

// Function to add the product to the cart
const addProductToCart = (productId) => {
    console.log('Attempting to add product to cart with ID:', productId);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    fetch(`/api/get-products?id=${productId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(product => {
        console.log("Product received from server:", product);

        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product); 
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} has been added to the cart.`);
    })
    .catch(err => {
        console.error('Error fetching product:', err);
    });
};

// Get product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id'); // Ensure 'id' is present in the URL

// Wait for the page content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add a click event to the "Add to Cart" button
    const addToCartButton = document.getElementById('add-to-cart');
    
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const tacChecked = document.getElementById('tac-checkbox').checked;

            if (!tacChecked) {
                alert('You must agree to the terms and conditions');
                return; // Prevent further execution if unchecked
            }

            if (!productId) {
                console.error('Product ID is missing');
                return;
            }

            // Process the addition to the cart
            addProductToCart(productId);
        });
    } else {
        console.error('"Add to Cart" button not found on the page.');
    }

    // Load the product data
    fetchProductData();
});

// Function to set product data on the page
const setData = (data) => {
    let title = document.querySelector('title');

    // Validate images
    if (data.images && data.images.length > 0) {
        productImages.forEach((img, i) => {
            if (data.images[i]) {
                img.src = data.images[i];
                img.style.display = 'block'; // Ensure it's displayed
            } else {
                img.style.display = 'none'; // Hide if no image
            }
        });
        if (data.images.length > 0) {
            productImages[0].click(); // Activate the first image
        }
    }

    // Set up size buttons
    const sizeBtns = document.querySelectorAll('.size-radio-btn');
    if (data.sizes && data.sizes.length > 0) {
        sizeBtns.forEach(item => {
            if (!data.sizes.includes(item.innerHTML)) {
                item.style.display = 'none';
            } else {
                item.style.display = 'inline-block'; // Ensure it's displayed
            }
        });
    }

    // Set up text fields
    const name = document.querySelector('.product-brand');
    const shortDes = document.querySelector('.product-short-des');
    const des = document.querySelector('.des');

    title.innerHTML += ` | ${data.name || 'Product'}`; // Add product name or fallback value
    name.innerHTML = data.name || 'Product name unavailable';
    shortDes.innerHTML = data.shortDes || 'Short description unavailable';
    des.innerHTML = data.des || 'Description unavailable';

    // Set up prices
    const actualPrice = parseFloat(data.actualPrice);
    const discount = parseFloat(data.discount);
    const sellPrice = parseFloat(data.sellPrice);
    console.log('Actual Price:', actualPrice);
    console.log('Discount:', discount);
    console.log('Sell Price:', sellPrice);

    sellPrice.innerHTML = `$${data.sellPrice || 0}`;
    actualPrice.innerHTML = `$${data.actualPrice || 0}`;
    discount.innerHTML = data.discount ? `( ${data.discount}% off )` : '';

    // Set up the add to cart button
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.addEventListener('click', () => {
        addProductToCart(productId); // Call addToCart function on button click
    });
};

// Function to fetch product data from the backend
const fetchProductData = () => {
    // Verificar que el productId es válido
    if (!productId) {
        console.error('Product ID is missing or invalid.');
        location.replace('../pages/404.html'); // Redirigir si el ID es inválido
        return;
    }

    fetch(`/api/get-products?id=${productId}`, { // Usa el endpoint correcto
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json' })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Product not found'); // Manejo del error si no está ok
        }
        return res.json();
    })
    .then(data => {
        console.log('Product data:', data);
        setData(data); // Configurar los datos del producto en la página

        // Verificar que data.tags tenga al menos un elemento
        if (data.tags && data.tags.length > 0) {
            getProducts(data.tags[0]) // Asegúrate de que los índices sean correctos
                .then(products => createProductSlider(products, '.container-for-card-slider', 'Similar Products'))
                .catch(err => {
                    console.error('Error fetching similar products:', err);
                });
        } else {
            console.warn('No tags available for similar products.');
        }
    })
    .catch(err => {
        console.error('Fetch error:', err);
        location.replace('../pages/404.html'); // Redirigir si ocurre un error
    });
};

// Fetch all products from the API
fetch('/api/products')
  .then(response => {
      if (!response.ok) {
          throw new Error('Network error');
      }
      return response.json();
  })
  .then(data => {
      console.log("Product data from API:", data);
      createProductSlider(data, '.contenedor', 'All Products');
  })
  .catch(error => console.error("Error fetching products:", error));

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-to-cart').addEventListener('click', () => {
        const tacChecked = document.getElementById('tac-checkbox').checked;

        if (!tacChecked) {
            alert('You must agree to the terms and conditions');
            return; // Prevent further execution if unchecked
        }

        // Process the addition to the cart
        addProductToCart(productId);
    });
}); 