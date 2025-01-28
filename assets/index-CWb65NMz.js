import{initializeApp as a}from"https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";import{getFirestore as l,getDocs as d,collection as u}from"https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const c of e.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();const p={apiKey:"TU_API_KEY",authDomain:"TU_AUTH_DOMAIN",projectId:"TU_PROJECT_ID",storageBucket:"TU_STORAGE_BUCKET",messagingSenderId:"TU_MESSAGING_SENDER_ID",appId:"TU_APP_ID"},f=a(p),i=l(f);console.log("🔥 Firestore DB:",i);const m=()=>{const r=[...document.querySelectorAll(".product-container")],o=[...document.querySelectorAll(".nxt-btn")],n=[...document.querySelectorAll(".pre-btn")];r.forEach((s,t)=>{let c=s.getBoundingClientRect().width;o[t].addEventListener("click",()=>{s.scrollLeft+=c}),n[t].addEventListener("click",()=>{s.scrollLeft-=c})})},g=async()=>{try{console.log("🔥 Intentando obtener productos desde Firestore...");const r=await d(u(i,"agustin","products"));r.empty&&console.warn("⚠️ No hay productos en Firestore.");const o=[];r.forEach(n=>{console.log("✅ Producto encontrado:",n.id,n.data()),o.push(n.data())}),console.log("📦 Productos obtenidos:",o),h(o,"#men-tshirt-products","Men")}catch(r){console.error("❌ Error al obtener productos:",r)}},h=(r,o,n)=>{const s=document.querySelector(o);if(!s){console.error(`Contenedor no encontrado: ${o}`);return}const t=r.filter(e=>{var c;return((c=e.images)==null?void 0:c.length)>0});if(t.length===0){console.warn("No hay productos con imágenes disponibles.");return}s.innerHTML=`
        <section class="product">
            <h2 class="product-category">${n}</h2>
            <button class="pre-btn"><img src="public/img/arrow.png" alt="Prev"></button>
            <button class="nxt-btn"><img src="public/img/arrow.png" alt="Next"></button>
            <div class="product-container">
                ${t.map(e=>`
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
    `,m()};g();
