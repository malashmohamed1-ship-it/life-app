// pages/feedback.js
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from // lib/firebase.js
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
export const db = getFirestore(app);; // <- using the new firebase.js

export default function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      await addDoc(collection(db, 'feedback'), {
        text: feedback,
        createdAt: serverTimestamp(),
      });
      setStatus('✅ Feedback submitted successfully!');
      setFeedback('');
    } catch (error) {
      console.error('Error adding feedback: ', error);
      setStatus('❌ Error submitting feedback.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 p-6 bg-gray-900 rounded-xl shadow-md text-white">
      <h2 className="text-2xl font-bold mb-4">💡 Share Your Feedback</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Your feedback helps us improve LIFE..."
          className="p-3 rounded-lg text-black"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold"
        >
          Submit
        </button>
      </form>
      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
}
