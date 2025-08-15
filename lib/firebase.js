// lib/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: AIzaSyAG-iJcrjxtwDP-u65kM7MOKUvabE4_KJI,
  authDomain: life-app-752db.firebaseapp.com,
  projectId: life-app-752db,
  storageBucket: life-app-752db.firebasestorage.app,
  messagingSenderId: 532680973641,
  appId: 1:532680973641:web:e27b88f43175894d808e98,
};

// Prevent initializing more than once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Export Firestore
export const db = getFirestore(app);
