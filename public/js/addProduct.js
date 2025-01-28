let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');

// Check if the user is logged in
window.onload = () => {
    if (user) {
        if (!compareToken(user.authToken, user.email)) {
            location.replace('../login.html');
        }
    } else {
        location.replace('../login.html');
    }
}

// Price handling
const actualPrice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount');
const sellingPrice = document.querySelector('#sell-price');

discountPercentage.addEventListener('input', () => {
    if (discountPercentage.value > 100) {
        discountPercentage.value = 90;
    } else {
        let discount = actualPrice.value * discountPercentage.value / 100;
        sellingPrice.value = actualPrice.value - discount;
    }
});

sellingPrice.addEventListener('input', () => {
    let discount = (sellingPrice.value / actualPrice.value) * 100;
    discountPercentage.value = discount;
});

// Image upload handling
let uploadImages = document.querySelectorAll('.fileupload');
let imagePaths = []; // Stores the paths of uploaded images

uploadImages.forEach((fileupload, index) => {
    fileupload.addEventListener('change', () => {
        const file = fileupload.files[0];
        let imageUrl;

        if (file.type.includes('image')) {
            fetch('/s3url').then(res => res.json())
            .then(url => {
                fetch(url, {
                    method: 'PUT',
                    headers: new Headers({'Content-Type': 'multipart/form-data'}),
                    body: file
                }).then(res => {
                    imageUrl = url.split("?")[0];
                    imagePaths[index] = imageUrl;
                    let label = document.querySelector(`label[for=${fileupload.id}]`);
                    label.style.backgroundImage = `url(${imageUrl})`;
                    let productImage = document.querySelector('.product-image');
                    productImage.style.backgroundImage = `url(${imageUrl})`;
                });
            });
        } else {
            showAlert('Upload image only');
        }
    });
});

// Form handling
const productName = document.querySelector('#product-name');
const shortLine = document.querySelector('#short-des');
const des = document.querySelector('#des');
let sizes = []; // Stores sizes
const stock = document.querySelector('#stock');
const tags = document.querySelector('#tags');
const tac = document.querySelector('#tac');

// Buttons
const addProductBtn = document.querySelector('#add-btn');
const saveDraft = document.querySelector('#save-btn');

// Function to store sizes
const storeSizes = () => {
    sizes = [];
    let sizeCheckBox = document.querySelectorAll('.size-checkbox');
    sizeCheckBox.forEach(item => {
        if (item.checked) {
            sizes.push(item.value);
        }
    });
};

// Form validation function
const validateForm = () => {
    if (!productName.value.length) {
        return showAlert('Enter product name');
    } else if (shortLine.value.length > 100 || shortLine.value.length < 10) {
        return showAlert('Short description must be between 10 to 100 letters long');
    } else if (!des.value.length) {
        return showAlert('Enter a detailed description about the product');
    } else if (!imagePaths.length) {
        return showAlert('Upload at least one product image');
    } else if (!sizes.length) {
        return showAlert('Select at least one size');
    } else if (!actualPrice.value.length || !discountPercentage.value.length || !sellingPrice.value.length) {
        return showAlert('You must add pricing');
    } else if (stock.value < 20) {
        return showAlert('You should have at least 20 items in stock');
    } else if (!tags.value.length) {
        return showAlert('Enter a few tags to help rank your product in search');
    } else if (!tac.checked) {
        return showAlert('You must agree to our terms and conditions');
    }
    return true;
};

// Function to get product data
const productData = () => {
    let tagArr = tags.value.split(',').map(item => item.trim());
    return {
        name: productName.value,
        shortDes: shortLine.value,
        des: des.value,
        images: imagePaths,
        sizes: sizes,
        actualPrice: actualPrice.value,
        discount: discountPercentage.value,
        sellPrice: sellingPrice.value,
        stock: stock.value,
        tags: tagArr,
        tac: tac.checked,
        email: user.email
    };
};

addProductBtn.addEventListener('click', () => {
    storeSizes();
    if (validateForm()) {
        loader.style.display = 'block';
        let data = productData();
        if (productId) {
            data.id = productId;
        }
        sendData('/add-product', data);
    }
});

// Save draft button
saveDraft.addEventListener('click', () => {
    storeSizes();
    if (!productName.value.length) {
        showAlert('Enter product name');
    } else {
        let data = productData();
        data.draft = true;
        if (productId) {
            data.id = productId;
        }
        sendData('/add-product', data);
    }
});

// Handling existing product data
const setFormsData = (data) => {
    productName.value = data.name;
    shortLine.value = data.shortDes;
    des.value = data.des;
    actualPrice.value = data.actualPrice;
    discountPercentage.value = data.discount;
    sellingPrice.value = data.sellPrice;
    stock.value = data.stock;
    tags.value = data.tags.join(', ');

    imagePaths = data.images;
    imagePaths.forEach((url, i) => {
        let label = document.querySelector(`label[for=${uploadImages[i].id}]`);
        label.style.backgroundImage = `url(${url})`;
        let productImage = document.querySelector('.product-image');
        productImage.style.backgroundImage = `url(${url})`;
    });

    sizes = data.sizes;
    let sizeCheckbox = document.querySelectorAll('.size-checkbox');
    sizeCheckbox.forEach(item => {
        item.checked = sizes.includes(item.value);
    });
};

const fetchProductForEdit = () => {
    fetch(`/get-products?id=${productId}`, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json' })
    })
    .then((res) => res.json())
    .then(data => {
        setFormsData(data); 
    })
    .catch(err => {
        console.error('Error fetching product data for edit:', err);
    });
};


let productId = null;
if (location.pathname !== '../add-product.html') {
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}