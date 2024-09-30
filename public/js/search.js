const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');

searchBtn.addEventListener('click', () => {
    if (searchBox.value.length) {
        location.href = `/pages/search.html?q=${encodeURIComponent(searchBox.value)}`;
    }
});