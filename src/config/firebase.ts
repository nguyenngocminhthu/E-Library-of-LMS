// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCG4WzqVz4YEh5yqhFxDQEo3wQF7u0PPmw",
  authDomain: "e-library-of-lms.firebaseapp.com",
  projectId: "e-library-of-lms",
  storageBucket: "e-library-of-lms.appspot.com",
  messagingSenderId: "335036923418",
  appId: "1:335036923418:web:bcbe5a5ab51d78d6ed5ba3",
  measurementId: "G-42995MDMZY",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
