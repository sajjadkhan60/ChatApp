// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFm6EBcrBzxarXz6auzxfvIrE4Xw7TEfc",
  authDomain: "react-chat-30452.firebaseapp.com",
  projectId: "react-chat-30452",
  storageBucket: "react-chat-30452.appspot.com",
  messagingSenderId: "204053307920",
  appId: "1:204053307920:web:a51a72863e2a7c73082095",
  measurementId: "G-2SCTVDP2Y3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
