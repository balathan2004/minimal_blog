// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbJMasVNEjPiOENqVe8lxoPHR7sYCyYsM",
  authDomain: "minimal-blog-99699.firebaseapp.com",
  projectId: "minimal-blog-99699",
  storageBucket: "minimal-blog-99699.appspot.com",
  messagingSenderId: "687239234051",
  appId: "1:687239234051:web:5ada35e185c43c18970436"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore=getFirestore(app);
const storage = getStorage(app);
const auth=getAuth(app);

export { app, firestore, storage,auth };