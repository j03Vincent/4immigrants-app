// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjH_bFaqc5wXFWZcfuHwsQiRKFHMJG4po",
    authDomain: "tft-4immigrants.firebaseapp.com",
    projectId: "tft-4immigrants",
    storageBucket: "tft-4immigrants.appspot.com",
    messagingSenderId: "1067645265772",
    appId: "1:1067645265772:web:da3dec2e4869567d923549"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore(app);