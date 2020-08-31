import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";



let firebaseConfig = {
  apiKey: "AIzaSyCjRapHo4D6PAPgEzU6qW32nGL5JnfRUTg",
  authDomain: "e-commerce-web-app-2f4fa.firebaseapp.com",
  databaseURL: "https://e-commerce-web-app-2f4fa.firebaseio.com",
  projectId: "e-commerce-web-app-2f4fa",
  storageBucket: "e-commerce-web-app-2f4fa.appspot.com",
  messagingSenderId: "948086106591",
  appId: "1:948086106591:web:d9045b3b9ce6e3a9677c6a",
  measurementId: "G-V8RG6F3VQL",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize storage
const storageApp = firebase.storage();
// initialize database
const db = firebase.firestore();
// initialize authentification
const auth = firebase.auth();
// provide the google authentification
const provider = new firebase.auth.GoogleAuthProvider();
// create an auto timestam extention
const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp();


export { auth, provider, firebaseTimestamp, storageApp };
export default db;
