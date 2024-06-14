// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "webblog-ac7df.firebaseapp.com",
  projectId: "webblog-ac7df",
  storageBucket: "webblog-ac7df.appspot.com",
  messagingSenderId: "1052859383848",
  appId: "1:1052859383848:web:aa31bd1b948fec5839351d",
  measurementId: "G-3KFSD47VWX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
