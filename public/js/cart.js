const createSmallCards = (data) => {
    // Verify the data is valid before continuing
    const imageUrl = data.image || '../public/img/default.png'; // Default image path if no image is available
    const sellPrice = data.sellPrice || 0;
    const itemCount = data.item || 1;

    return `
    <div class="sm-product">
        <img src="${imageUrl}" class="sm-product-img" alt="${data.name}">
        <div class="sm-text">
            <p class="sm-product-name">${data.name}</p>
            <p class="sm-des">${data.shortDes}</p>
        </div>
        <div class="item-counter">
            <button class="counter-btn decrement">-</button>
            <p class="item-count">${itemCount}</p> <!-- Quantity counter -->
            <button class="counter-btn increment">+</button>
        </div>
        <p class="sm-price" data-price="${sellPrice}">$${(sellPrice * itemCount).toFixed(2)}</p>
        <button class="sm-delete-btn"><img src="../public/img/close.png" alt="Delete"></button>
    </div>
    `;
};

const addToCart = (productId) => {
    console.log('Product ID:', productId);
    
    // Get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Make a request to get product data by its ID
    fetch(`/api/get-products?id=${productId}`, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json' })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error fetching product from the API');
        }
        return res.json();
    })
    .then(product => {
        console.log('Fetched product:', product);  // Check if the product has the correct structure

        // Find if the product is already in the cart
        const productIndex = cart.findIndex(item => item.id === product.id);

        if (productIndex > -1) {
            // If the product is already in the cart, increase the quantity
            cart[productIndex].item += 1;
        } else {
            // If the product is not in the cart, add it with quantity 1
            product.item = 1;  // Ensure the initial quantity is 1
            cart.push(product);
        }

        // Save the updated cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Product added to cart:', cart);

        // Update the products in the UI
        setProducts('cart'); 

        // Show a message to the user
        alert(`${product.name} has been added to the cart.`);
    })
    .catch(err => console.error('Error adding product to the cart:', err));
};

const setProducts = (name) => {
    const element = document.querySelector(`.${name}`);

    if (!element) {
        console.error(`Element with class "${name}" not found.`);
        return;
    }

    let data = JSON.parse(localStorage.getItem(name));

    element.innerHTML = '';

    if (!data || data.length === 0) {
        element.innerHTML = `<img src="../img/empty-cart.png" class="empty-img" alt="Empty cart">`;
    } else {
        data.forEach((product, index) => {
            element.innerHTML += createSmallCards(product, index);
        });
    }

    // Update the total bill
    updateBill();

    // Set up events for increment and decrement buttons
    setupEvents();
};

const updateBill = () => {
    const products = JSON.parse(localStorage.getItem('cart')) || [];

    // Log products from localStorage to the console
    console.log('Products in the cart:', products);

    // Ensure valid values for sellPrice and item
    let totalBill = products.reduce((sum, product) => {
        const price = parseFloat(product.sellPrice) || 0;  // Ensure sellPrice is a valid number
        const quantity = parseInt(product.item, 10) || 0;   // Ensure item is a valid number

        // Log the values being summed to the console
        console.log(`Product: ${product.name}, Price: ${price}, Quantity: ${quantity}`);

        return sum + (price * quantity);
    }, 0);

    // Update the total in the DOM
    document.querySelector('.bill').textContent = `$${totalBill.toFixed(2)}`;
};

const setupEvents = (name) => {
    const counterMinus = document.querySelectorAll(`.${name} .decrement`);
    const counterPlus = document.querySelectorAll(`.${name} .increment`);
    const counts = document.querySelectorAll(`.${name} .item-count`);
    const price = document.querySelectorAll(`.${name} .sm-price`);
    const deleteBtn = document.querySelectorAll(`.${name} .sm-delete-btn`);

    // Get products from localStorage
    let product = JSON.parse(localStorage.getItem(name)) || [];

    counts.forEach((item, i) => {
        let cost = parseFloat(price[i].getAttribute('data-price')) || 0;

        // Decrement button
        counterMinus[i].addEventListener('click', () => {
            if (item.innerHTML > 1) {
                item.innerHTML--;

                // Update price in the DOM
                price[i].innerHTML = `$${(item.innerHTML * cost).toFixed(2)}`;

                // Update quantity in the product object
                product[i].item = Number(item.innerHTML);
                localStorage.setItem(name, JSON.stringify(product));

                // Recalculate the total bill
                updateBill();
            }
        });

        // Increment button
        counterPlus[i].addEventListener('click', () => {
            if (item.innerHTML < 9) {
                item.innerHTML++;

                // Update price in the DOM
                price[i].innerHTML = `$${(item.innerHTML * cost).toFixed(2)}`;

                // Update quantity in the product object
                product[i].item = Number(item.innerHTML);
                localStorage.setItem(name, JSON.stringify(product));

                // Recalculate the total bill
                updateBill();
            }
        });
    });

    // Handle delete product buttons
    deleteBtn.forEach((item, i) => {
        item.addEventListener('click', () => {
            product = product.filter((data, index) => index !== i);
            localStorage.setItem(name, JSON.stringify(product));
            
            const productElement = deleteBtn[i].closest('.sm-product');
            productElement.remove();

            // Recalculate the total bill
            updateBill();
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    setProducts('cart');
});