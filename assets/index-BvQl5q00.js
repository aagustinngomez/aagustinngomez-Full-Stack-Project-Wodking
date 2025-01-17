import{initializeApp as m}from"https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";import{getFirestore as g,getDocs as h,collection as f}from"https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function c(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(o){if(o.ep)return;o.ep=!0;const e=c(o);fetch(o.href,e)}})();(()=>{const t=window.location.href.includes("github.io")?"/aagustinngomez-Full-Stack-Project-Wodking/":"/",c=()=>{const e=document.querySelector(".navbar");e&&(e.innerHTML=`
            <div class="nav">
                <a href="${t}">
                    <img src="${t}public/img/WODKING.png" class="brand-logo" alt="Brand logo">
                </a>
                <div class="nav-items">
                    <div class="search">
                        <input type="text" class="search-box" placeholder="Search brand, product">
                        <button class="search-btn">Search</button>
                    </div>
                    <a>
                        <img src="${t}public/img/user.png" id="user-img" alt="User icon">
                        <div class="login-logout-popup hide">
                            <p class="account-info">Log in as, name</p>
                            <button class="btn" id="user-btn">Log out</button>
                        </div>
                    </a>
                    <a href="${t}public/pages/cart.html"><img src="${t}public/img/cart.png" alt="Cart icon"></a>
                </div>
            </div>
            <ul class="links-container">
                <li class="link-item"><a href="${t}" class="link">Home</a></li>
                <li class="link-item"><a href="${t}public/pages/shop.html" class="link">Shop</a></li>
                <li class="link-item"><a href="${t}public/pages/aboutuss.html" class="link">About Us</a></li>
                <li class="link-item"><a href="${t}public/pages/contact.html" class="link">Contact</a></li>
            </ul>
        `)},n=()=>{const e=document.querySelector("#user-img"),r=document.querySelector(".login-logout-popup"),a=document.querySelector(".account-info"),i=document.querySelector("#user-btn");if(!e||!r||!a||!i)return;e.addEventListener("click",()=>{r.classList.toggle("hide")});let u=JSON.parse(sessionStorage.user||null);u?(a.innerHTML=`Log in as, ${u.name}`,i.innerHTML="Log out",i.addEventListener("click",()=>{sessionStorage.clear(),location.reload()})):(a.innerHTML="Log in to place an order",i.innerHTML="Log in",i.addEventListener("click",()=>{location.href=`${t}public/pages/login.html`}))},o=()=>{const e=document.querySelector(".search-btn"),r=document.querySelector(".search-box");if(!e||!r)return;e.addEventListener("click",()=>{if(r.value.length){const l=encodeURIComponent(r.value);location.href=`${t}public/pages/search.html?q=${l}`}});const a=document.querySelector("#search-key");if(!a)return;const u=new URLSearchParams(window.location.search).get("q");u?(a.textContent=`Search results for "${u}"`,getProducts(u).then(l=>{createProductCards(l,".card-container")}).catch(l=>{console.error("Error fetching products:",l)})):a.textContent="No search key provided"};document.addEventListener("DOMContentLoaded",()=>{c(),n(),o()})})();const b=()=>{let s=document.querySelector("footer");const c=window.location.href.includes("github.io")?"/aagustinngomez-Full-Stack-Project-Wodking/":"/";s.innerHTML=`
    <div class="footer-content">
        <a href="${c}">
            <img src="${c}public/img/wodking1.png" class="logo" alt="Wodking Logo">
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
    `};b();const v=s=>{const t=s.images[0]||"../public/img/default.png",c=s.sellPrice||0,n=s.item||1;return`
    <div class="sm-product">
        <img src="${t}" class="sm-product-img" alt="${s.name}">
        <div class="sm-text">
            <p class="sm-product-name">${s.name}</p>
            <p class="sm-des">${s.shortDes}</p>
        </div>
        <div class="item-counter">
            <button class="counter-btn decrement">-</button>
            <p class="item-count">${n}</p>
            <button class="counter-btn increment">+</button>
        </div>
        <p class="sm-price" data-price="${c}">$${(c*n).toFixed(2)}</p>
        <button class="sm-delete-btn"><img src="/img/close.png" alt="Delete"></button>
    </div>
    `},y=s=>{const t=document.querySelector(`.${s}`);if(!t){console.error(`Element with class "${s}" not found.`);return}let c=JSON.parse(localStorage.getItem(s));t.innerHTML="",!c||c.length===0?(t.innerHTML='<img src="../img/empty-cart.png" class="empty-img" alt="Empty cart">',console.log("Cart is empty, showing empty cart image.")):c.forEach((n,o)=>{t.innerHTML+=v(n),console.log(`Added product to DOM: ${n.name}`)}),d(),p("cart")},d=()=>{let t=(JSON.parse(localStorage.getItem("cart"))||[]).reduce((c,n)=>{const o=parseFloat(n.sellPrice)||0,e=parseInt(n.item,10)||0;return console.log(`Product: ${n.name}, Price: ${o}, Quantity: ${e}`),c+o*e},0);document.querySelector(".bill").textContent=`$${t.toFixed(2)}`},p=s=>{const t=document.querySelectorAll(`.${s} .decrement`),c=document.querySelectorAll(`.${s} .increment`),n=document.querySelectorAll(`.${s} .item-count`),o=document.querySelectorAll(`.${s} .sm-price`),e=document.querySelectorAll(`.${s} .sm-delete-btn`);let r=JSON.parse(localStorage.getItem(s))||[];n.forEach((a,i)=>{r[i];let u=parseFloat(o[i].getAttribute("data-price"))||0,l=parseInt(a.innerHTML);t[i].addEventListener("click",()=>{l>1&&(l--,a.innerHTML=l,o[i].innerHTML=`$${(l*u).toFixed(2)}`,r[i].item=l,localStorage.setItem(s,JSON.stringify(r)),d())}),c[i].addEventListener("click",()=>{l<9&&(l++,a.innerHTML=l,o[i].innerHTML=`$${(l*u).toFixed(2)}`,r[i].item=l,localStorage.setItem(s,JSON.stringify(r)),d())})}),e.forEach((a,i)=>{a.addEventListener("click",()=>{r.splice(i,1),localStorage.setItem(s,JSON.stringify(r));const u=e[i].closest(".sm-product");u&&u.remove(),d()})})};document.addEventListener("DOMContentLoaded",()=>{y("cart"),p("cart")});const S={apiKey:"TU_API_KEY",authDomain:"TU_AUTH_DOMAIN",projectId:"TU_PROJECT_ID",storageBucket:"TU_STORAGE_BUCKET",messagingSenderId:"TU_MESSAGING_SENDER_ID",appId:"TU_APP_ID"},$=m(S),L=g($),k=()=>{const s=[...document.querySelectorAll(".product-container")],t=[...document.querySelectorAll(".nxt-btn")],c=[...document.querySelectorAll(".pre-btn")];s.forEach((n,o)=>{let r=n.getBoundingClientRect().width;t[o].addEventListener("click",()=>{n.scrollLeft+=r}),c[o].addEventListener("click",()=>{n.scrollLeft-=r})})},P=async()=>{try{const s=await h(f(L,"products")),t=[];s.forEach(c=>{t.push(c.data())}),console.log("Productos obtenidos desde Firebase:",t),E(t,"#men-tshirt-products","Men")}catch(s){console.error("Error al obtener productos:",s)}},E=(s,t,c)=>{const n=document.querySelector(t);if(!n){console.error(`Contenedor no encontrado: ${t}`);return}const o=s.filter(e=>{var r;return((r=e.images)==null?void 0:r.length)>0});if(o.length===0){console.warn("No hay productos con imágenes disponibles.");return}n.innerHTML=`
        <section class="product">
            <h2 class="product-category">${c}</h2>
            <button class="pre-btn"><img src="public/img/arrow.png" alt="Prev"></button>
            <button class="nxt-btn"><img src="public/img/arrow.png" alt="Next"></button>
            <div class="product-container">
                ${o.map(e=>`
                    <a href="public/pages/product.html?id=${e.id}" class="product-card">
                        <div class="product-image">
                            <img src="${e.images[0]}" class="product-thumb" alt="${e.name}">
                            <button class="card-btn" onclick="addToCart('${e.id}')">add to cart</button>
                        </div>
                        <div class="product-info">
                            <h2 class="product-brand">${e.name}</h2>
                            <p class="product-short-des">${e.shortDes||"No description"}</p>
                            <span class="price">$${e.sellPrice||0}</span>
                            <span class="actual-price">$${e.actualPrice||0}</span>
                        </div>
                    </a>
                `).join("")}
            </div>
        </section>
    `,k()};P();
