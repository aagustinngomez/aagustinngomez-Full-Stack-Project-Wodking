const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');

const isGitHubPages = window.location.href.includes('github.io');
const basePath = isGitHubPages ? '/aagustinngomez-Full-Stack-Project-Wodking' : '';

searchBtn.addEventListener('click', () => {
    if (searchBox.value.length) {
        location.href = `${basePath}/pages/search.html?q=${encodeURIComponent(searchBox.value)}`;
    }
});