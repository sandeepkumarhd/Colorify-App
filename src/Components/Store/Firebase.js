// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYP0Hms7ET2_zb69Q0KOqDvaS4YBomgDw",
  authDomain: "color-picker-ee145.firebaseapp.com",
  databaseURL: "https://color-picker-ee145-default-rtdb.firebaseio.com",
  projectId: "color-picker-ee145",
  storageBucket: "color-picker-ee145.appspot.com",
  messagingSenderId: "129558562159",
  appId: "1:129558562159:web:d1fc10633b5d0e1d35949a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
