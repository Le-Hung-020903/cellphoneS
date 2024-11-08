// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "shopmobile-d2b11.firebaseapp.com",
  projectId: "shopmobile-d2b11",
  storageBucket: "shopmobile-d2b11.appspot.com",
  messagingSenderId: "881528697011",
  appId: "1:881528697011:web:f9cd51c92582f68c0400c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
