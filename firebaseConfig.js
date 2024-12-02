import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBfJa-khYyLpSWCDi0wN4pk-HfUPD9T44Y",
    authDomain: "agustin-b41f3.firebaseapp.com",
    databaseURL: "https://agustin-b41f3-default-rtdb.firebaseio.com",
    projectId: "agustin-b41f3",
    storageBucket: "agustin-b41f3.appspot.com",
    messagingSenderId: "656045732024",
    appId: "1:656045732024:web:ca1d0d0703000bca5c444d",
    measurementId: "G-49D19CTFDH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };