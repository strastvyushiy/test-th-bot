// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9Axetej843-StZLQN5eB1oaPoW9MhXgQ",
  authDomain: "db-test-avito.firebaseapp.com",
  projectId: "db-test-avito",
  storageBucket: "db-test-avito.appspot.com",
  messagingSenderId: "378374314903",
  appId: "1:378374314903:web:48d7660628eb85420d02d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);