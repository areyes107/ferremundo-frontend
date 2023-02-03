// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY1XCe_WaZvFhor0s9VnrhcMTH_tn0iQA",
  authDomain: "ferremundo-6bfb3.firebaseapp.com",
  projectId: "ferremundo-6bfb3",
  storageBucket: "ferremundo-6bfb3.appspot.com",
  messagingSenderId: "1086266597418",
  appId: "1:1086266597418:web:709b9f043f5daaf2e66353",
  measurementId: "G-BJC5G5N5F0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
