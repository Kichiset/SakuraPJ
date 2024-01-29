// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8DVvoY8uINN7GYIPSy5mjBWNVVgjAsss",
  authDomain: "ferrytimetable-8e728.firebaseapp.com",
  projectId: "ferrytimetable-8e728",
  storageBucket: "ferrytimetable-8e728.appspot.com",
  messagingSenderId: "905324145495",
  appId: "1:905324145495:web:d85eca9491b9b92bd3ac12",
  measurementId: "G-SH3QWV6SW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);