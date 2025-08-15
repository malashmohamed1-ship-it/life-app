// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config
const firebaseConfig = {
  apiKey: AIzaSyAG-iJcrjxtwDP-u65kM7MOKUvabE4_KJI,
  authDomain: life-app-752db.firebaseapp.com,
  projectId: life-app-752db,
  storageBucket: life-app-752db.firebasestorage.app,
  messagingSenderId: 532680973641,
  appId: 1:532680973641:web:e27b88f43175894d808e98,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);
