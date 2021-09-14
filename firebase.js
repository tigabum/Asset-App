// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import * as firebase from 'firebase';
import "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";

//import "firebase/functions";
//import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2W7GudPgB7xtxQtoa4nTdYjRRmgP3aPk",
  authDomain: "secondnativeapp.firebaseapp.com",
  projectId: "secondnativeapp",
  storageBucket: "secondnativeapp.appspot.com",
  messagingSenderId: "592640286134",
  appId: "1:592640286134:web:5027f529607c76a67f3517",
  measurementId: "G-BDX5SLN3D9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore()
export default db;

// const analytics = getAnalytics(app);