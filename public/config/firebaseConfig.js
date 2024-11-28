import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC5uyqo0LpGUK8iswpW0VfuBqCiTvlwp7E",
  authDomain: "agustin-b41f3.firebaseapp.com",
  projectId: "agustin-b41f3",
  storageBucket: "agustin-b41f3.appspot.com",
  messagingSenderId: "656045732024",
  appId: "1:656045732024:web:05d1364ed65b49645c444d",
  measurementId: "G-3E6EL0EVWY"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);