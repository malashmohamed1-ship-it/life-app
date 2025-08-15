import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    if (!feedback.trim()) {
      setStatus('❌ Feedback cannot be empty.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'feedback'), {
        text: feedback.trim(),
        createdAt: serverTimestamp(),
      });
      console.log('✅ Feedback saved with ID:', docRef.id);
      setStatus('✅ Feedback submitted successfully!');
      setFeedback('');
    } catch (error) {
      console.error('❌ Firestore Error:', error);
      setStatus(`❌ Submission failed: ${error.message}`);
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
      <p className="mt-2 text-xs text-gray-400">
        Check your browser console for detailed logs.
      </p>
    </div>
  );
}
