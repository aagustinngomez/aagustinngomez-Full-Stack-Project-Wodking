const createProduct = (data) => {
    const productContainer = document.querySelector('.product-container');
    
    if (!productContainer) {
        console.error('Product container not found.');
        return;
    }

    productContainer.innerHTML += `
    <div class="product-card">
        <div class="product-image">
            ${data.draft ? `<span class="tag">Draft</span>` : ''}            
            <img src="${data.images && data.images[0] ? data.images[0] : '../img/no-image.png'}" class="product-thumb" alt="">
            <button class="card-action-btn edit-btn" onclick="location.href = '../add-product/${data.id}'">
                <img src="../img/edit.png" alt="Edit">
            </button>
            <button class="card-action-btn open-btn" onclick="location.href = '../products/${data.id}'">
                <img src="../img/open.png" alt="Open">
            </button>
            <button class="card-action-btn delete-popup-btn" onclick="openDeletePopup('${data.id}')">
                <img src="../img/delete.png" alt="Delete">
            </button>
        </div>
        <div class="product-info">
            <h2 class="product-brand">${data.name || 'Name not available'}</h2>
            <p class="product-short-des">${data.shortDes || 'Description not available'}</p>
            <span class="price">$${data.sellPrice || 0}</span> 
            <span class="actual-price">$${data.actualPrice || 0}</span>
            <button class="add-to-cart-btn" onclick="addToCart('${data.id}')">Add to cart</button>
        </div>
    </div>
    `;
};

// Function to open the delete confirmation popup
const openDeletePopup = (id) => {
    const deleteAlert = document.querySelector('.delete-alert');
    if (deleteAlert) {
        deleteAlert.style.display = 'flex';

        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                deleteAlert.style.display = 'none';
            });
        } else {
            console.error('Close button not found.');
        }

        const deleteBtn = document.querySelector('.delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                deleteItem(id);
            });
        } else {
            console.error('Delete button not found.');
        }
    } else {
        console.error('Delete popup not found.');
    }
}

// Function to delete a product
const deleteItem = (id) => {
    fetch('/delete-product', {
        method: 'POST', // Changed to uppercase for POST method
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: id})
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) { // Ensure that the backend returns an object with { success: true }
            location.reload();
        } else {
            showAlert('An error occurred while deleting the product. Please try again.');
        }
    })
    .catch(err => {
        console.error('Error:', err);
        showAlert('An error occurred. Check the console for more details.');
    });
};

// Function to display alert messages
const showAlert = (message) => {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => {
        alertBox.remove();
    }, 3000); 
}