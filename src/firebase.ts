// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import getFirestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBanfswXrBDOwnWfqghThSJLMOZQ1sSmjI",
  authDomain: "ai-iam-buddy.firebaseapp.com",
  projectId: "ai-iam-buddy",
  storageBucket: "ai-iam-buddy.firebasestorage.app",
  messagingSenderId: "24229339146",
  appId: "1:24229339146:web:1c22846914a9ba2ac5fff3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get Firestore instance

export { db }; // Export db