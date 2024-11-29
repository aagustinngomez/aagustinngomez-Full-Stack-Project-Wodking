// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfJa-khYyLpSWCDi0wN4pk-HfUPD9T44Y",
  authDomain: "agustin-b41f3.firebaseapp.com",
  databaseURL: "https://agustin-b41f3-default-rtdb.firebaseio.com",
  projectId: "agustin-b41f3",
  storageBucket: "agustin-b41f3.firebasestorage.app",
  messagingSenderId: "656045732024",
  appId: "1:656045732024:web:ca1d0d0703000bca5c444d",
  measurementId: "G-49D19CTFDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);