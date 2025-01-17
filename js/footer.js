const createFooter = () => {
    let footer = document.querySelector('footer');

    const isGitHubPages = window.location.href.includes('github.io');
    const basePath = isGitHubPages ? '/aagustinngomez-Full-Stack-Project-Wodking/' : '/';

    footer.innerHTML = `
    <div class="footer-content">
        <a href="${basePath}">
            <img src="${basePath}public/img/wodking1.png" class="logo" alt="Wodking Logo">
        </a>
        <div class="footer-ul-container">
            <ul class="category">
                <li class="category-title">men</li>
                <li><a href="#" class="footer-link">t-shirts</a></li>
                <li><a href="#" class="footer-link">sweatshirts</a></li>
                <li><a href="#" class="footer-link">shirts</a></li>
                <li><a href="#" class="footer-link">jeans</a></li>
                <li><a href="#" class="footer-link">trousers</a></li>
            </ul>
            <ul class="category">
                <li class="category-title">women</li>
                <li><a href="#" class="footer-link">t-shirts</a></li>
                <li><a href="#" class="footer-link">sweatshirts</a></li>
                <li><a href="#" class="footer-link">shirts</a></li>
                <li><a href="#" class="footer-link">jeans</a></li>
                <li><a href="#" class="footer-link">trousers</a></li>
            </ul>
        </div>
    </div>
    <p class="info">agustinmatiasgomez1998@gmail.com</p>
    <p class="info">telephone - +54 9 341 371-3516</p>
    <div class="footer-social-container">
        <div>
            <a href="#" class="social-link">terms & services</a>
            <a href="#" class="social-link">privacy page</a>
        </div>
        <div>
            <a href="#" class="social-link">LinkedIn</a>
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Twitter</a>
        </div>
    </div>
    <p class="footer-credit">Agustin Matias Gomez - Developer Full Stack</p>
    `;
}

createFooter();