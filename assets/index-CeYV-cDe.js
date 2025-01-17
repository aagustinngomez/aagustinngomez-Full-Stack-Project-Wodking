(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))a(h);new MutationObserver(h=>{for(const f of h)if(f.type==="childList")for(const E of f.addedNodes)E.tagName==="LINK"&&E.rel==="modulepreload"&&a(E)}).observe(document,{childList:!0,subtree:!0});function r(h){const f={};return h.integrity&&(f.integrity=h.integrity),h.referrerPolicy&&(f.referrerPolicy=h.referrerPolicy),h.crossOrigin==="use-credentials"?f.credentials="include":h.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function a(h){if(h.ep)return;h.ep=!0;const f=r(h);fetch(h.href,f)}})();(()=>{const n=window.location.href.includes("github.io")?"/aagustinngomez-Full-Stack-Project-Wodking/":"/",r=()=>{const f=document.querySelector(".navbar");f&&(f.innerHTML=`
            <div class="nav">
                <a href="${n}">
                    <img src="${n}public/img/WODKING.png" class="brand-logo" alt="Brand logo">
                </a>
                <div class="nav-items">
                    <div class="search">
                        <input type="text" class="search-box" placeholder="Search brand, product">
                        <button class="search-btn">Search</button>
                    </div>
                    <a>
                        <img src="${n}public/img/user.png" id="user-img" alt="User icon">
                        <div class="login-logout-popup hide">
                            <p class="account-info">Log in as, name</p>
                            <button class="btn" id="user-btn">Log out</button>
                        </div>
                    </a>
                    <a href="${n}public/pages/cart.html"><img src="${n}public/img/cart.png" alt="Cart icon"></a>
                </div>
            </div>
            <ul class="links-container">
                <li class="link-item"><a href="${n}" class="link">Home</a></li>
                <li class="link-item"><a href="${n}public/pages/shop.html" class="link">Shop</a></li>
                <li class="link-item"><a href="${n}public/pages/aboutuss.html" class="link">About Us</a></li>
                <li class="link-item"><a href="${n}public/pages/contact.html" class="link">Contact</a></li>
            </ul>
        `)},a=()=>{const f=document.querySelector("#user-img"),E=document.querySelector(".login-logout-popup"),_=document.querySelector(".account-info"),w=document.querySelector("#user-btn");if(!f||!E||!_||!w)return;f.addEventListener("click",()=>{E.classList.toggle("hide")});let I=JSON.parse(sessionStorage.user||null);I?(_.innerHTML=`Log in as, ${I.name}`,w.innerHTML="Log out",w.addEventListener("click",()=>{sessionStorage.clear(),location.reload()})):(_.innerHTML="Log in to place an order",w.innerHTML="Log in",w.addEventListener("click",()=>{location.href=`${n}public/pages/login.html`}))},h=()=>{const f=document.querySelector(".search-btn"),E=document.querySelector(".search-box");if(!f||!E)return;f.addEventListener("click",()=>{if(E.value.length){const b=encodeURIComponent(E.value);location.href=`${n}public/pages/search.html?q=${b}`}});const _=document.querySelector("#search-key");if(!_)return;const I=new URLSearchParams(window.location.search).get("q");I?(_.textContent=`Search results for "${I}"`,getProducts(I).then(b=>{createProductCards(b,".card-container")}).catch(b=>{console.error("Error fetching products:",b)})):_.textContent="No search key provided"};document.addEventListener("DOMContentLoaded",()=>{r(),a(),h()})})();const Es=()=>{let s=document.querySelector("footer");const r=window.location.href.includes("github.io")?"/aagustinngomez-Full-Stack-Project-Wodking/":"/";s.innerHTML=`
    <div class="footer-content">
        <a href="${r}">
            <img src="${r}public/img/wodking1.png" class="logo" alt="Wodking Logo">
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
    `};Es();const _s=s=>{const n=s.images[0]||"../public/img/default.png",r=s.sellPrice||0,a=s.item||1;return`
    <div class="sm-product">
        <img src="${n}" class="sm-product-img" alt="${s.name}">
        <div class="sm-text">
            <p class="sm-product-name">${s.name}</p>
            <p class="sm-des">${s.shortDes}</p>
        </div>
        <div class="item-counter">
            <button class="counter-btn decrement">-</button>
            <p class="item-count">${a}</p>
            <button class="counter-btn increment">+</button>
        </div>
        <p class="sm-price" data-price="${r}">$${(r*a).toFixed(2)}</p>
        <button class="sm-delete-btn"><img src="/img/close.png" alt="Delete"></button>
    </div>
    `},ws=s=>{const n=document.querySelector(`.${s}`);if(!n){console.error(`Element with class "${s}" not found.`);return}let r=JSON.parse(localStorage.getItem(s));n.innerHTML="",!r||r.length===0?(n.innerHTML='<img src="../img/empty-cart.png" class="empty-img" alt="Empty cart">',console.log("Cart is empty, showing empty cart image.")):r.forEach((a,h)=>{n.innerHTML+=_s(a),console.log(`Added product to DOM: ${a.name}`)}),le(),Ei("cart")},le=()=>{let n=(JSON.parse(localStorage.getItem("cart"))||[]).reduce((r,a)=>{const h=parseFloat(a.sellPrice)||0,f=parseInt(a.item,10)||0;return console.log(`Product: ${a.name}, Price: ${h}, Quantity: ${f}`),r+h*f},0);document.querySelector(".bill").textContent=`$${n.toFixed(2)}`},Ei=s=>{const n=document.querySelectorAll(`.${s} .decrement`),r=document.querySelectorAll(`.${s} .increment`),a=document.querySelectorAll(`.${s} .item-count`),h=document.querySelectorAll(`.${s} .sm-price`),f=document.querySelectorAll(`.${s} .sm-delete-btn`);let E=JSON.parse(localStorage.getItem(s))||[];a.forEach((_,w)=>{E[w];let I=parseFloat(h[w].getAttribute("data-price"))||0,b=parseInt(_.innerHTML);n[w].addEventListener("click",()=>{b>1&&(b--,_.innerHTML=b,h[w].innerHTML=`$${(b*I).toFixed(2)}`,E[w].item=b,localStorage.setItem(s,JSON.stringify(E)),le())}),r[w].addEventListener("click",()=>{b<9&&(b++,_.innerHTML=b,h[w].innerHTML=`$${(b*I).toFixed(2)}`,E[w].item=b,localStorage.setItem(s,JSON.stringify(E)),le())})}),f.forEach((_,w)=>{_.addEventListener("click",()=>{E.splice(w,1),localStorage.setItem(s,JSON.stringify(E));const I=f[w].closest(".sm-product");I&&I.remove(),le()})})};document.addEventListener("DOMContentLoaded",()=>{ws("cart"),Ei("cart")});var ni={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _i=function(s){const n=[];let r=0;for(let a=0;a<s.length;a++){let h=s.charCodeAt(a);h<128?n[r++]=h:h<2048?(n[r++]=h>>6|192,n[r++]=h&63|128):(h&64512)===55296&&a+1<s.length&&(s.charCodeAt(a+1)&64512)===56320?(h=65536+((h&1023)<<10)+(s.charCodeAt(++a)&1023),n[r++]=h>>18|240,n[r++]=h>>12&63|128,n[r++]=h>>6&63|128,n[r++]=h&63|128):(n[r++]=h>>12|224,n[r++]=h>>6&63|128,n[r++]=h&63|128)}return n},As=function(s){const n=[];let r=0,a=0;for(;r<s.length;){const h=s[r++];if(h<128)n[a++]=String.fromCharCode(h);else if(h>191&&h<224){const f=s[r++];n[a++]=String.fromCharCode((h&31)<<6|f&63)}else if(h>239&&h<365){const f=s[r++],E=s[r++],_=s[r++],w=((h&7)<<18|(f&63)<<12|(E&63)<<6|_&63)-65536;n[a++]=String.fromCharCode(55296+(w>>10)),n[a++]=String.fromCharCode(56320+(w&1023))}else{const f=s[r++],E=s[r++];n[a++]=String.fromCharCode((h&15)<<12|(f&63)<<6|E&63)}}return n.join("")},wi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(s,n){if(!Array.isArray(s))throw Error("encodeByteArray takes an array as a parameter");this.init_();const r=n?this.byteToCharMapWebSafe_:this.byteToCharMap_,a=[];for(let h=0;h<s.length;h+=3){const f=s[h],E=h+1<s.length,_=E?s[h+1]:0,w=h+2<s.length,I=w?s[h+2]:0,b=f>>2,G=(f&3)<<4|_>>4;let L=(_&15)<<2|I>>6,q=I&63;w||(q=64,E||(L=64)),a.push(r[b],r[G],r[L],r[q])}return a.join("")},encodeString(s,n){return this.HAS_NATIVE_SUPPORT&&!n?btoa(s):this.encodeByteArray(_i(s),n)},decodeString(s,n){return this.HAS_NATIVE_SUPPORT&&!n?atob(s):As(this.decodeStringToByteArray(s,n))},decodeStringToByteArray(s,n){this.init_();const r=n?this.charToByteMapWebSafe_:this.charToByteMap_,a=[];for(let h=0;h<s.length;){const f=r[s.charAt(h++)],_=h<s.length?r[s.charAt(h)]:0;++h;const I=h<s.length?r[s.charAt(h)]:64;++h;const G=h<s.length?r[s.charAt(h)]:64;if(++h,f==null||_==null||I==null||G==null)throw new Is;const L=f<<2|_>>4;if(a.push(L),I!==64){const q=_<<4&240|I>>2;if(a.push(q),G!==64){const C=I<<6&192|G;a.push(C)}}}return a},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let s=0;s<this.ENCODED_VALS.length;s++)this.byteToCharMap_[s]=this.ENCODED_VALS.charAt(s),this.charToByteMap_[this.byteToCharMap_[s]]=s,this.byteToCharMapWebSafe_[s]=this.ENCODED_VALS_WEBSAFE.charAt(s),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[s]]=s,s>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(s)]=s,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(s)]=s)}}};class Is extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ts=function(s){const n=_i(s);return wi.encodeByteArray(n,!0)},ce=function(s){return Ts(s).replace(/\./g,"")},bs=function(s){try{return wi.decodeString(s,!0)}catch(n){console.error("base64Decode failed: ",n)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ss(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cs=()=>Ss().__FIREBASE_DEFAULTS__,Ds=()=>{if(typeof process>"u"||typeof ni>"u")return;const s=ni.__FIREBASE_DEFAULTS__;if(s)return JSON.parse(s)},Ps=()=>{if(typeof document>"u")return;let s;try{s=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const n=s&&bs(s[1]);return n&&JSON.parse(n)},Ai=()=>{try{return Cs()||Ds()||Ps()}catch(s){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${s}`);return}},Rs=s=>{var n,r;return(r=(n=Ai())===null||n===void 0?void 0:n.emulatorHosts)===null||r===void 0?void 0:r[s]},Ls=s=>{const n=Rs(s);if(!n)return;const r=n.lastIndexOf(":");if(r<=0||r+1===n.length)throw new Error(`Invalid host ${n} with no separate hostname and port!`);const a=parseInt(n.substring(r+1),10);return n[0]==="["?[n.substring(1,r-1),a]:[n.substring(0,r),a]},Ii=()=>{var s;return(s=Ai())===null||s===void 0?void 0:s.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((n,r)=>{this.resolve=n,this.reject=r})}wrapCallback(n){return(r,a)=>{r?this.reject(r):this.resolve(a),typeof n=="function"&&(this.promise.catch(()=>{}),n.length===1?n(r):n(r,a))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(s,n){if(s.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const r={alg:"none",type:"JWT"},a=n||"demo-project",h=s.iat||0,f=s.sub||s.user_id;if(!f)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const E=Object.assign({iss:`https://securetoken.google.com/${a}`,aud:a,iat:h,exp:h+3600,auth_time:h,sub:f,user_id:f,firebase:{sign_in_provider:"custom",identities:{}}},s);return[ce(JSON.stringify(r)),ce(JSON.stringify(E)),""].join(".")}function Ns(){try{return typeof indexedDB=="object"}catch{return!1}}function Ms(){return new Promise((s,n)=>{try{let r=!0;const a="validate-browser-context-for-indexeddb-analytics-module",h=self.indexedDB.open(a);h.onsuccess=()=>{h.result.close(),r||self.indexedDB.deleteDatabase(a),s(!0)},h.onupgradeneeded=()=>{r=!1},h.onerror=()=>{var f;n(((f=h.error)===null||f===void 0?void 0:f.message)||"")}}catch(r){n(r)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xs="FirebaseError";class It extends Error{constructor(n,r,a){super(r),this.code=n,this.customData=a,this.name=xs,Object.setPrototypeOf(this,It.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ti.prototype.create)}}class Ti{constructor(n,r,a){this.service=n,this.serviceName=r,this.errors=a}create(n,...r){const a=r[0]||{},h=`${this.service}/${n}`,f=this.errors[n],E=f?Bs(f,a):"Error",_=`${this.serviceName}: ${E} (${h}).`;return new It(h,_,a)}}function Bs(s,n){return s.replace(js,(r,a)=>{const h=n[a];return h!=null?String(h):`<${a}?>`})}const js=/\{\$([^}]+)}/g;function Ge(s,n){if(s===n)return!0;const r=Object.keys(s),a=Object.keys(n);for(const h of r){if(!a.includes(h))return!1;const f=s[h],E=n[h];if(ii(f)&&ii(E)){if(!Ge(f,E))return!1}else if(f!==E)return!1}for(const h of a)if(!r.includes(h))return!1;return!0}function ii(s){return s!==null&&typeof s=="object"}class Ht{constructor(n,r,a){this.name=n,this.instanceFactory=r,this.type=a,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(n){return this.instantiationMode=n,this}setMultipleInstances(n){return this.multipleInstances=n,this}setServiceProps(n){return this.serviceProps=n,this}setInstanceCreatedCallback(n){return this.onInstanceCreated=n,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(n,r){this.name=n,this.container=r,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(n){const r=this.normalizeInstanceIdentifier(n);if(!this.instancesDeferred.has(r)){const a=new ks;if(this.instancesDeferred.set(r,a),this.isInitialized(r)||this.shouldAutoInitialize())try{const h=this.getOrInitializeService({instanceIdentifier:r});h&&a.resolve(h)}catch{}}return this.instancesDeferred.get(r).promise}getImmediate(n){var r;const a=this.normalizeInstanceIdentifier(n==null?void 0:n.identifier),h=(r=n==null?void 0:n.optional)!==null&&r!==void 0?r:!1;if(this.isInitialized(a)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:a})}catch(f){if(h)return null;throw f}else{if(h)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(n){if(n.name!==this.name)throw Error(`Mismatching Component ${n.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=n,!!this.shouldAutoInitialize()){if(Us(n))try{this.getOrInitializeService({instanceIdentifier:dt})}catch{}for(const[r,a]of this.instancesDeferred.entries()){const h=this.normalizeInstanceIdentifier(r);try{const f=this.getOrInitializeService({instanceIdentifier:h});a.resolve(f)}catch{}}}}clearInstance(n=dt){this.instancesDeferred.delete(n),this.instancesOptions.delete(n),this.instances.delete(n)}async delete(){const n=Array.from(this.instances.values());await Promise.all([...n.filter(r=>"INTERNAL"in r).map(r=>r.INTERNAL.delete()),...n.filter(r=>"_delete"in r).map(r=>r._delete())])}isComponentSet(){return this.component!=null}isInitialized(n=dt){return this.instances.has(n)}getOptions(n=dt){return this.instancesOptions.get(n)||{}}initialize(n={}){const{options:r={}}=n,a=this.normalizeInstanceIdentifier(n.instanceIdentifier);if(this.isInitialized(a))throw Error(`${this.name}(${a}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const h=this.getOrInitializeService({instanceIdentifier:a,options:r});for(const[f,E]of this.instancesDeferred.entries()){const _=this.normalizeInstanceIdentifier(f);a===_&&E.resolve(h)}return h}onInit(n,r){var a;const h=this.normalizeInstanceIdentifier(r),f=(a=this.onInitCallbacks.get(h))!==null&&a!==void 0?a:new Set;f.add(n),this.onInitCallbacks.set(h,f);const E=this.instances.get(h);return E&&n(E,h),()=>{f.delete(n)}}invokeOnInitCallbacks(n,r){const a=this.onInitCallbacks.get(r);if(a)for(const h of a)try{h(n,r)}catch{}}getOrInitializeService({instanceIdentifier:n,options:r={}}){let a=this.instances.get(n);if(!a&&this.component&&(a=this.component.instanceFactory(this.container,{instanceIdentifier:$s(n),options:r}),this.instances.set(n,a),this.instancesOptions.set(n,r),this.invokeOnInitCallbacks(a,n),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,n,a)}catch{}return a||null}normalizeInstanceIdentifier(n=dt){return this.component?this.component.multipleInstances?n:dt:n}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function $s(s){return s===dt?void 0:s}function Us(s){return s.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(n){this.name=n,this.providers=new Map}addComponent(n){const r=this.getProvider(n.name);if(r.isComponentSet())throw new Error(`Component ${n.name} has already been registered with ${this.name}`);r.setComponent(n)}addOrOverwriteComponent(n){this.getProvider(n.name).isComponentSet()&&this.providers.delete(n.name),this.addComponent(n)}getProvider(n){if(this.providers.has(n))return this.providers.get(n);const r=new Fs(n,this);return this.providers.set(n,r),r}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var D;(function(s){s[s.DEBUG=0]="DEBUG",s[s.VERBOSE=1]="VERBOSE",s[s.INFO=2]="INFO",s[s.WARN=3]="WARN",s[s.ERROR=4]="ERROR",s[s.SILENT=5]="SILENT"})(D||(D={}));const Vs={debug:D.DEBUG,verbose:D.VERBOSE,info:D.INFO,warn:D.WARN,error:D.ERROR,silent:D.SILENT},zs=D.INFO,Gs={[D.DEBUG]:"log",[D.VERBOSE]:"log",[D.INFO]:"info",[D.WARN]:"warn",[D.ERROR]:"error"},Ks=(s,n,...r)=>{if(n<s.logLevel)return;const a=new Date().toISOString(),h=Gs[n];if(h)console[h](`[${a}]  ${s.name}:`,...r);else throw new Error(`Attempted to log a message with an invalid logType (value: ${n})`)};class bi{constructor(n){this.name=n,this._logLevel=zs,this._logHandler=Ks,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(n){if(!(n in D))throw new TypeError(`Invalid value "${n}" assigned to \`logLevel\``);this._logLevel=n}setLogLevel(n){this._logLevel=typeof n=="string"?Vs[n]:n}get logHandler(){return this._logHandler}set logHandler(n){if(typeof n!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=n}get userLogHandler(){return this._userLogHandler}set userLogHandler(n){this._userLogHandler=n}debug(...n){this._userLogHandler&&this._userLogHandler(this,D.DEBUG,...n),this._logHandler(this,D.DEBUG,...n)}log(...n){this._userLogHandler&&this._userLogHandler(this,D.VERBOSE,...n),this._logHandler(this,D.VERBOSE,...n)}info(...n){this._userLogHandler&&this._userLogHandler(this,D.INFO,...n),this._logHandler(this,D.INFO,...n)}warn(...n){this._userLogHandler&&this._userLogHandler(this,D.WARN,...n),this._logHandler(this,D.WARN,...n)}error(...n){this._userLogHandler&&this._userLogHandler(this,D.ERROR,...n),this._logHandler(this,D.ERROR,...n)}}const qs=(s,n)=>n.some(r=>s instanceof r);let si,ri;function Ws(){return si||(si=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Xs(){return ri||(ri=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Si=new WeakMap,Ke=new WeakMap,Ci=new WeakMap,$e=new WeakMap,Qe=new WeakMap;function Js(s){const n=new Promise((r,a)=>{const h=()=>{s.removeEventListener("success",f),s.removeEventListener("error",E)},f=()=>{r(ht(s.result)),h()},E=()=>{a(s.error),h()};s.addEventListener("success",f),s.addEventListener("error",E)});return n.then(r=>{r instanceof IDBCursor&&Si.set(r,s)}).catch(()=>{}),Qe.set(n,s),n}function Ys(s){if(Ke.has(s))return;const n=new Promise((r,a)=>{const h=()=>{s.removeEventListener("complete",f),s.removeEventListener("error",E),s.removeEventListener("abort",E)},f=()=>{r(),h()},E=()=>{a(s.error||new DOMException("AbortError","AbortError")),h()};s.addEventListener("complete",f),s.addEventListener("error",E),s.addEventListener("abort",E)});Ke.set(s,n)}let qe={get(s,n,r){if(s instanceof IDBTransaction){if(n==="done")return Ke.get(s);if(n==="objectStoreNames")return s.objectStoreNames||Ci.get(s);if(n==="store")return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return ht(s[n])},set(s,n,r){return s[n]=r,!0},has(s,n){return s instanceof IDBTransaction&&(n==="done"||n==="store")?!0:n in s}};function Qs(s){qe=s(qe)}function Zs(s){return s===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(n,...r){const a=s.call(Ue(this),n,...r);return Ci.set(a,n.sort?n.sort():[n]),ht(a)}:Xs().includes(s)?function(...n){return s.apply(Ue(this),n),ht(Si.get(this))}:function(...n){return ht(s.apply(Ue(this),n))}}function tr(s){return typeof s=="function"?Zs(s):(s instanceof IDBTransaction&&Ys(s),qs(s,Ws())?new Proxy(s,qe):s)}function ht(s){if(s instanceof IDBRequest)return Js(s);if($e.has(s))return $e.get(s);const n=tr(s);return n!==s&&($e.set(s,n),Qe.set(n,s)),n}const Ue=s=>Qe.get(s);function er(s,n,{blocked:r,upgrade:a,blocking:h,terminated:f}={}){const E=indexedDB.open(s,n),_=ht(E);return a&&E.addEventListener("upgradeneeded",w=>{a(ht(E.result),w.oldVersion,w.newVersion,ht(E.transaction),w)}),r&&E.addEventListener("blocked",w=>r(w.oldVersion,w.newVersion,w)),_.then(w=>{f&&w.addEventListener("close",()=>f()),h&&w.addEventListener("versionchange",I=>h(I.oldVersion,I.newVersion,I))}).catch(()=>{}),_}const nr=["get","getKey","getAll","getAllKeys","count"],ir=["put","add","delete","clear"],He=new Map;function oi(s,n){if(!(s instanceof IDBDatabase&&!(n in s)&&typeof n=="string"))return;if(He.get(n))return He.get(n);const r=n.replace(/FromIndex$/,""),a=n!==r,h=ir.includes(r);if(!(r in(a?IDBIndex:IDBObjectStore).prototype)||!(h||nr.includes(r)))return;const f=async function(E,..._){const w=this.transaction(E,h?"readwrite":"readonly");let I=w.store;return a&&(I=I.index(_.shift())),(await Promise.all([I[r](..._),h&&w.done]))[0]};return He.set(n,f),f}Qs(s=>({...s,get:(n,r,a)=>oi(n,r)||s.get(n,r,a),has:(n,r)=>!!oi(n,r)||s.has(n,r)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{constructor(n){this.container=n}getPlatformInfoString(){return this.container.getProviders().map(r=>{if(rr(r)){const a=r.getImmediate();return`${a.library}/${a.version}`}else return null}).filter(r=>r).join(" ")}}function rr(s){const n=s.getComponent();return(n==null?void 0:n.type)==="VERSION"}const We="@firebase/app",ai="0.10.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nt=new bi("@firebase/app"),or="@firebase/app-compat",ar="@firebase/analytics-compat",hr="@firebase/analytics",lr="@firebase/app-check-compat",cr="@firebase/app-check",ur="@firebase/auth",fr="@firebase/auth-compat",dr="@firebase/database",pr="@firebase/database-compat",gr="@firebase/functions",mr="@firebase/functions-compat",yr="@firebase/installations",vr="@firebase/installations-compat",Er="@firebase/messaging",_r="@firebase/messaging-compat",wr="@firebase/performance",Ar="@firebase/performance-compat",Ir="@firebase/remote-config",Tr="@firebase/remote-config-compat",br="@firebase/storage",Sr="@firebase/storage-compat",Cr="@firebase/firestore",Dr="@firebase/vertexai-preview",Pr="@firebase/firestore-compat",Rr="firebase",Lr="10.13.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xe="[DEFAULT]",kr={[We]:"fire-core",[or]:"fire-core-compat",[hr]:"fire-analytics",[ar]:"fire-analytics-compat",[cr]:"fire-app-check",[lr]:"fire-app-check-compat",[ur]:"fire-auth",[fr]:"fire-auth-compat",[dr]:"fire-rtdb",[pr]:"fire-rtdb-compat",[gr]:"fire-fn",[mr]:"fire-fn-compat",[yr]:"fire-iid",[vr]:"fire-iid-compat",[Er]:"fire-fcm",[_r]:"fire-fcm-compat",[wr]:"fire-perf",[Ar]:"fire-perf-compat",[Ir]:"fire-rc",[Tr]:"fire-rc-compat",[br]:"fire-gcs",[Sr]:"fire-gcs-compat",[Cr]:"fire-fst",[Pr]:"fire-fst-compat",[Dr]:"fire-vertex","fire-js":"fire-js",[Rr]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ue=new Map,Or=new Map,Je=new Map;function hi(s,n){try{s.container.addComponent(n)}catch(r){nt.debug(`Component ${n.name} failed to register with FirebaseApp ${s.name}`,r)}}function fe(s){const n=s.name;if(Je.has(n))return nt.debug(`There were multiple attempts to register component ${n}.`),!1;Je.set(n,s);for(const r of ue.values())hi(r,s);for(const r of Or.values())hi(r,s);return!0}function Nr(s,n){const r=s.container.getProvider("heartbeat").getImmediate({optional:!0});return r&&r.triggerHeartbeat(),s.container.getProvider(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},lt=new Ti("app","Firebase",Mr);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(n,r,a){this._isDeleted=!1,this._options=Object.assign({},n),this._config=Object.assign({},r),this._name=r.name,this._automaticDataCollectionEnabled=r.automaticDataCollectionEnabled,this._container=a,this.container.addComponent(new Ht("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(n){this.checkDestroyed(),this._automaticDataCollectionEnabled=n}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(n){this._isDeleted=n}checkDestroyed(){if(this.isDeleted)throw lt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br=Lr;function Di(s,n={}){let r=s;typeof n!="object"&&(n={name:n});const a=Object.assign({name:Xe,automaticDataCollectionEnabled:!1},n),h=a.name;if(typeof h!="string"||!h)throw lt.create("bad-app-name",{appName:String(h)});if(r||(r=Ii()),!r)throw lt.create("no-options");const f=ue.get(h);if(f){if(Ge(r,f.options)&&Ge(a,f.config))return f;throw lt.create("duplicate-app",{appName:h})}const E=new Hs(h);for(const w of Je.values())E.addComponent(w);const _=new xr(r,a,E);return ue.set(h,_),_}function jr(s=Xe){const n=ue.get(s);if(!n&&s===Xe&&Ii())return Di();if(!n)throw lt.create("no-app",{appName:s});return n}function _t(s,n,r){var a;let h=(a=kr[s])!==null&&a!==void 0?a:s;r&&(h+=`-${r}`);const f=h.match(/\s|\//),E=n.match(/\s|\//);if(f||E){const _=[`Unable to register library "${h}" with version "${n}":`];f&&_.push(`library name "${h}" contains illegal characters (whitespace or "/")`),f&&E&&_.push("and"),E&&_.push(`version name "${n}" contains illegal characters (whitespace or "/")`),nt.warn(_.join(" "));return}fe(new Ht(`${h}-version`,()=>({library:h,version:n}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fr="firebase-heartbeat-database",$r=1,Vt="firebase-heartbeat-store";let Ve=null;function Pi(){return Ve||(Ve=er(Fr,$r,{upgrade:(s,n)=>{switch(n){case 0:try{s.createObjectStore(Vt)}catch(r){console.warn(r)}}}}).catch(s=>{throw lt.create("idb-open",{originalErrorMessage:s.message})})),Ve}async function Ur(s){try{const r=(await Pi()).transaction(Vt),a=await r.objectStore(Vt).get(Ri(s));return await r.done,a}catch(n){if(n instanceof It)nt.warn(n.message);else{const r=lt.create("idb-get",{originalErrorMessage:n==null?void 0:n.message});nt.warn(r.message)}}}async function li(s,n){try{const a=(await Pi()).transaction(Vt,"readwrite");await a.objectStore(Vt).put(n,Ri(s)),await a.done}catch(r){if(r instanceof It)nt.warn(r.message);else{const a=lt.create("idb-set",{originalErrorMessage:r==null?void 0:r.message});nt.warn(a.message)}}}function Ri(s){return`${s.name}!${s.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hr=1024,Vr=30*24*60*60*1e3;class zr{constructor(n){this.container=n,this._heartbeatsCache=null;const r=this.container.getProvider("app").getImmediate();this._storage=new Kr(r),this._heartbeatsCachePromise=this._storage.read().then(a=>(this._heartbeatsCache=a,a))}async triggerHeartbeat(){var n,r;try{const h=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),f=ci();return((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((r=this._heartbeatsCache)===null||r===void 0?void 0:r.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===f||this._heartbeatsCache.heartbeats.some(E=>E.date===f)?void 0:(this._heartbeatsCache.heartbeats.push({date:f,agent:h}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(E=>{const _=new Date(E.date).valueOf();return Date.now()-_<=Vr}),this._storage.overwrite(this._heartbeatsCache))}catch(a){nt.warn(a)}}async getHeartbeatsHeader(){var n;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const r=ci(),{heartbeatsToSend:a,unsentEntries:h}=Gr(this._heartbeatsCache.heartbeats),f=ce(JSON.stringify({version:2,heartbeats:a}));return this._heartbeatsCache.lastSentHeartbeatDate=r,h.length>0?(this._heartbeatsCache.heartbeats=h,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),f}catch(r){return nt.warn(r),""}}}function ci(){return new Date().toISOString().substring(0,10)}function Gr(s,n=Hr){const r=[];let a=s.slice();for(const h of s){const f=r.find(E=>E.agent===h.agent);if(f){if(f.dates.push(h.date),ui(r)>n){f.dates.pop();break}}else if(r.push({agent:h.agent,dates:[h.date]}),ui(r)>n){r.pop();break}a=a.slice(1)}return{heartbeatsToSend:r,unsentEntries:a}}class Kr{constructor(n){this.app=n,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ns()?Ms().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const r=await Ur(this.app);return r!=null&&r.heartbeats?r:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(n){var r;if(await this._canUseIndexedDBPromise){const h=await this.read();return li(this.app,{lastSentHeartbeatDate:(r=n.lastSentHeartbeatDate)!==null&&r!==void 0?r:h.lastSentHeartbeatDate,heartbeats:n.heartbeats})}else return}async add(n){var r;if(await this._canUseIndexedDBPromise){const h=await this.read();return li(this.app,{lastSentHeartbeatDate:(r=n.lastSentHeartbeatDate)!==null&&r!==void 0?r:h.lastSentHeartbeatDate,heartbeats:[...h.heartbeats,...n.heartbeats]})}else return}}function ui(s){return ce(JSON.stringify({version:2,heartbeats:s})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qr(s){fe(new Ht("platform-logger",n=>new sr(n),"PRIVATE")),fe(new Ht("heartbeat",n=>new zr(n),"PRIVATE")),_t(We,ai,s),_t(We,ai,"esm2017"),_t("fire-js","")}qr("");var Wr="firebase",Xr="10.13.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */_t(Wr,Xr,"app");var fi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Li;(function(){var s;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function n(g,l){function u(){}u.prototype=l.prototype,g.D=l.prototype,g.prototype=new u,g.prototype.constructor=g,g.C=function(d,p,y){for(var c=Array(arguments.length-2),Z=2;Z<arguments.length;Z++)c[Z-2]=arguments[Z];return l.prototype[p].apply(d,c)}}function r(){this.blockSize=-1}function a(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}n(a,r),a.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function h(g,l,u){u||(u=0);var d=Array(16);if(typeof l=="string")for(var p=0;16>p;++p)d[p]=l.charCodeAt(u++)|l.charCodeAt(u++)<<8|l.charCodeAt(u++)<<16|l.charCodeAt(u++)<<24;else for(p=0;16>p;++p)d[p]=l[u++]|l[u++]<<8|l[u++]<<16|l[u++]<<24;l=g.g[0],u=g.g[1],p=g.g[2];var y=g.g[3],c=l+(y^u&(p^y))+d[0]+3614090360&4294967295;l=u+(c<<7&4294967295|c>>>25),c=y+(p^l&(u^p))+d[1]+3905402710&4294967295,y=l+(c<<12&4294967295|c>>>20),c=p+(u^y&(l^u))+d[2]+606105819&4294967295,p=y+(c<<17&4294967295|c>>>15),c=u+(l^p&(y^l))+d[3]+3250441966&4294967295,u=p+(c<<22&4294967295|c>>>10),c=l+(y^u&(p^y))+d[4]+4118548399&4294967295,l=u+(c<<7&4294967295|c>>>25),c=y+(p^l&(u^p))+d[5]+1200080426&4294967295,y=l+(c<<12&4294967295|c>>>20),c=p+(u^y&(l^u))+d[6]+2821735955&4294967295,p=y+(c<<17&4294967295|c>>>15),c=u+(l^p&(y^l))+d[7]+4249261313&4294967295,u=p+(c<<22&4294967295|c>>>10),c=l+(y^u&(p^y))+d[8]+1770035416&4294967295,l=u+(c<<7&4294967295|c>>>25),c=y+(p^l&(u^p))+d[9]+2336552879&4294967295,y=l+(c<<12&4294967295|c>>>20),c=p+(u^y&(l^u))+d[10]+4294925233&4294967295,p=y+(c<<17&4294967295|c>>>15),c=u+(l^p&(y^l))+d[11]+2304563134&4294967295,u=p+(c<<22&4294967295|c>>>10),c=l+(y^u&(p^y))+d[12]+1804603682&4294967295,l=u+(c<<7&4294967295|c>>>25),c=y+(p^l&(u^p))+d[13]+4254626195&4294967295,y=l+(c<<12&4294967295|c>>>20),c=p+(u^y&(l^u))+d[14]+2792965006&4294967295,p=y+(c<<17&4294967295|c>>>15),c=u+(l^p&(y^l))+d[15]+1236535329&4294967295,u=p+(c<<22&4294967295|c>>>10),c=l+(p^y&(u^p))+d[1]+4129170786&4294967295,l=u+(c<<5&4294967295|c>>>27),c=y+(u^p&(l^u))+d[6]+3225465664&4294967295,y=l+(c<<9&4294967295|c>>>23),c=p+(l^u&(y^l))+d[11]+643717713&4294967295,p=y+(c<<14&4294967295|c>>>18),c=u+(y^l&(p^y))+d[0]+3921069994&4294967295,u=p+(c<<20&4294967295|c>>>12),c=l+(p^y&(u^p))+d[5]+3593408605&4294967295,l=u+(c<<5&4294967295|c>>>27),c=y+(u^p&(l^u))+d[10]+38016083&4294967295,y=l+(c<<9&4294967295|c>>>23),c=p+(l^u&(y^l))+d[15]+3634488961&4294967295,p=y+(c<<14&4294967295|c>>>18),c=u+(y^l&(p^y))+d[4]+3889429448&4294967295,u=p+(c<<20&4294967295|c>>>12),c=l+(p^y&(u^p))+d[9]+568446438&4294967295,l=u+(c<<5&4294967295|c>>>27),c=y+(u^p&(l^u))+d[14]+3275163606&4294967295,y=l+(c<<9&4294967295|c>>>23),c=p+(l^u&(y^l))+d[3]+4107603335&4294967295,p=y+(c<<14&4294967295|c>>>18),c=u+(y^l&(p^y))+d[8]+1163531501&4294967295,u=p+(c<<20&4294967295|c>>>12),c=l+(p^y&(u^p))+d[13]+2850285829&4294967295,l=u+(c<<5&4294967295|c>>>27),c=y+(u^p&(l^u))+d[2]+4243563512&4294967295,y=l+(c<<9&4294967295|c>>>23),c=p+(l^u&(y^l))+d[7]+1735328473&4294967295,p=y+(c<<14&4294967295|c>>>18),c=u+(y^l&(p^y))+d[12]+2368359562&4294967295,u=p+(c<<20&4294967295|c>>>12),c=l+(u^p^y)+d[5]+4294588738&4294967295,l=u+(c<<4&4294967295|c>>>28),c=y+(l^u^p)+d[8]+2272392833&4294967295,y=l+(c<<11&4294967295|c>>>21),c=p+(y^l^u)+d[11]+1839030562&4294967295,p=y+(c<<16&4294967295|c>>>16),c=u+(p^y^l)+d[14]+4259657740&4294967295,u=p+(c<<23&4294967295|c>>>9),c=l+(u^p^y)+d[1]+2763975236&4294967295,l=u+(c<<4&4294967295|c>>>28),c=y+(l^u^p)+d[4]+1272893353&4294967295,y=l+(c<<11&4294967295|c>>>21),c=p+(y^l^u)+d[7]+4139469664&4294967295,p=y+(c<<16&4294967295|c>>>16),c=u+(p^y^l)+d[10]+3200236656&4294967295,u=p+(c<<23&4294967295|c>>>9),c=l+(u^p^y)+d[13]+681279174&4294967295,l=u+(c<<4&4294967295|c>>>28),c=y+(l^u^p)+d[0]+3936430074&4294967295,y=l+(c<<11&4294967295|c>>>21),c=p+(y^l^u)+d[3]+3572445317&4294967295,p=y+(c<<16&4294967295|c>>>16),c=u+(p^y^l)+d[6]+76029189&4294967295,u=p+(c<<23&4294967295|c>>>9),c=l+(u^p^y)+d[9]+3654602809&4294967295,l=u+(c<<4&4294967295|c>>>28),c=y+(l^u^p)+d[12]+3873151461&4294967295,y=l+(c<<11&4294967295|c>>>21),c=p+(y^l^u)+d[15]+530742520&4294967295,p=y+(c<<16&4294967295|c>>>16),c=u+(p^y^l)+d[2]+3299628645&4294967295,u=p+(c<<23&4294967295|c>>>9),c=l+(p^(u|~y))+d[0]+4096336452&4294967295,l=u+(c<<6&4294967295|c>>>26),c=y+(u^(l|~p))+d[7]+1126891415&4294967295,y=l+(c<<10&4294967295|c>>>22),c=p+(l^(y|~u))+d[14]+2878612391&4294967295,p=y+(c<<15&4294967295|c>>>17),c=u+(y^(p|~l))+d[5]+4237533241&4294967295,u=p+(c<<21&4294967295|c>>>11),c=l+(p^(u|~y))+d[12]+1700485571&4294967295,l=u+(c<<6&4294967295|c>>>26),c=y+(u^(l|~p))+d[3]+2399980690&4294967295,y=l+(c<<10&4294967295|c>>>22),c=p+(l^(y|~u))+d[10]+4293915773&4294967295,p=y+(c<<15&4294967295|c>>>17),c=u+(y^(p|~l))+d[1]+2240044497&4294967295,u=p+(c<<21&4294967295|c>>>11),c=l+(p^(u|~y))+d[8]+1873313359&4294967295,l=u+(c<<6&4294967295|c>>>26),c=y+(u^(l|~p))+d[15]+4264355552&4294967295,y=l+(c<<10&4294967295|c>>>22),c=p+(l^(y|~u))+d[6]+2734768916&4294967295,p=y+(c<<15&4294967295|c>>>17),c=u+(y^(p|~l))+d[13]+1309151649&4294967295,u=p+(c<<21&4294967295|c>>>11),c=l+(p^(u|~y))+d[4]+4149444226&4294967295,l=u+(c<<6&4294967295|c>>>26),c=y+(u^(l|~p))+d[11]+3174756917&4294967295,y=l+(c<<10&4294967295|c>>>22),c=p+(l^(y|~u))+d[2]+718787259&4294967295,p=y+(c<<15&4294967295|c>>>17),c=u+(y^(p|~l))+d[9]+3951481745&4294967295,g.g[0]=g.g[0]+l&4294967295,g.g[1]=g.g[1]+(p+(c<<21&4294967295|c>>>11))&4294967295,g.g[2]=g.g[2]+p&4294967295,g.g[3]=g.g[3]+y&4294967295}a.prototype.u=function(g,l){l===void 0&&(l=g.length);for(var u=l-this.blockSize,d=this.B,p=this.h,y=0;y<l;){if(p==0)for(;y<=u;)h(this,g,y),y+=this.blockSize;if(typeof g=="string"){for(;y<l;)if(d[p++]=g.charCodeAt(y++),p==this.blockSize){h(this,d),p=0;break}}else for(;y<l;)if(d[p++]=g[y++],p==this.blockSize){h(this,d),p=0;break}}this.h=p,this.o+=l},a.prototype.v=function(){var g=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);g[0]=128;for(var l=1;l<g.length-8;++l)g[l]=0;var u=8*this.o;for(l=g.length-8;l<g.length;++l)g[l]=u&255,u/=256;for(this.u(g),g=Array(16),l=u=0;4>l;++l)for(var d=0;32>d;d+=8)g[u++]=this.g[l]>>>d&255;return g};function f(g,l){var u=_;return Object.prototype.hasOwnProperty.call(u,g)?u[g]:u[g]=l(g)}function E(g,l){this.h=l;for(var u=[],d=!0,p=g.length-1;0<=p;p--){var y=g[p]|0;d&&y==l||(u[p]=y,d=!1)}this.g=u}var _={};function w(g){return-128<=g&&128>g?f(g,function(l){return new E([l|0],0>l?-1:0)}):new E([g|0],0>g?-1:0)}function I(g){if(isNaN(g)||!isFinite(g))return G;if(0>g)return O(I(-g));for(var l=[],u=1,d=0;g>=u;d++)l[d]=g/u|0,u*=4294967296;return new E(l,0)}function b(g,l){if(g.length==0)throw Error("number format error: empty string");if(l=l||10,2>l||36<l)throw Error("radix out of range: "+l);if(g.charAt(0)=="-")return O(b(g.substring(1),l));if(0<=g.indexOf("-"))throw Error('number format error: interior "-" character');for(var u=I(Math.pow(l,8)),d=G,p=0;p<g.length;p+=8){var y=Math.min(8,g.length-p),c=parseInt(g.substring(p,p+y),l);8>y?(y=I(Math.pow(l,y)),d=d.j(y).add(I(c))):(d=d.j(u),d=d.add(I(c)))}return d}var G=w(0),L=w(1),q=w(16777216);s=E.prototype,s.m=function(){if(M(this))return-O(this).m();for(var g=0,l=1,u=0;u<this.g.length;u++){var d=this.i(u);g+=(0<=d?d:4294967296+d)*l,l*=4294967296}return g},s.toString=function(g){if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(C(this))return"0";if(M(this))return"-"+O(this).toString(g);for(var l=I(Math.pow(g,6)),u=this,d="";;){var p=it(u,l).g;u=pt(u,p.j(l));var y=((0<u.g.length?u.g[0]:u.h)>>>0).toString(g);if(u=p,C(u))return y+d;for(;6>y.length;)y="0"+y;d=y+d}},s.i=function(g){return 0>g?0:g<this.g.length?this.g[g]:this.h};function C(g){if(g.h!=0)return!1;for(var l=0;l<g.g.length;l++)if(g.g[l]!=0)return!1;return!0}function M(g){return g.h==-1}s.l=function(g){return g=pt(this,g),M(g)?-1:C(g)?0:1};function O(g){for(var l=g.g.length,u=[],d=0;d<l;d++)u[d]=~g.g[d];return new E(u,~g.h).add(L)}s.abs=function(){return M(this)?O(this):this},s.add=function(g){for(var l=Math.max(this.g.length,g.g.length),u=[],d=0,p=0;p<=l;p++){var y=d+(this.i(p)&65535)+(g.i(p)&65535),c=(y>>>16)+(this.i(p)>>>16)+(g.i(p)>>>16);d=c>>>16,y&=65535,c&=65535,u[p]=c<<16|y}return new E(u,u[u.length-1]&-2147483648?-1:0)};function pt(g,l){return g.add(O(l))}s.j=function(g){if(C(this)||C(g))return G;if(M(this))return M(g)?O(this).j(O(g)):O(O(this).j(g));if(M(g))return O(this.j(O(g)));if(0>this.l(q)&&0>g.l(q))return I(this.m()*g.m());for(var l=this.g.length+g.g.length,u=[],d=0;d<2*l;d++)u[d]=0;for(d=0;d<this.g.length;d++)for(var p=0;p<g.g.length;p++){var y=this.i(d)>>>16,c=this.i(d)&65535,Z=g.i(p)>>>16,Tt=g.i(p)&65535;u[2*d+2*p]+=c*Tt,Y(u,2*d+2*p),u[2*d+2*p+1]+=y*Tt,Y(u,2*d+2*p+1),u[2*d+2*p+1]+=c*Z,Y(u,2*d+2*p+1),u[2*d+2*p+2]+=y*Z,Y(u,2*d+2*p+2)}for(d=0;d<l;d++)u[d]=u[2*d+1]<<16|u[2*d];for(d=l;d<2*l;d++)u[d]=0;return new E(u,0)};function Y(g,l){for(;(g[l]&65535)!=g[l];)g[l+1]+=g[l]>>>16,g[l]&=65535,l++}function W(g,l){this.g=g,this.h=l}function it(g,l){if(C(l))throw Error("division by zero");if(C(g))return new W(G,G);if(M(g))return l=it(O(g),l),new W(O(l.g),O(l.h));if(M(l))return l=it(g,O(l)),new W(O(l.g),l.h);if(30<g.g.length){if(M(g)||M(l))throw Error("slowDivide_ only works with positive integers.");for(var u=L,d=l;0>=d.l(g);)u=Gt(u),d=Gt(d);var p=Q(u,1),y=Q(d,1);for(d=Q(d,2),u=Q(u,2);!C(d);){var c=y.add(d);0>=c.l(g)&&(p=p.add(u),y=c),d=Q(d,1),u=Q(u,1)}return l=pt(g,p.j(l)),new W(p,l)}for(p=G;0<=g.l(l);){for(u=Math.max(1,Math.floor(g.m()/l.m())),d=Math.ceil(Math.log(u)/Math.LN2),d=48>=d?1:Math.pow(2,d-48),y=I(u),c=y.j(l);M(c)||0<c.l(g);)u-=d,y=I(u),c=y.j(l);C(y)&&(y=L),p=p.add(y),g=pt(g,c)}return new W(p,g)}s.A=function(g){return it(this,g).h},s.and=function(g){for(var l=Math.max(this.g.length,g.g.length),u=[],d=0;d<l;d++)u[d]=this.i(d)&g.i(d);return new E(u,this.h&g.h)},s.or=function(g){for(var l=Math.max(this.g.length,g.g.length),u=[],d=0;d<l;d++)u[d]=this.i(d)|g.i(d);return new E(u,this.h|g.h)},s.xor=function(g){for(var l=Math.max(this.g.length,g.g.length),u=[],d=0;d<l;d++)u[d]=this.i(d)^g.i(d);return new E(u,this.h^g.h)};function Gt(g){for(var l=g.g.length+1,u=[],d=0;d<l;d++)u[d]=g.i(d)<<1|g.i(d-1)>>>31;return new E(u,g.h)}function Q(g,l){var u=l>>5;l%=32;for(var d=g.g.length-u,p=[],y=0;y<d;y++)p[y]=0<l?g.i(y+u)>>>l|g.i(y+u+1)<<32-l:g.i(y+u);return new E(p,g.h)}a.prototype.digest=a.prototype.v,a.prototype.reset=a.prototype.s,a.prototype.update=a.prototype.u,E.prototype.add=E.prototype.add,E.prototype.multiply=E.prototype.j,E.prototype.modulo=E.prototype.A,E.prototype.compare=E.prototype.l,E.prototype.toNumber=E.prototype.m,E.prototype.toString=E.prototype.toString,E.prototype.getBits=E.prototype.i,E.fromNumber=I,E.fromString=b,Li=E}).apply(typeof fi<"u"?fi:typeof self<"u"?self:typeof window<"u"?window:{});var he=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var s,n=typeof Object.defineProperties=="function"?Object.defineProperty:function(t,e,i){return t==Array.prototype||t==Object.prototype||(t[e]=i.value),t};function r(t){t=[typeof globalThis=="object"&&globalThis,t,typeof window=="object"&&window,typeof self=="object"&&self,typeof he=="object"&&he];for(var e=0;e<t.length;++e){var i=t[e];if(i&&i.Math==Math)return i}throw Error("Cannot find global object")}var a=r(this);function h(t,e){if(e)t:{var i=a;t=t.split(".");for(var o=0;o<t.length-1;o++){var m=t[o];if(!(m in i))break t;i=i[m]}t=t[t.length-1],o=i[t],e=e(o),e!=o&&e!=null&&n(i,t,{configurable:!0,writable:!0,value:e})}}function f(t,e){t instanceof String&&(t+="");var i=0,o=!1,m={next:function(){if(!o&&i<t.length){var v=i++;return{value:e(v,t[v]),done:!1}}return o=!0,{done:!0,value:void 0}}};return m[Symbol.iterator]=function(){return m},m}h("Array.prototype.values",function(t){return t||function(){return f(this,function(e,i){return i})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var E=E||{},_=this||self;function w(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function I(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function b(t,e,i){return t.call.apply(t.bind,arguments)}function G(t,e,i){if(!t)throw Error();if(2<arguments.length){var o=Array.prototype.slice.call(arguments,2);return function(){var m=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(m,o),t.apply(e,m)}}return function(){return t.apply(e,arguments)}}function L(t,e,i){return L=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?b:G,L.apply(null,arguments)}function q(t,e){var i=Array.prototype.slice.call(arguments,1);return function(){var o=i.slice();return o.push.apply(o,arguments),t.apply(this,o)}}function C(t,e){function i(){}i.prototype=e.prototype,t.aa=e.prototype,t.prototype=new i,t.prototype.constructor=t,t.Qb=function(o,m,v){for(var A=Array(arguments.length-2),P=2;P<arguments.length;P++)A[P-2]=arguments[P];return e.prototype[m].apply(o,A)}}function M(t){const e=t.length;if(0<e){const i=Array(e);for(let o=0;o<e;o++)i[o]=t[o];return i}return[]}function O(t,e){for(let i=1;i<arguments.length;i++){const o=arguments[i];if(w(o)){const m=t.length||0,v=o.length||0;t.length=m+v;for(let A=0;A<v;A++)t[m+A]=o[A]}else t.push(o)}}class pt{constructor(e,i){this.i=e,this.j=i,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function Y(t){return/^[\s\xa0]*$/.test(t)}function W(){var t=_.navigator;return t&&(t=t.userAgent)?t:""}function it(t){return it[" "](t),t}it[" "]=function(){};var Gt=W().indexOf("Gecko")!=-1&&!(W().toLowerCase().indexOf("webkit")!=-1&&W().indexOf("Edge")==-1)&&!(W().indexOf("Trident")!=-1||W().indexOf("MSIE")!=-1)&&W().indexOf("Edge")==-1;function Q(t,e,i){for(const o in t)e.call(i,t[o],o,t)}function g(t,e){for(const i in t)e.call(void 0,t[i],i,t)}function l(t){const e={};for(const i in t)e[i]=t[i];return e}const u="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function d(t,e){let i,o;for(let m=1;m<arguments.length;m++){o=arguments[m];for(i in o)t[i]=o[i];for(let v=0;v<u.length;v++)i=u[v],Object.prototype.hasOwnProperty.call(o,i)&&(t[i]=o[i])}}function p(t){var e=1;t=t.split(":");const i=[];for(;0<e&&t.length;)i.push(t.shift()),e--;return t.length&&i.push(t.join(":")),i}function y(t){_.setTimeout(()=>{throw t},0)}function c(){var t=pe;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class Z{constructor(){this.h=this.g=null}add(e,i){const o=Tt.get();o.set(e,i),this.h?this.h.next=o:this.g=o,this.h=o}}var Tt=new pt(()=>new xi,t=>t.reset());class xi{constructor(){this.next=this.g=this.h=null}set(e,i){this.h=e,this.g=i,this.next=null}reset(){this.next=this.g=this.h=null}}let bt,St=!1,pe=new Z,sn=()=>{const t=_.Promise.resolve(void 0);bt=()=>{t.then(Bi)}};var Bi=()=>{for(var t;t=c();){try{t.h.call(t.g)}catch(i){y(i)}var e=Tt;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}St=!1};function st(){this.s=this.s,this.C=this.C}st.prototype.s=!1,st.prototype.ma=function(){this.s||(this.s=!0,this.N())},st.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function x(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}x.prototype.h=function(){this.defaultPrevented=!0};var ji=function(){if(!_.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{const i=()=>{};_.addEventListener("test",i,e),_.removeEventListener("test",i,e)}catch{}return t}();function Ct(t,e){if(x.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var i=this.type=t.type,o=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(Gt){t:{try{it(e.nodeName);var m=!0;break t}catch{}m=!1}m||(e=null)}}else i=="mouseover"?e=t.fromElement:i=="mouseout"&&(e=t.toElement);this.relatedTarget=e,o?(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:Fi[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&Ct.aa.h.call(this)}}C(Ct,x);var Fi={2:"touch",3:"pen",4:"mouse"};Ct.prototype.h=function(){Ct.aa.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var Kt="closure_listenable_"+(1e6*Math.random()|0),$i=0;function Ui(t,e,i,o,m){this.listener=t,this.proxy=null,this.src=e,this.type=i,this.capture=!!o,this.ha=m,this.key=++$i,this.da=this.fa=!1}function qt(t){t.da=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function Wt(t){this.src=t,this.g={},this.h=0}Wt.prototype.add=function(t,e,i,o,m){var v=t.toString();t=this.g[v],t||(t=this.g[v]=[],this.h++);var A=me(t,e,o,m);return-1<A?(e=t[A],i||(e.fa=!1)):(e=new Ui(e,this.src,v,!!o,m),e.fa=i,t.push(e)),e};function ge(t,e){var i=e.type;if(i in t.g){var o=t.g[i],m=Array.prototype.indexOf.call(o,e,void 0),v;(v=0<=m)&&Array.prototype.splice.call(o,m,1),v&&(qt(e),t.g[i].length==0&&(delete t.g[i],t.h--))}}function me(t,e,i,o){for(var m=0;m<t.length;++m){var v=t[m];if(!v.da&&v.listener==e&&v.capture==!!i&&v.ha==o)return m}return-1}var ye="closure_lm_"+(1e6*Math.random()|0),ve={};function rn(t,e,i,o,m){if(Array.isArray(e)){for(var v=0;v<e.length;v++)rn(t,e[v],i,o,m);return null}return i=hn(i),t&&t[Kt]?t.K(e,i,I(o)?!!o.capture:!1,m):Hi(t,e,i,!1,o,m)}function Hi(t,e,i,o,m,v){if(!e)throw Error("Invalid event type");var A=I(m)?!!m.capture:!!m,P=_e(t);if(P||(t[ye]=P=new Wt(t)),i=P.add(e,i,o,A,v),i.proxy)return i;if(o=Vi(),i.proxy=o,o.src=t,o.listener=i,t.addEventListener)ji||(m=A),m===void 0&&(m=!1),t.addEventListener(e.toString(),o,m);else if(t.attachEvent)t.attachEvent(an(e.toString()),o);else if(t.addListener&&t.removeListener)t.addListener(o);else throw Error("addEventListener and attachEvent are unavailable.");return i}function Vi(){function t(i){return e.call(t.src,t.listener,i)}const e=zi;return t}function on(t,e,i,o,m){if(Array.isArray(e))for(var v=0;v<e.length;v++)on(t,e[v],i,o,m);else o=I(o)?!!o.capture:!!o,i=hn(i),t&&t[Kt]?(t=t.i,e=String(e).toString(),e in t.g&&(v=t.g[e],i=me(v,i,o,m),-1<i&&(qt(v[i]),Array.prototype.splice.call(v,i,1),v.length==0&&(delete t.g[e],t.h--)))):t&&(t=_e(t))&&(e=t.g[e.toString()],t=-1,e&&(t=me(e,i,o,m)),(i=-1<t?e[t]:null)&&Ee(i))}function Ee(t){if(typeof t!="number"&&t&&!t.da){var e=t.src;if(e&&e[Kt])ge(e.i,t);else{var i=t.type,o=t.proxy;e.removeEventListener?e.removeEventListener(i,o,t.capture):e.detachEvent?e.detachEvent(an(i),o):e.addListener&&e.removeListener&&e.removeListener(o),(i=_e(e))?(ge(i,t),i.h==0&&(i.src=null,e[ye]=null)):qt(t)}}}function an(t){return t in ve?ve[t]:ve[t]="on"+t}function zi(t,e){if(t.da)t=!0;else{e=new Ct(e,this);var i=t.listener,o=t.ha||t.src;t.fa&&Ee(t),t=i.call(o,e)}return t}function _e(t){return t=t[ye],t instanceof Wt?t:null}var we="__closure_events_fn_"+(1e9*Math.random()>>>0);function hn(t){return typeof t=="function"?t:(t[we]||(t[we]=function(e){return t.handleEvent(e)}),t[we])}function B(){st.call(this),this.i=new Wt(this),this.M=this,this.F=null}C(B,st),B.prototype[Kt]=!0,B.prototype.removeEventListener=function(t,e,i,o){on(this,t,e,i,o)};function V(t,e){var i,o=t.F;if(o)for(i=[];o;o=o.F)i.push(o);if(t=t.M,o=e.type||e,typeof e=="string")e=new x(e,t);else if(e instanceof x)e.target=e.target||t;else{var m=e;e=new x(o,t),d(e,m)}if(m=!0,i)for(var v=i.length-1;0<=v;v--){var A=e.g=i[v];m=Xt(A,o,!0,e)&&m}if(A=e.g=t,m=Xt(A,o,!0,e)&&m,m=Xt(A,o,!1,e)&&m,i)for(v=0;v<i.length;v++)A=e.g=i[v],m=Xt(A,o,!1,e)&&m}B.prototype.N=function(){if(B.aa.N.call(this),this.i){var t=this.i,e;for(e in t.g){for(var i=t.g[e],o=0;o<i.length;o++)qt(i[o]);delete t.g[e],t.h--}}this.F=null},B.prototype.K=function(t,e,i,o){return this.i.add(String(t),e,!1,i,o)},B.prototype.L=function(t,e,i,o){return this.i.add(String(t),e,!0,i,o)};function Xt(t,e,i,o){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var m=!0,v=0;v<e.length;++v){var A=e[v];if(A&&!A.da&&A.capture==i){var P=A.listener,N=A.ha||A.src;A.fa&&ge(t.i,A),m=P.call(N,o)!==!1&&m}}return m&&!o.defaultPrevented}function ln(t,e,i){if(typeof t=="function")i&&(t=L(t,i));else if(t&&typeof t.handleEvent=="function")t=L(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:_.setTimeout(t,e||0)}function cn(t){t.g=ln(()=>{t.g=null,t.i&&(t.i=!1,cn(t))},t.l);const e=t.h;t.h=null,t.m.apply(null,e)}class Gi extends st{constructor(e,i){super(),this.m=e,this.l=i,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:cn(this)}N(){super.N(),this.g&&(_.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Dt(t){st.call(this),this.h=t,this.g={}}C(Dt,st);var un=[];function fn(t){Q(t.g,function(e,i){this.g.hasOwnProperty(i)&&Ee(e)},t),t.g={}}Dt.prototype.N=function(){Dt.aa.N.call(this),fn(this)},Dt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ae=_.JSON.stringify,Ki=_.JSON.parse,qi=class{stringify(t){return _.JSON.stringify(t,void 0)}parse(t){return _.JSON.parse(t,void 0)}};function Ie(){}Ie.prototype.h=null;function dn(t){return t.h||(t.h=t.i())}function Wi(){}var Pt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Te(){x.call(this,"d")}C(Te,x);function be(){x.call(this,"c")}C(be,x);var gt={},pn=null;function Se(){return pn=pn||new B}gt.La="serverreachability";function gn(t){x.call(this,gt.La,t)}C(gn,x);function Rt(t){const e=Se();V(e,new gn(e))}gt.STAT_EVENT="statevent";function mn(t,e){x.call(this,gt.STAT_EVENT,t),this.stat=e}C(mn,x);function z(t){const e=Se();V(e,new mn(e,t))}gt.Ma="timingevent";function yn(t,e){x.call(this,gt.Ma,t),this.size=e}C(yn,x);function Lt(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return _.setTimeout(function(){t()},e)}function kt(){this.g=!0}kt.prototype.xa=function(){this.g=!1};function Xi(t,e,i,o,m,v){t.info(function(){if(t.g)if(v)for(var A="",P=v.split("&"),N=0;N<P.length;N++){var S=P[N].split("=");if(1<S.length){var j=S[0];S=S[1];var F=j.split("_");A=2<=F.length&&F[1]=="type"?A+(j+"="+S+"&"):A+(j+"=redacted&")}}else A=null;else A=v;return"XMLHTTP REQ ("+o+") [attempt "+m+"]: "+e+`
`+i+`
`+A})}function Ji(t,e,i,o,m,v,A){t.info(function(){return"XMLHTTP RESP ("+o+") [ attempt "+m+"]: "+e+`
`+i+`
`+v+" "+A})}function mt(t,e,i,o){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+Qi(t,i)+(o?" "+o:"")})}function Yi(t,e){t.info(function(){return"TIMEOUT: "+e})}kt.prototype.info=function(){};function Qi(t,e){if(!t.g)return e;if(!e)return null;try{var i=JSON.parse(e);if(i){for(t=0;t<i.length;t++)if(Array.isArray(i[t])){var o=i[t];if(!(2>o.length)){var m=o[1];if(Array.isArray(m)&&!(1>m.length)){var v=m[0];if(v!="noop"&&v!="stop"&&v!="close")for(var A=1;A<m.length;A++)m[A]=""}}}}return Ae(i)}catch{return e}}var Ce={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Zi={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},De;function Jt(){}C(Jt,Ie),Jt.prototype.g=function(){return new XMLHttpRequest},Jt.prototype.i=function(){return{}},De=new Jt;function rt(t,e,i,o){this.j=t,this.i=e,this.l=i,this.R=o||1,this.U=new Dt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new vn}function vn(){this.i=null,this.g="",this.h=!1}var En={},Pe={};function Re(t,e,i){t.L=1,t.v=te(tt(e)),t.m=i,t.P=!0,_n(t,null)}function _n(t,e){t.F=Date.now(),Yt(t),t.A=tt(t.v);var i=t.A,o=t.R;Array.isArray(o)||(o=[String(o)]),Nn(i.i,"t",o),t.C=0,i=t.j.J,t.h=new vn,t.g=Qn(t.j,i?e:null,!t.m),0<t.O&&(t.M=new Gi(L(t.Y,t,t.g),t.O)),e=t.U,i=t.g,o=t.ca;var m="readystatechange";Array.isArray(m)||(m&&(un[0]=m.toString()),m=un);for(var v=0;v<m.length;v++){var A=rn(i,m[v],o||e.handleEvent,!1,e.h||e);if(!A)break;e.g[A.key]=A}e=t.H?l(t.H):{},t.m?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.m,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),Rt(),Xi(t.i,t.u,t.A,t.l,t.R,t.m)}rt.prototype.ca=function(t){t=t.target;const e=this.M;e&&et(t)==3?e.j():this.Y(t)},rt.prototype.Y=function(t){try{if(t==this.g)t:{const F=et(this.g);var e=this.g.Ba();const Et=this.g.Z();if(!(3>F)&&(F!=3||this.g&&(this.h.h||this.g.oa()||Un(this.g)))){this.J||F!=4||e==7||(e==8||0>=Et?Rt(3):Rt(2)),Le(this);var i=this.g.Z();this.X=i;e:if(wn(this)){var o=Un(this.g);t="";var m=o.length,v=et(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ct(this),Ot(this);var A="";break e}this.h.i=new _.TextDecoder}for(e=0;e<m;e++)this.h.h=!0,t+=this.h.i.decode(o[e],{stream:!(v&&e==m-1)});o.length=0,this.h.g+=t,this.C=0,A=this.h.g}else A=this.g.oa();if(this.o=i==200,Ji(this.i,this.u,this.A,this.l,this.R,F,i),this.o){if(this.T&&!this.K){e:{if(this.g){var P,N=this.g;if((P=N.g?N.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Y(P)){var S=P;break e}}S=null}if(i=S)mt(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ke(this,i);else{this.o=!1,this.s=3,z(12),ct(this),Ot(this);break t}}if(this.P){i=!0;let J;for(;!this.J&&this.C<A.length;)if(J=ts(this,A),J==Pe){F==4&&(this.s=4,z(14),i=!1),mt(this.i,this.l,null,"[Incomplete Response]");break}else if(J==En){this.s=4,z(15),mt(this.i,this.l,A,"[Invalid Chunk]"),i=!1;break}else mt(this.i,this.l,J,null),ke(this,J);if(wn(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),F!=4||A.length!=0||this.h.h||(this.s=1,z(16),i=!1),this.o=this.o&&i,!i)mt(this.i,this.l,A,"[Invalid Chunked Response]"),ct(this),Ot(this);else if(0<A.length&&!this.W){this.W=!0;var j=this.j;j.g==this&&j.ba&&!j.M&&(j.j.info("Great, no buffering proxy detected. Bytes received: "+A.length),je(j),j.M=!0,z(11))}}else mt(this.i,this.l,A,null),ke(this,A);F==4&&ct(this),this.o&&!this.J&&(F==4?Wn(this.j,this):(this.o=!1,Yt(this)))}else ys(this.g),i==400&&0<A.indexOf("Unknown SID")?(this.s=3,z(12)):(this.s=0,z(13)),ct(this),Ot(this)}}}catch{}finally{}};function wn(t){return t.g?t.u=="GET"&&t.L!=2&&t.j.Ca:!1}function ts(t,e){var i=t.C,o=e.indexOf(`
`,i);return o==-1?Pe:(i=Number(e.substring(i,o)),isNaN(i)?En:(o+=1,o+i>e.length?Pe:(e=e.slice(o,o+i),t.C=o+i,e)))}rt.prototype.cancel=function(){this.J=!0,ct(this)};function Yt(t){t.S=Date.now()+t.I,An(t,t.I)}function An(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=Lt(L(t.ba,t),e)}function Le(t){t.B&&(_.clearTimeout(t.B),t.B=null)}rt.prototype.ba=function(){this.B=null;const t=Date.now();0<=t-this.S?(Yi(this.i,this.A),this.L!=2&&(Rt(),z(17)),ct(this),this.s=2,Ot(this)):An(this,this.S-t)};function Ot(t){t.j.G==0||t.J||Wn(t.j,t)}function ct(t){Le(t);var e=t.M;e&&typeof e.ma=="function"&&e.ma(),t.M=null,fn(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.ma())}function ke(t,e){try{var i=t.j;if(i.G!=0&&(i.g==t||Oe(i.h,t))){if(!t.K&&Oe(i.h,t)&&i.G==3){try{var o=i.Da.g.parse(e)}catch{o=null}if(Array.isArray(o)&&o.length==3){var m=o;if(m[0]==0){t:if(!i.u){if(i.g)if(i.g.F+3e3<t.F)oe(i),se(i);else break t;Be(i),z(18)}}else i.za=m[1],0<i.za-i.T&&37500>m[2]&&i.F&&i.v==0&&!i.C&&(i.C=Lt(L(i.Za,i),6e3));if(1>=bn(i.h)&&i.ca){try{i.ca()}catch{}i.ca=void 0}}else ft(i,11)}else if((t.K||i.g==t)&&oe(i),!Y(e))for(m=i.Da.g.parse(e),e=0;e<m.length;e++){let S=m[e];if(i.T=S[0],S=S[1],i.G==2)if(S[0]=="c"){i.K=S[1],i.ia=S[2];const j=S[3];j!=null&&(i.la=j,i.j.info("VER="+i.la));const F=S[4];F!=null&&(i.Aa=F,i.j.info("SVER="+i.Aa));const Et=S[5];Et!=null&&typeof Et=="number"&&0<Et&&(o=1.5*Et,i.L=o,i.j.info("backChannelRequestTimeoutMs_="+o)),o=i;const J=t.g;if(J){const ae=J.g?J.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ae){var v=o.h;v.g||ae.indexOf("spdy")==-1&&ae.indexOf("quic")==-1&&ae.indexOf("h2")==-1||(v.j=v.l,v.g=new Set,v.h&&(Ne(v,v.h),v.h=null))}if(o.D){const Fe=J.g?J.g.getResponseHeader("X-HTTP-Session-Id"):null;Fe&&(o.ya=Fe,R(o.I,o.D,Fe))}}i.G=3,i.l&&i.l.ua(),i.ba&&(i.R=Date.now()-t.F,i.j.info("Handshake RTT: "+i.R+"ms")),o=i;var A=t;if(o.qa=Yn(o,o.J?o.ia:null,o.W),A.K){Sn(o.h,A);var P=A,N=o.L;N&&(P.I=N),P.B&&(Le(P),Yt(P)),o.g=A}else Kn(o);0<i.i.length&&re(i)}else S[0]!="stop"&&S[0]!="close"||ft(i,7);else i.G==3&&(S[0]=="stop"||S[0]=="close"?S[0]=="stop"?ft(i,7):xe(i):S[0]!="noop"&&i.l&&i.l.ta(S),i.v=0)}}Rt(4)}catch{}}var es=class{constructor(t,e){this.g=t,this.map=e}};function In(t){this.l=t||10,_.PerformanceNavigationTiming?(t=_.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(_.chrome&&_.chrome.loadTimes&&_.chrome.loadTimes()&&_.chrome.loadTimes().wasFetchedViaSpdy),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Tn(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function bn(t){return t.h?1:t.g?t.g.size:0}function Oe(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function Ne(t,e){t.g?t.g.add(e):t.h=e}function Sn(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}In.prototype.cancel=function(){if(this.i=Cn(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function Cn(t){if(t.h!=null)return t.i.concat(t.h.D);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const i of t.g.values())e=e.concat(i.D);return e}return M(t.i)}function ns(t){if(t.V&&typeof t.V=="function")return t.V();if(typeof Map<"u"&&t instanceof Map||typeof Set<"u"&&t instanceof Set)return Array.from(t.values());if(typeof t=="string")return t.split("");if(w(t)){for(var e=[],i=t.length,o=0;o<i;o++)e.push(t[o]);return e}e=[],i=0;for(o in t)e[i++]=t[o];return e}function is(t){if(t.na&&typeof t.na=="function")return t.na();if(!t.V||typeof t.V!="function"){if(typeof Map<"u"&&t instanceof Map)return Array.from(t.keys());if(!(typeof Set<"u"&&t instanceof Set)){if(w(t)||typeof t=="string"){var e=[];t=t.length;for(var i=0;i<t;i++)e.push(i);return e}e=[],i=0;for(const o in t)e[i++]=o;return e}}}function Dn(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(w(t)||typeof t=="string")Array.prototype.forEach.call(t,e,void 0);else for(var i=is(t),o=ns(t),m=o.length,v=0;v<m;v++)e.call(void 0,o[v],i&&i[v],t)}var Pn=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ss(t,e){if(t){t=t.split("&");for(var i=0;i<t.length;i++){var o=t[i].indexOf("="),m=null;if(0<=o){var v=t[i].substring(0,o);m=t[i].substring(o+1)}else v=t[i];e(v,m?decodeURIComponent(m.replace(/\+/g," ")):"")}}}function ut(t){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,t instanceof ut){this.h=t.h,Qt(this,t.j),this.o=t.o,this.g=t.g,Zt(this,t.s),this.l=t.l;var e=t.i,i=new xt;i.i=e.i,e.g&&(i.g=new Map(e.g),i.h=e.h),Rn(this,i),this.m=t.m}else t&&(e=String(t).match(Pn))?(this.h=!1,Qt(this,e[1]||"",!0),this.o=Nt(e[2]||""),this.g=Nt(e[3]||"",!0),Zt(this,e[4]),this.l=Nt(e[5]||"",!0),Rn(this,e[6]||"",!0),this.m=Nt(e[7]||"")):(this.h=!1,this.i=new xt(null,this.h))}ut.prototype.toString=function(){var t=[],e=this.j;e&&t.push(Mt(e,Ln,!0),":");var i=this.g;return(i||e=="file")&&(t.push("//"),(e=this.o)&&t.push(Mt(e,Ln,!0),"@"),t.push(encodeURIComponent(String(i)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i=this.s,i!=null&&t.push(":",String(i))),(i=this.l)&&(this.g&&i.charAt(0)!="/"&&t.push("/"),t.push(Mt(i,i.charAt(0)=="/"?as:os,!0))),(i=this.i.toString())&&t.push("?",i),(i=this.m)&&t.push("#",Mt(i,ls)),t.join("")};function tt(t){return new ut(t)}function Qt(t,e,i){t.j=i?Nt(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function Zt(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.s=e}else t.s=null}function Rn(t,e,i){e instanceof xt?(t.i=e,cs(t.i,t.h)):(i||(e=Mt(e,hs)),t.i=new xt(e,t.h))}function R(t,e,i){t.i.set(e,i)}function te(t){return R(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function Nt(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Mt(t,e,i){return typeof t=="string"?(t=encodeURI(t).replace(e,rs),i&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function rs(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var Ln=/[#\/\?@]/g,os=/[#\?:]/g,as=/[#\?]/g,hs=/[#\?@]/g,ls=/#/g;function xt(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function ot(t){t.g||(t.g=new Map,t.h=0,t.i&&ss(t.i,function(e,i){t.add(decodeURIComponent(e.replace(/\+/g," ")),i)}))}s=xt.prototype,s.add=function(t,e){ot(this),this.i=null,t=yt(this,t);var i=this.g.get(t);return i||this.g.set(t,i=[]),i.push(e),this.h+=1,this};function kn(t,e){ot(t),e=yt(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function On(t,e){return ot(t),e=yt(t,e),t.g.has(e)}s.forEach=function(t,e){ot(this),this.g.forEach(function(i,o){i.forEach(function(m){t.call(e,m,o,this)},this)},this)},s.na=function(){ot(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),i=[];for(let o=0;o<e.length;o++){const m=t[o];for(let v=0;v<m.length;v++)i.push(e[o])}return i},s.V=function(t){ot(this);let e=[];if(typeof t=="string")On(this,t)&&(e=e.concat(this.g.get(yt(this,t))));else{t=Array.from(this.g.values());for(let i=0;i<t.length;i++)e=e.concat(t[i])}return e},s.set=function(t,e){return ot(this),this.i=null,t=yt(this,t),On(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},s.get=function(t,e){return t?(t=this.V(t),0<t.length?String(t[0]):e):e};function Nn(t,e,i){kn(t,e),0<i.length&&(t.i=null,t.g.set(yt(t,e),M(i)),t.h+=i.length)}s.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var i=0;i<e.length;i++){var o=e[i];const v=encodeURIComponent(String(o)),A=this.V(o);for(o=0;o<A.length;o++){var m=v;A[o]!==""&&(m+="="+encodeURIComponent(String(A[o]))),t.push(m)}}return this.i=t.join("&")};function yt(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function cs(t,e){e&&!t.j&&(ot(t),t.i=null,t.g.forEach(function(i,o){var m=o.toLowerCase();o!=m&&(kn(this,o),Nn(this,m,i))},t)),t.j=e}function us(t,e){const i=new kt;if(_.Image){const o=new Image;o.onload=q(at,i,"TestLoadImage: loaded",!0,e,o),o.onerror=q(at,i,"TestLoadImage: error",!1,e,o),o.onabort=q(at,i,"TestLoadImage: abort",!1,e,o),o.ontimeout=q(at,i,"TestLoadImage: timeout",!1,e,o),_.setTimeout(function(){o.ontimeout&&o.ontimeout()},1e4),o.src=t}else e(!1)}function fs(t,e){const i=new kt,o=new AbortController,m=setTimeout(()=>{o.abort(),at(i,"TestPingServer: timeout",!1,e)},1e4);fetch(t,{signal:o.signal}).then(v=>{clearTimeout(m),v.ok?at(i,"TestPingServer: ok",!0,e):at(i,"TestPingServer: server error",!1,e)}).catch(()=>{clearTimeout(m),at(i,"TestPingServer: error",!1,e)})}function at(t,e,i,o,m){try{m&&(m.onload=null,m.onerror=null,m.onabort=null,m.ontimeout=null),o(i)}catch{}}function ds(){this.g=new qi}function ps(t,e,i){const o=i||"";try{Dn(t,function(m,v){let A=m;I(m)&&(A=Ae(m)),e.push(o+v+"="+encodeURIComponent(A))})}catch(m){throw e.push(o+"type="+encodeURIComponent("_badmap")),m}}function ee(t){this.l=t.Ub||null,this.j=t.eb||!1}C(ee,Ie),ee.prototype.g=function(){return new ne(this.l,this.j)},ee.prototype.i=function(t){return function(){return t}}({});function ne(t,e){B.call(this),this.D=t,this.o=e,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(ne,B),s=ne.prototype,s.open=function(t,e){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=t,this.A=e,this.readyState=1,jt(this)},s.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.u,method:this.B,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||_).fetch(new Request(this.A,e)).then(this.Sa.bind(this),this.ga.bind(this))},s.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Bt(this)),this.readyState=0},s.Sa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,jt(this)),this.g&&(this.readyState=3,jt(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof _.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Mn(this)}else t.text().then(this.Ra.bind(this),this.ga.bind(this))};function Mn(t){t.j.read().then(t.Pa.bind(t)).catch(t.ga.bind(t))}s.Pa=function(t){if(this.g){if(this.o&&t.value)this.response.push(t.value);else if(!this.o){var e=t.value?t.value:new Uint8Array(0);(e=this.v.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Bt(this):jt(this),this.readyState==3&&Mn(this)}},s.Ra=function(t){this.g&&(this.response=this.responseText=t,Bt(this))},s.Qa=function(t){this.g&&(this.response=t,Bt(this))},s.ga=function(){this.g&&Bt(this)};function Bt(t){t.readyState=4,t.l=null,t.j=null,t.v=null,jt(t)}s.setRequestHeader=function(t,e){this.u.append(t,e)},s.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},s.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var i=e.next();!i.done;)i=i.value,t.push(i[0]+": "+i[1]),i=e.next();return t.join(`\r
`)};function jt(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(ne.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});function xn(t){let e="";return Q(t,function(i,o){e+=o,e+=":",e+=i,e+=`\r
`}),e}function Me(t,e,i){t:{for(o in i){var o=!1;break t}o=!0}o||(i=xn(i),typeof t=="string"?i!=null&&encodeURIComponent(String(i)):R(t,e,i))}function k(t){B.call(this),this.headers=new Map,this.o=t||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(k,B);var gs=/^https?$/i,ms=["POST","PUT"];s=k.prototype,s.Ha=function(t){this.J=t},s.ea=function(t,e,i,o){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);e=e?e.toUpperCase():"GET",this.D=t,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():De.g(),this.v=this.o?dn(this.o):dn(De),this.g.onreadystatechange=L(this.Ea,this);try{this.B=!0,this.g.open(e,String(t),!0),this.B=!1}catch(v){Bn(this,v);return}if(t=i||"",i=new Map(this.headers),o)if(Object.getPrototypeOf(o)===Object.prototype)for(var m in o)i.set(m,o[m]);else if(typeof o.keys=="function"&&typeof o.get=="function")for(const v of o.keys())i.set(v,o.get(v));else throw Error("Unknown input type for opt_headers: "+String(o));o=Array.from(i.keys()).find(v=>v.toLowerCase()=="content-type"),m=_.FormData&&t instanceof _.FormData,!(0<=Array.prototype.indexOf.call(ms,e,void 0))||o||m||i.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[v,A]of i)this.g.setRequestHeader(v,A);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{$n(this),this.u=!0,this.g.send(t),this.u=!1}catch(v){Bn(this,v)}};function Bn(t,e){t.h=!1,t.g&&(t.j=!0,t.g.abort(),t.j=!1),t.l=e,t.m=5,jn(t),ie(t)}function jn(t){t.A||(t.A=!0,V(t,"complete"),V(t,"error"))}s.abort=function(t){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=t||7,V(this,"complete"),V(this,"abort"),ie(this))},s.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ie(this,!0)),k.aa.N.call(this)},s.Ea=function(){this.s||(this.B||this.u||this.j?Fn(this):this.bb())},s.bb=function(){Fn(this)};function Fn(t){if(t.h&&typeof E<"u"&&(!t.v[1]||et(t)!=4||t.Z()!=2)){if(t.u&&et(t)==4)ln(t.Ea,0,t);else if(V(t,"readystatechange"),et(t)==4){t.h=!1;try{const A=t.Z();t:switch(A){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break t;default:e=!1}var i;if(!(i=e)){var o;if(o=A===0){var m=String(t.D).match(Pn)[1]||null;!m&&_.self&&_.self.location&&(m=_.self.location.protocol.slice(0,-1)),o=!gs.test(m?m.toLowerCase():"")}i=o}if(i)V(t,"complete"),V(t,"success");else{t.m=6;try{var v=2<et(t)?t.g.statusText:""}catch{v=""}t.l=v+" ["+t.Z()+"]",jn(t)}}finally{ie(t)}}}}function ie(t,e){if(t.g){$n(t);const i=t.g,o=t.v[0]?()=>{}:null;t.g=null,t.v=null,e||V(t,"ready");try{i.onreadystatechange=o}catch{}}}function $n(t){t.I&&(_.clearTimeout(t.I),t.I=null)}s.isActive=function(){return!!this.g};function et(t){return t.g?t.g.readyState:0}s.Z=function(){try{return 2<et(this)?this.g.status:-1}catch{return-1}},s.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},s.Oa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),Ki(e)}};function Un(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.H){case"":case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}function ys(t){const e={};t=(t.g&&2<=et(t)&&t.g.getAllResponseHeaders()||"").split(`\r
`);for(let o=0;o<t.length;o++){if(Y(t[o]))continue;var i=p(t[o]);const m=i[0];if(i=i[1],typeof i!="string")continue;i=i.trim();const v=e[m]||[];e[m]=v,v.push(i)}g(e,function(o){return o.join(", ")})}s.Ba=function(){return this.m},s.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ft(t,e,i){return i&&i.internalChannelParams&&i.internalChannelParams[t]||e}function Hn(t){this.Aa=0,this.i=[],this.j=new kt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ft("failFast",!1,t),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ft("baseRetryDelayMs",5e3,t),this.cb=Ft("retryDelaySeedMs",1e4,t),this.Wa=Ft("forwardChannelMaxRetries",2,t),this.wa=Ft("forwardChannelRequestTimeoutMs",2e4,t),this.pa=t&&t.xmlHttpFactory||void 0,this.Xa=t&&t.Tb||void 0,this.Ca=t&&t.useFetchStreams||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.h=new In(t&&t.concurrentRequestLimit),this.Da=new ds,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=t&&t.Rb||!1,t&&t.xa&&this.j.xa(),t&&t.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&t&&t.detectBufferingProxy||!1,this.ja=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.ja=t.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}s=Hn.prototype,s.la=8,s.G=1,s.connect=function(t,e,i,o){z(0),this.W=t,this.H=e||{},i&&o!==void 0&&(this.H.OSID=i,this.H.OAID=o),this.F=this.X,this.I=Yn(this,null,this.W),re(this)};function xe(t){if(Vn(t),t.G==3){var e=t.U++,i=tt(t.I);if(R(i,"SID",t.K),R(i,"RID",e),R(i,"TYPE","terminate"),$t(t,i),e=new rt(t,t.j,e),e.L=2,e.v=te(tt(i)),i=!1,_.navigator&&_.navigator.sendBeacon)try{i=_.navigator.sendBeacon(e.v.toString(),"")}catch{}!i&&_.Image&&(new Image().src=e.v,i=!0),i||(e.g=Qn(e.j,null),e.g.ea(e.v)),e.F=Date.now(),Yt(e)}Jn(t)}function se(t){t.g&&(je(t),t.g.cancel(),t.g=null)}function Vn(t){se(t),t.u&&(_.clearTimeout(t.u),t.u=null),oe(t),t.h.cancel(),t.s&&(typeof t.s=="number"&&_.clearTimeout(t.s),t.s=null)}function re(t){if(!Tn(t.h)&&!t.s){t.s=!0;var e=t.Ga;bt||sn(),St||(bt(),St=!0),pe.add(e,t),t.B=0}}function vs(t,e){return bn(t.h)>=t.h.j-(t.s?1:0)?!1:t.s?(t.i=e.D.concat(t.i),!0):t.G==1||t.G==2||t.B>=(t.Va?0:t.Wa)?!1:(t.s=Lt(L(t.Ga,t,e),Xn(t,t.B)),t.B++,!0)}s.Ga=function(t){if(this.s)if(this.s=null,this.G==1){if(!t){this.U=Math.floor(1e5*Math.random()),t=this.U++;const m=new rt(this,this.j,t);let v=this.o;if(this.S&&(v?(v=l(v),d(v,this.S)):v=this.S),this.m!==null||this.O||(m.H=v,v=null),this.P)t:{for(var e=0,i=0;i<this.i.length;i++){e:{var o=this.i[i];if("__data__"in o.map&&(o=o.map.__data__,typeof o=="string")){o=o.length;break e}o=void 0}if(o===void 0)break;if(e+=o,4096<e){e=i;break t}if(e===4096||i===this.i.length-1){e=i+1;break t}}e=1e3}else e=1e3;e=Gn(this,m,e),i=tt(this.I),R(i,"RID",t),R(i,"CVER",22),this.D&&R(i,"X-HTTP-Session-Id",this.D),$t(this,i),v&&(this.O?e="headers="+encodeURIComponent(String(xn(v)))+"&"+e:this.m&&Me(i,this.m,v)),Ne(this.h,m),this.Ua&&R(i,"TYPE","init"),this.P?(R(i,"$req",e),R(i,"SID","null"),m.T=!0,Re(m,i,null)):Re(m,i,e),this.G=2}}else this.G==3&&(t?zn(this,t):this.i.length==0||Tn(this.h)||zn(this))};function zn(t,e){var i;e?i=e.l:i=t.U++;const o=tt(t.I);R(o,"SID",t.K),R(o,"RID",i),R(o,"AID",t.T),$t(t,o),t.m&&t.o&&Me(o,t.m,t.o),i=new rt(t,t.j,i,t.B+1),t.m===null&&(i.H=t.o),e&&(t.i=e.D.concat(t.i)),e=Gn(t,i,1e3),i.I=Math.round(.5*t.wa)+Math.round(.5*t.wa*Math.random()),Ne(t.h,i),Re(i,o,e)}function $t(t,e){t.H&&Q(t.H,function(i,o){R(e,o,i)}),t.l&&Dn({},function(i,o){R(e,o,i)})}function Gn(t,e,i){i=Math.min(t.i.length,i);var o=t.l?L(t.l.Na,t.l,t):null;t:{var m=t.i;let v=-1;for(;;){const A=["count="+i];v==-1?0<i?(v=m[0].g,A.push("ofs="+v)):v=0:A.push("ofs="+v);let P=!0;for(let N=0;N<i;N++){let S=m[N].g;const j=m[N].map;if(S-=v,0>S)v=Math.max(0,m[N].g-100),P=!1;else try{ps(j,A,"req"+S+"_")}catch{o&&o(j)}}if(P){o=A.join("&");break t}}}return t=t.i.splice(0,i),e.D=t,o}function Kn(t){if(!t.g&&!t.u){t.Y=1;var e=t.Fa;bt||sn(),St||(bt(),St=!0),pe.add(e,t),t.v=0}}function Be(t){return t.g||t.u||3<=t.v?!1:(t.Y++,t.u=Lt(L(t.Fa,t),Xn(t,t.v)),t.v++,!0)}s.Fa=function(){if(this.u=null,qn(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var t=2*this.R;this.j.info("BP detection timer enabled: "+t),this.A=Lt(L(this.ab,this),t)}},s.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,z(10),se(this),qn(this))};function je(t){t.A!=null&&(_.clearTimeout(t.A),t.A=null)}function qn(t){t.g=new rt(t,t.j,"rpc",t.Y),t.m===null&&(t.g.H=t.o),t.g.O=0;var e=tt(t.qa);R(e,"RID","rpc"),R(e,"SID",t.K),R(e,"AID",t.T),R(e,"CI",t.F?"0":"1"),!t.F&&t.ja&&R(e,"TO",t.ja),R(e,"TYPE","xmlhttp"),$t(t,e),t.m&&t.o&&Me(e,t.m,t.o),t.L&&(t.g.I=t.L);var i=t.g;t=t.ia,i.L=1,i.v=te(tt(e)),i.m=null,i.P=!0,_n(i,t)}s.Za=function(){this.C!=null&&(this.C=null,se(this),Be(this),z(19))};function oe(t){t.C!=null&&(_.clearTimeout(t.C),t.C=null)}function Wn(t,e){var i=null;if(t.g==e){oe(t),je(t),t.g=null;var o=2}else if(Oe(t.h,e))i=e.D,Sn(t.h,e),o=1;else return;if(t.G!=0){if(e.o)if(o==1){i=e.m?e.m.length:0,e=Date.now()-e.F;var m=t.B;o=Se(),V(o,new yn(o,i)),re(t)}else Kn(t);else if(m=e.s,m==3||m==0&&0<e.X||!(o==1&&vs(t,e)||o==2&&Be(t)))switch(i&&0<i.length&&(e=t.h,e.i=e.i.concat(i)),m){case 1:ft(t,5);break;case 4:ft(t,10);break;case 3:ft(t,6);break;default:ft(t,2)}}}function Xn(t,e){let i=t.Ta+Math.floor(Math.random()*t.cb);return t.isActive()||(i*=2),i*e}function ft(t,e){if(t.j.info("Error code "+e),e==2){var i=L(t.fb,t),o=t.Xa;const m=!o;o=new ut(o||"//www.google.com/images/cleardot.gif"),_.location&&_.location.protocol=="http"||Qt(o,"https"),te(o),m?us(o.toString(),i):fs(o.toString(),i)}else z(2);t.G=0,t.l&&t.l.sa(e),Jn(t),Vn(t)}s.fb=function(t){t?(this.j.info("Successfully pinged google.com"),z(2)):(this.j.info("Failed to ping google.com"),z(1))};function Jn(t){if(t.G=0,t.ka=[],t.l){const e=Cn(t.h);(e.length!=0||t.i.length!=0)&&(O(t.ka,e),O(t.ka,t.i),t.h.i.length=0,M(t.i),t.i.length=0),t.l.ra()}}function Yn(t,e,i){var o=i instanceof ut?tt(i):new ut(i);if(o.g!="")e&&(o.g=e+"."+o.g),Zt(o,o.s);else{var m=_.location;o=m.protocol,e=e?e+"."+m.hostname:m.hostname,m=+m.port;var v=new ut(null);o&&Qt(v,o),e&&(v.g=e),m&&Zt(v,m),i&&(v.l=i),o=v}return i=t.D,e=t.ya,i&&e&&R(o,i,e),R(o,"VER",t.la),$t(t,o),o}function Qn(t,e,i){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return e=t.Ca&&!t.pa?new k(new ee({eb:i})):new k(t.pa),e.Ha(t.J),e}s.isActive=function(){return!!this.l&&this.l.isActive(this)};function Zn(){}s=Zn.prototype,s.ua=function(){},s.ta=function(){},s.sa=function(){},s.ra=function(){},s.isActive=function(){return!0},s.Na=function(){};function X(t,e){B.call(this),this.g=new Hn(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.o=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.va&&(t?t["X-WebChannel-Client-Profile"]=e.va:t={"X-WebChannel-Client-Profile":e.va}),this.g.S=t,(t=e&&e.Sb)&&!Y(t)&&(this.g.m=t),this.v=e&&e.supportsCrossDomainXhr||!1,this.u=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Y(e)&&(this.g.D=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new vt(this)}C(X,B),X.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},X.prototype.close=function(){xe(this.g)},X.prototype.o=function(t){var e=this.g;if(typeof t=="string"){var i={};i.__data__=t,t=i}else this.u&&(i={},i.__data__=Ae(t),t=i);e.i.push(new es(e.Ya++,t)),e.G==3&&re(e)},X.prototype.N=function(){this.g.l=null,delete this.j,xe(this.g),delete this.g,X.aa.N.call(this)};function ti(t){Te.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){t:{for(const i in e){t=i;break t}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}C(ti,Te);function ei(){be.call(this),this.status=1}C(ei,be);function vt(t){this.g=t}C(vt,Zn),vt.prototype.ua=function(){V(this.g,"a")},vt.prototype.ta=function(t){V(this.g,new ti(t))},vt.prototype.sa=function(t){V(this.g,new ei)},vt.prototype.ra=function(){V(this.g,"b")},X.prototype.send=X.prototype.o,X.prototype.open=X.prototype.m,X.prototype.close=X.prototype.close,Ce.NO_ERROR=0,Ce.TIMEOUT=8,Ce.HTTP_ERROR=6,Zi.COMPLETE="complete",Wi.EventType=Pt,Pt.OPEN="a",Pt.CLOSE="b",Pt.ERROR="c",Pt.MESSAGE="d",B.prototype.listen=B.prototype.K,k.prototype.listenOnce=k.prototype.L,k.prototype.getLastError=k.prototype.Ka,k.prototype.getLastErrorCode=k.prototype.Ba,k.prototype.getStatus=k.prototype.Z,k.prototype.getResponseJson=k.prototype.Oa,k.prototype.getResponseText=k.prototype.oa,k.prototype.send=k.prototype.ea,k.prototype.setWithCredentials=k.prototype.Ha}).apply(typeof he<"u"?he:typeof self<"u"?self:typeof window<"u"?window:{});const di="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(n){this.uid=n}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(n){return n.uid===this.uid}}$.UNAUTHENTICATED=new $(null),$.GOOGLE_CREDENTIALS=new $("google-credentials-uid"),$.FIRST_PARTY=new $("first-party-uid"),$.MOCK_USER=new $("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zt="10.13.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const At=new bi("@firebase/firestore");function K(s,...n){if(At.logLevel<=D.DEBUG){const r=n.map(tn);At.debug(`Firestore (${zt}): ${s}`,...r)}}function Ze(s,...n){if(At.logLevel<=D.ERROR){const r=n.map(tn);At.error(`Firestore (${zt}): ${s}`,...r)}}function Jr(s,...n){if(At.logLevel<=D.WARN){const r=n.map(tn);At.warn(`Firestore (${zt}): ${s}`,...r)}}function tn(s){if(typeof s=="string")return s;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(r){return JSON.stringify(r)}(s)}catch{return s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function en(s="Unexpected state"){const n=`FIRESTORE (${zt}) INTERNAL ASSERTION FAILED: `+s;throw Ze(n),new Error(n)}function Ye(s,n){s||en()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class H extends It{constructor(n,r){super(n,r),this.code=n,this.message=r,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(){this.promise=new Promise((n,r)=>{this.resolve=n,this.reject=r})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(n,r){this.user=r,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${n}`)}}class Yr{getToken(){return Promise.resolve(null)}invalidateToken(){}start(n,r){n.enqueueRetryable(()=>r($.UNAUTHENTICATED))}shutdown(){}}class Qr{constructor(n){this.token=n,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(n,r){this.changeListener=r,n.enqueueRetryable(()=>r(this.token.user))}shutdown(){this.changeListener=null}}class Zr{constructor(n){this.t=n,this.currentUser=$.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(n,r){let a=this.i;const h=w=>this.i!==a?(a=this.i,r(w)):Promise.resolve();let f=new wt;this.o=()=>{this.i++,this.currentUser=this.u(),f.resolve(),f=new wt,n.enqueueRetryable(()=>h(this.currentUser))};const E=()=>{const w=f;n.enqueueRetryable(async()=>{await w.promise,await h(this.currentUser)})},_=w=>{K("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=w,this.auth.addAuthTokenListener(this.o),E()};this.t.onInit(w=>_(w)),setTimeout(()=>{if(!this.auth){const w=this.t.getImmediate({optional:!0});w?_(w):(K("FirebaseAuthCredentialsProvider","Auth not yet detected"),f.resolve(),f=new wt)}},0),E()}getToken(){const n=this.i,r=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(r).then(a=>this.i!==n?(K("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):a?(Ye(typeof a.accessToken=="string"),new ki(a.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const n=this.auth&&this.auth.getUid();return Ye(n===null||typeof n=="string"),new $(n)}}class to{constructor(n,r,a){this.l=n,this.h=r,this.P=a,this.type="FirstParty",this.user=$.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const n=this.T();return n&&this.I.set("Authorization",n),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class eo{constructor(n,r,a){this.l=n,this.h=r,this.P=a}getToken(){return Promise.resolve(new to(this.l,this.h,this.P))}start(n,r){n.enqueueRetryable(()=>r($.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class no{constructor(n){this.value=n,this.type="AppCheck",this.headers=new Map,n&&n.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class io{constructor(n){this.A=n,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(n,r){const a=f=>{f.error!=null&&K("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${f.error.message}`);const E=f.token!==this.R;return this.R=f.token,K("FirebaseAppCheckTokenProvider",`Received ${E?"new":"existing"} token.`),E?r(f.token):Promise.resolve()};this.o=f=>{n.enqueueRetryable(()=>a(f))};const h=f=>{K("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=f,this.appCheck.addTokenListener(this.o)};this.A.onInit(f=>h(f)),setTimeout(()=>{if(!this.appCheck){const f=this.A.getImmediate({optional:!0});f?h(f):K("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const n=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(n).then(r=>r?(Ye(typeof r.token=="string"),this.R=r.token,new no(r.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function so(s){const n=typeof self<"u"&&(self.crypto||self.msCrypto),r=new Uint8Array(s);if(n&&typeof n.getRandomValues=="function")n.getRandomValues(r);else for(let a=0;a<s;a++)r[a]=Math.floor(256*Math.random());return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{static newId(){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=Math.floor(256/n.length)*n.length;let a="";for(;a.length<20;){const h=so(40);for(let f=0;f<h.length;++f)a.length<20&&h[f]<r&&(a+=n.charAt(h[f]%n.length))}return a}}function Oi(s){return s.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo{constructor(n,r,a,h,f,E,_,w,I){this.databaseId=n,this.appId=r,this.persistenceKey=a,this.host=h,this.ssl=f,this.forceLongPolling=E,this.autoDetectLongPolling=_,this.longPollingOptions=w,this.useFetchStreams=I}}class de{constructor(n,r){this.projectId=n,this.database=r||"(default)"}static empty(){return new de("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(n){return n instanceof de&&n.projectId===this.projectId&&n.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pi,T;(T=pi||(pi={}))[T.OK=0]="OK",T[T.CANCELLED=1]="CANCELLED",T[T.UNKNOWN=2]="UNKNOWN",T[T.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",T[T.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",T[T.NOT_FOUND=5]="NOT_FOUND",T[T.ALREADY_EXISTS=6]="ALREADY_EXISTS",T[T.PERMISSION_DENIED=7]="PERMISSION_DENIED",T[T.UNAUTHENTICATED=16]="UNAUTHENTICATED",T[T.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",T[T.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",T[T.ABORTED=10]="ABORTED",T[T.OUT_OF_RANGE=11]="OUT_OF_RANGE",T[T.UNIMPLEMENTED=12]="UNIMPLEMENTED",T[T.INTERNAL=13]="INTERNAL",T[T.UNAVAILABLE=14]="UNAVAILABLE",T[T.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Li([4294967295,4294967295],0);function ze(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(n,r,a=1e3,h=1.5,f=6e4){this.ui=n,this.timerId=r,this.ko=a,this.qo=h,this.Qo=f,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(n){this.cancel();const r=Math.floor(this.Ko+this.zo()),a=Math.max(0,Date.now()-this.Uo),h=Math.max(0,r-a);h>0&&K("ExponentialBackoff",`Backing off for ${h} ms (base delay: ${this.Ko} ms, delay with jitter: ${r} ms, last attempt: ${a} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,h,()=>(this.Uo=Date.now(),n())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(n,r,a,h,f){this.asyncQueue=n,this.timerId=r,this.targetTimeMs=a,this.op=h,this.removalCallback=f,this.deferred=new wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(E=>{})}get promise(){return this.deferred.promise}static createAndSchedule(n,r,a,h,f){const E=Date.now()+a,_=new nn(n,r,E,h,f);return _.start(a),_}start(n){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),n)}skipDelay(){return this.handleDelayElapsed()}cancel(n){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new H(U.CANCELLED,"Operation cancelled"+(n?": "+n:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(n=>this.deferred.resolve(n))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ho(s,n){if(Ze("AsyncQueue",`${n}: ${s}`),Oi(s))return new H(U.UNAVAILABLE,`${n}: ${s}`);throw s}var gi,mi;(mi=gi||(gi={})).ea="default",mi.Cache="cache";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo{constructor(n,r,a,h){this.authCredentials=n,this.appCheckCredentials=r,this.asyncQueue=a,this.databaseInfo=h,this.user=$.UNAUTHENTICATED,this.clientId=ro.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(a,async f=>{K("FirestoreClient","Received user=",f.uid),await this.authCredentialListener(f),this.user=f}),this.appCheckCredentials.start(a,f=>(K("FirestoreClient","Received new app check token=",f),this.appCheckCredentialListener(f,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(n){this.authCredentialListener=n}setAppCheckTokenChangeListener(n){this.appCheckCredentialListener=n}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new H(U.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const n=new wt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),n.resolve()}catch(r){const a=ho(r,"Failed to shutdown persistence");n.reject(a)}}),n.promise}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ni(s){const n={};return s.timeoutSeconds!==void 0&&(n.timeoutSeconds=s.timeoutSeconds),n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yi=new Map;function co(s,n,r,a){if(n===!0&&a===!0)throw new H(U.INVALID_ARGUMENT,`${s} and ${r} cannot be used together.`)}function uo(s){if(s===void 0)return"undefined";if(s===null)return"null";if(typeof s=="string")return s.length>20&&(s=`${s.substring(0,20)}...`),JSON.stringify(s);if(typeof s=="number"||typeof s=="boolean")return""+s;if(typeof s=="object"){if(s instanceof Array)return"an array";{const n=function(a){return a.constructor?a.constructor.name:null}(s);return n?`a custom ${n} object`:"an object"}}return typeof s=="function"?"a function":en()}function fo(s,n){if("_delegate"in s&&(s=s._delegate),!(s instanceof n)){if(n.name===s.constructor.name)throw new H(U.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const r=uo(s);throw new H(U.INVALID_ARGUMENT,`Expected type '${n.name}', but it was: ${r}`)}}return s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(n){var r,a;if(n.host===void 0){if(n.ssl!==void 0)throw new H(U.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=n.host,this.ssl=(r=n.ssl)===null||r===void 0||r;if(this.credentials=n.credentials,this.ignoreUndefinedProperties=!!n.ignoreUndefinedProperties,this.localCache=n.localCache,n.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(n.cacheSizeBytes!==-1&&n.cacheSizeBytes<1048576)throw new H(U.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=n.cacheSizeBytes}co("experimentalForceLongPolling",n.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",n.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!n.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:n.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!n.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ni((a=n.experimentalLongPollingOptions)!==null&&a!==void 0?a:{}),function(f){if(f.timeoutSeconds!==void 0){if(isNaN(f.timeoutSeconds))throw new H(U.INVALID_ARGUMENT,`invalid long polling timeout: ${f.timeoutSeconds} (must not be NaN)`);if(f.timeoutSeconds<5)throw new H(U.INVALID_ARGUMENT,`invalid long polling timeout: ${f.timeoutSeconds} (minimum allowed value is 5)`);if(f.timeoutSeconds>30)throw new H(U.INVALID_ARGUMENT,`invalid long polling timeout: ${f.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!n.useFetchStreams}isEqual(n){return this.host===n.host&&this.ssl===n.ssl&&this.credentials===n.credentials&&this.cacheSizeBytes===n.cacheSizeBytes&&this.experimentalForceLongPolling===n.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===n.experimentalAutoDetectLongPolling&&function(a,h){return a.timeoutSeconds===h.timeoutSeconds}(this.experimentalLongPollingOptions,n.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===n.ignoreUndefinedProperties&&this.useFetchStreams===n.useFetchStreams}}class Mi{constructor(n,r,a,h){this._authCredentials=n,this._appCheckCredentials=r,this._databaseId=a,this._app=h,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new vi({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new H(U.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(n){if(this._settingsFrozen)throw new H(U.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new vi(n),n.credentials!==void 0&&(this._authCredentials=function(a){if(!a)return new Yr;switch(a.type){case"firstParty":return new eo(a.sessionIndex||"0",a.iamToken||null,a.authTokenFactory||null);case"provider":return a.client;default:throw new H(U.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(n.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(r){const a=yi.get(r);a&&(K("ComponentProvider","Removing Datastore"),yi.delete(r),a.terminate())}(this),Promise.resolve()}}function po(s,n,r,a={}){var h;const f=(s=fo(s,Mi))._getSettings(),E=`${n}:${r}`;if(f.host!=="firestore.googleapis.com"&&f.host!==E&&Jr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),s._setSettings(Object.assign(Object.assign({},f),{host:E,ssl:!1})),a.mockUserToken){let _,w;if(typeof a.mockUserToken=="string")_=a.mockUserToken,w=$.MOCK_USER;else{_=Os(a.mockUserToken,(h=s._app)===null||h===void 0?void 0:h.options.projectId);const I=a.mockUserToken.sub||a.mockUserToken.user_id;if(!I)throw new H(U.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");w=new $(I)}s._authCredentials=new Qr(new ki(_,w))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(){this.au=Promise.resolve(),this.uu=[],this.cu=!1,this.lu=[],this.hu=null,this.Pu=!1,this.Iu=!1,this.Tu=[],this.t_=new ao(this,"async_queue_retry"),this.Eu=()=>{const r=ze();r&&K("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()};const n=ze();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Eu)}get isShuttingDown(){return this.cu}enqueueAndForget(n){this.enqueue(n)}enqueueAndForgetEvenWhileRestricted(n){this.du(),this.Au(n)}enterRestrictedMode(n){if(!this.cu){this.cu=!0,this.Iu=n||!1;const r=ze();r&&typeof r.removeEventListener=="function"&&r.removeEventListener("visibilitychange",this.Eu)}}enqueue(n){if(this.du(),this.cu)return new Promise(()=>{});const r=new wt;return this.Au(()=>this.cu&&this.Iu?Promise.resolve():(n().then(r.resolve,r.reject),r.promise)).then(()=>r.promise)}enqueueRetryable(n){this.enqueueAndForget(()=>(this.uu.push(n),this.Ru()))}async Ru(){if(this.uu.length!==0){try{await this.uu[0](),this.uu.shift(),this.t_.reset()}catch(n){if(!Oi(n))throw n;K("AsyncQueue","Operation failed with retryable error: "+n)}this.uu.length>0&&this.t_.Go(()=>this.Ru())}}Au(n){const r=this.au.then(()=>(this.Pu=!0,n().catch(a=>{this.hu=a,this.Pu=!1;const h=function(E){let _=E.message||"";return E.stack&&(_=E.stack.includes(E.message)?E.stack:E.message+`
`+E.stack),_}(a);throw Ze("INTERNAL UNHANDLED ERROR: ",h),a}).then(a=>(this.Pu=!1,a))));return this.au=r,r}enqueueAfterDelay(n,r,a){this.du(),this.Tu.indexOf(n)>-1&&(r=0);const h=nn.createAndSchedule(this,n,r,a,f=>this.Vu(f));return this.lu.push(h),h}du(){this.hu&&en()}verifyOperationInProgress(){}async mu(){let n;do n=this.au,await n;while(n!==this.au)}fu(n){for(const r of this.lu)if(r.timerId===n)return!0;return!1}gu(n){return this.mu().then(()=>{this.lu.sort((r,a)=>r.targetTimeMs-a.targetTimeMs);for(const r of this.lu)if(r.skipDelay(),n!=="all"&&r.timerId===n)break;return this.mu()})}pu(n){this.Tu.push(n)}Vu(n){const r=this.lu.indexOf(n);this.lu.splice(r,1)}}class mo extends Mi{constructor(n,r,a,h){super(n,r,a,h),this.type="firestore",this._queue=function(){return new go}(),this._persistenceKey=(h==null?void 0:h.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||vo(this),this._firestoreClient.terminate()}}function yo(s,n){const r=typeof s=="object"?s:jr(),a=typeof s=="string"?s:"(default)",h=Nr(r,"firestore").getImmediate({identifier:a});if(!h._initialized){const f=Ls("firestore");f&&po(h,...f)}return h}function vo(s){var n,r,a;const h=s._freezeSettings(),f=function(_,w,I,b){return new oo(_,w,I,b.host,b.ssl,b.experimentalForceLongPolling,b.experimentalAutoDetectLongPolling,Ni(b.experimentalLongPollingOptions),b.useFetchStreams)}(s._databaseId,((n=s._app)===null||n===void 0?void 0:n.options.appId)||"",s._persistenceKey,h);s._firestoreClient=new lo(s._authCredentials,s._appCheckCredentials,s._queue,f),!((r=h.localCache)===null||r===void 0)&&r._offlineComponentProvider&&(!((a=h.localCache)===null||a===void 0)&&a._onlineComponentProvider)&&(s._firestoreClient._uninitializedComponentsProvider={_offlineKind:h.localCache.kind,_offline:h.localCache._offlineComponentProvider,_online:h.localCache._onlineComponentProvider})}(function(n,r=!0){(function(h){zt=h})(Br),fe(new Ht("firestore",(a,{instanceIdentifier:h,options:f})=>{const E=a.getProvider("app").getImmediate(),_=new mo(new Zr(a.getProvider("auth-internal")),new io(a.getProvider("app-check-internal")),function(I,b){if(!Object.prototype.hasOwnProperty.apply(I.options,["projectId"]))throw new H(U.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new de(I.options.projectId,b)}(E,h),E);return f=Object.assign({useFetchStreams:r},f),_._setSettings(f),_},"PUBLIC").setMultipleInstances(!0)),_t(di,"4.7.1",n),_t(di,"4.7.1","esm2017")})();const Eo={apiKey:"AIzaSyBfJa-khYyLpSWCDi0wN4pk-HfUPD9T44Y",authDomain:"agustin-b41f3.firebaseapp.com",databaseURL:"https://agustin-b41f3-default-rtdb.firebaseio.com",projectId:"agustin-b41f3",storageBucket:"agustin-b41f3.appspot.com",messagingSenderId:"656045732024",appId:"1:656045732024:web:ca1d0d0703000bca5c444d",measurementId:"G-49D19CTFDH"},_o=Di(Eo);yo(_o);const wo=()=>{const s=[...document.querySelectorAll(".product-container")],n=[...document.querySelectorAll(".nxt-btn")],r=[...document.querySelectorAll(".pre-btn")];s.forEach((a,h)=>{let E=a.getBoundingClientRect().width;n[h].addEventListener("click",()=>{a.scrollLeft+=E}),r[h].addEventListener("click",()=>{a.scrollLeft-=E})})},Ut=(s,n,r)=>{let a=document.querySelector(`${n}`);if(!a){console.error(`Could not find container: ${n}`);return}console.log("Fetched products:",s);const h=s.filter(f=>!Array.isArray(f.images)||f.images.length===0?(console.warn("Product without valid images:",f),!1):!0);if(h.length===0){console.warn("No products with images available to display.");return}a.innerHTML=`
    <section class="product">
        <h2 class="product-category">${r}</h2>
        <button class="pre-btn"><img src="/public/img/arrow.png" alt="Prev"></button>
        <button class="nxt-btn"><img src="/public/img/arrow.png" alt="Next"></button>
        <div class="product-container">
             ${h.map(f=>`
                 <a href="public/pages/product.html?id=${f.id}" class="product-card">
                     <div class="product-image">
                           <img src="${f.images[0]}" class="product-thumb" alt="Product Image">
                           <button class="card-btn" onclick="addToCart('${f.id}')">add to cart</button>
                       </div>
                       <div class="product-info">
                            <h2 class="product-brand">${f.name||"Name not available"}</h2>
                            <p class="product-short-des">${f.shortDes||"Description not available"}</p>
                            <span class="price">$${f.sellPrice||0}</span>
                            <span class="actual-price">$${f.actualPrice||0}</span>
                        </div>
                    </a>
             `).join("")}
            </div>
    </section>
    `,wo()};firebase.firestore().collection("products").get().then(s=>{let n=[];s.forEach(_=>{n.push(_.data())}),console.log("Products fetched from Firebase:",n),n.forEach(_=>{typeof _.tags=="string"?_.tags=_.tags.split(",").map(w=>w.trim()):Array.isArray(_.tags)||(_.tags=[])});const r=n.filter(_=>Array.isArray(_.tags)&&_.tags.length>0&&_.tags.some(w=>w.toLowerCase().includes("men"))),a=n.filter(_=>_.tags&&_.tags.some(w=>w.toLowerCase().includes("shoes"))),h=n.filter(_=>_.tags&&_.tags.some(w=>w.toLowerCase().includes("bestseller"))),f=n.filter(_=>_.tags&&_.tags.some(w=>w.toLowerCase().includes("accessories"))),E=n.filter(_=>_.tags&&_.tags.some(w=>w.toLowerCase().includes("women")));r.length>0&&Ut(r,"#men-tshirt-products","Men"),a.length>0&&Ut(a,"#shoes-products","Shoes"),h.length>0&&Ut(h,"#bestseller-products","bestseller"),f.length>0&&Ut(f,"#accessories-products","Accessories"),E.length>0&&Ut(E,"#women-products","Women")}).catch(s=>console.error("Error fetching products:",s));
