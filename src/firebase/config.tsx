import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu6DX1lmAgmRjkPd_NNbTVzZmLFrPhypI",
  authDomain: "trivia-titans-c9231.firebaseapp.com",
  projectId: "trivia-titans-c9231",
  storageBucket: "trivia-titans-c9231.firebasestorage.app",
  messagingSenderId: "413410876949",
  appId: "1:413410876949:web:12480c38e854af892ff81c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, db };
