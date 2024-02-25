// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBftcxIflTGIDHTVgg6D17xpG_RV4n2ka8",
  authDomain: "kilimanjaro-express.firebaseapp.com",
  projectId: "kilimanjaro-express",
  storageBucket: "kilimanjaro-express.appspot.com",
  messagingSenderId: "773049842430",
  appId: "1:773049842430:web:ca02f7f311fc2e6ee803af",
  measurementId: "G-560053VCE2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);