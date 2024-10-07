const createSmallCards = (data) => {
    const imageUrl = data.images[0] || '../public/img/default.png';
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
            <p class="item-count">${itemCount}</p>
            <button class="counter-btn increment">+</button>
        </div>
        <p class="sm-price" data-price="${sellPrice}">$${(sellPrice * itemCount).toFixed(2)}</p>
        <button class="sm-delete-btn"><img src="/img/close.png" alt="Delete"></button>
    </div>
    `;
};

const addToCart = (productId) => {
    
    // Get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Current cart before adding:', cart);

    // Fetch product data by ID
    fetch(`/api/get-products?id=${productId}`)
    .then(res => {
        if (!res.ok) {
            throw new Error('Error fetching product from the API');
        }
        return res.json();
    })
    .then(product => {
        
        // Verifica si el producto ya está en el carrito
        const productIndex = cart.findIndex(item => item.id === product.id);
        
        if (productIndex > -1) {
            // Incrementa la cantidad
            cart[productIndex].item += 1;
            console.log(`Incrementing item for ${product.name}, new quantity: ${cart[productIndex].item}`);
        } else {
            // Agrega nuevo producto al carrito
            product.item = 1; 
            cart.push(product);
            console.log(`Adding new product to cart: ${product.name}`);
        }

        // Guarda el carrito actualizado
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Updated cart after adding:', cart);

        // Actualiza la interfaz de usuario
        setProducts('cart'); 

        // Alerta al usuario
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
        console.log("Cart is empty, showing empty cart image.");
    } else {
        data.forEach((product, index) => {
            element.innerHTML += createSmallCards(product, index);
            console.log(`Added product to DOM: ${product.name}`); 
        });
    }

    // Actualiza el total de la factura
    updateBill();
    setupEvents('cart'); 
};

const updateBill = () => {
    const products = JSON.parse(localStorage.getItem('cart')) || [];

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

    // Retrieve products from localStorage
    let products = JSON.parse(localStorage.getItem(name)) || [];
    

    counts.forEach((countElement, i) => {
        let currentProduct = products[i];
        let cost = parseFloat(price[i].getAttribute('data-price')) || 0;
        let itemCount = parseInt(countElement.innerHTML);  // Ensure the value is an integer

        // Decrement button
        counterMinus[i].addEventListener('click', () => {
            if (itemCount > 1) {
                itemCount--;
                countElement.innerHTML = itemCount;

                // Update the price based on the new quantity
                price[i].innerHTML = `$${(itemCount * cost).toFixed(2)}`;

                // Update the product's quantity in localStorage
                products[i].item = itemCount;
                localStorage.setItem(name, JSON.stringify(products));

                // Recalculate the total bill
                updateBill();
            }
        });

        // Increment button
        counterPlus[i].addEventListener('click', () => {
            if (itemCount < 9) {
                itemCount++;
                countElement.innerHTML = itemCount;

                // Update the price in the DOM
                price[i].innerHTML = `$${(itemCount * cost).toFixed(2)}`;

                // Update the product's quantity in localStorage
                products[i].item = itemCount;
                localStorage.setItem(name, JSON.stringify(products));

                // Recalculate the total bill
                updateBill();
            }
        });
    });

    // Handle delete product buttons
    deleteBtn.forEach((item, i) => {
        item.addEventListener('click', () => {
            // Remove the product from localStorage and the DOM
            products.splice(i, 1); // Remove the product at index `i`
            localStorage.setItem(name, JSON.stringify(products));

            // Remove the product element from the DOM
            const productElement = deleteBtn[i].closest('.sm-product');
            if (productElement) {
                productElement.remove();
            }

            // Recalculate the total bill after removing the product
            updateBill();
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    setProducts('cart'); 
    setupEvents('cart'); 
});