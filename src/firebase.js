// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHOIZIIhZF6HuCsvJ_nWP6Fv30pbSJ6Vk",
  authDomain: "react-disney-6cc36.firebaseapp.com",
  projectId: "react-disney-6cc36",
  storageBucket: "react-disney-6cc36.appspot.com",
  messagingSenderId: "294039339226",
  appId: "1:294039339226:web:fd81cfaa3feb8da14465e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;