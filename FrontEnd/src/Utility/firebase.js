// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from 'firebase/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCriKkcSfnO0tqFMtRoAYXQ2bzwk0Ias5M",
  authDomain: "clone-b4458.firebaseapp.com",
  projectId: "clone-b4458",
  storageBucket: "clone-b4458.firebasestorage.app",
  messagingSenderId: "1038418513929",
  appId: "1:1038418513929:web:1bd6bde826276add21e8d8",
  measurementId: "G-1R98E5Z07B",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
