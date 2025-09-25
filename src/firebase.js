// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuE572n7gYxFYiWuC0M91KFntIKiQQ33c",
  authDomain: "shift-schedule-cfe54.firebaseapp.com",
  projectId: "shift-schedule-cfe54",
  storageBucket: "shift-schedule-cfe54.firebasestorage.app",
  messagingSenderId: "900645873058",
  appId: "1:900645873058:web:fb73b065bab3ee16f1befb",
  measurementId: "G-0561R0FVER"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
