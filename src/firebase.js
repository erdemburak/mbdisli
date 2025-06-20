import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoJWBc1q6De1owv3w5Q5e9AMC9EhPT36o",
  authDomain: "mbdisli-cf563.firebaseapp.com",
  projectId: "mbdisli-cf563",
  storageBucket: "mbdisli-cf563.firebasestorage.app",
  messagingSenderId: "662323102446",
  appId: "1:662323102446:web:5e266d5c5b65879a7a69ff",
  measurementId: "G-DRQXWJRZ0V"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 