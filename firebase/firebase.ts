// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFYir5fPjiuUNgNndRjW92Upu3xQc-ZtU",
  authDomain: "e-curricular.firebaseapp.com",
  projectId: "e-curricular",
  storageBucket: "e-curricular.appspot.com",
  messagingSenderId: "60302847792",
  appId: "1:60302847792:web:3e5b2dd142c37bd35362f5",
  measurementId: "G-50FN1177P5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut };
