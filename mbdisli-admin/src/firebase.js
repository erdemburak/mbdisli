// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoJWBc1q6De1owv3w5Q5e9AMC9EhPT36o",
  authDomain: "mbdisli-cf563.firebaseapp.com",
  projectId: "mbdisli-cf563",
  storageBucket: "mbdisli-cf563.firebasestorage.app",
  messagingSenderId: "662323102446",
  appId: "1:662323102446:web:5e266d5c5b65879a7a69ff",
  measurementId: "G-DRQXWJRZ0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };