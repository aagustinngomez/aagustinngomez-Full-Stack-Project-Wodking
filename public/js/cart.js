const createSmallCards = (data) => {
    return `
    <div class="sm-product">
        <img src="${data.image}" class="sm-product-img" alt="">
        <div class="sm-text">
            <p class="sm-product-name">${data.name}</p>
            <p class="sm-des">${data.shortDes}</p>
        </div>
        <div class="item-counter">
            <button class="counter-btn decrement">-</button>
            <p class="item-count">${data.item}</p>
            <button class="counter-btn increment">+</button>
        </div>
        <p class="sm-price" data-price="${data.sellPrice}">$${data.sellPrice * data.item}</p>
        <button class="sm-delete-btn"><img src="../img/close.png" alt=""></button>
    </div>
    `;
}

const addToCart = (productId) => {
    console.log('ID del producto:', productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    fetch(`/api/get-products?id=${productId}`, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json' })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error al obtener el producto');
        }
        return res.json();
    })
    .then(product => {
        const productIndex = cart.findIndex(item => item.id === product.id);

        if (productIndex > -1) {
            cart[productIndex].item += 1;
        } else {
            product.item = 1;
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        setProducts('cart'); 
        alert(`${product.name} ha sido agregado al carrito.`);
    })
    .catch(err => console.error('Fetch error:', err));
};

const setProducts = (name) => {
    const element = document.querySelector(`.${name}`);

    if (!element) {
        console.error(`Elemento con la clase "${name}" no encontrado.`);
        return;
    }

    let data = JSON.parse(localStorage.getItem(name));

    element.innerHTML = '';

    if (!data || data.length === 0) {
        element.innerHTML = `<img src="../img/empty-cart.png" class="empty-img" alt="Carrito vacío">`;
    } else {
        let totalBill = 0;

        data.forEach(product => {
            element.innerHTML += createSmallCards(product);
            totalBill += Number(product.sellPrice * product.item);
        });

        updateBill(totalBill);
    }

    setupEvents(name);
};

const updateBill = (totalBill) => {
    document.querySelector('.total-bill').textContent = `Total: $${totalBill.toFixed(2)}`;
};

const setupEvents = (name) => {
    const counterMinus = document.querySelectorAll(`.${name} .decrement`);
    const counterPlus = document.querySelectorAll(`.${name} .increment`);
    const counts = document.querySelectorAll(`.${name} .item-count`);
    const price = document.querySelectorAll(`.${name} .sm-price`);
    const deleteBtn = document.querySelectorAll(`.${name} .sm-delete-btn`);

    let product = JSON.parse(localStorage.getItem(name));

    counts.forEach((item, i) => {
        let cost = Number(price[i].getAttribute('data-price'));

        counterMinus[i].addEventListener('click', () => {
            if (item.innerHTML > 1) {
                item.innerHTML--;
                totalBill -= cost;
                price[i].innerHTML = `$${item.innerHTML * cost}`;
                if (name === 'cart') {
                    updateBill(totalBill);
                }
                product[i].item = item.innerHTML;
                localStorage.setItem(name, JSON.stringify(product));
            }
        });

        counterPlus[i].addEventListener('click', () => {
            if (item.innerHTML < 9) {
                item.innerHTML++;
                totalBill += cost;
                price[i].innerHTML = `$${item.innerHTML * cost}`;
                if (name === 'cart') {
                    updateBill(totalBill);
                }
                product[i].item = item.innerHTML;
                localStorage.setItem(name, JSON.stringify(product));
            }
        });
    });

    deleteBtn.forEach((item, i) => {
        item.addEventListener('click', () => {
            product = product.filter((data, index) => index !== i);
            localStorage.setItem(name, JSON.stringify(product));
            
            const productElement = deleteBtn[i].closest('.sm-product');
            productElement.remove();

            totalBill = product.reduce((sum, prod) => sum + (prod.sellPrice * prod.item), 0);
            updateBill(totalBill);
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    setProducts('cart');
    setProducts('wishlist');
});