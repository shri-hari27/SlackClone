import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO3EwKSepAqc8elE8JGz3-rpHdhMpT-9I",
  authDomain: "slack-clone0-fa11d.firebaseapp.com",
  projectId: "slack-clone0-fa11d",
  storageBucket: "slack-clone0-fa11d.appspot.com",
  messagingSenderId: "866579881361",
  appId: "1:866579881361:web:d3de4e890b1b5eff8e8e30",
  measurementId: "G-6KJPYJ0SQ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
