import React, { useState } from 'react';
import MedicalReminder from './MedicalReminder';

export default function LifeApp() {
  const [answer, setAnswer] = useState('Your AI-powered answer will appear here.');
  const [feedback, setFeedback] = useState('');

  function handleFeedbackChange(e) {
    setFeedback(e.target.value);
  }

  function handleSubmitFeedback() {
    if (!feedback.trim()) return alert('Please enter feedback before submitting.');
    // Save feedback logic here, e.g., API call or localStorage
    alert('Thanks for your feedback!');
    setFeedback('');
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">LIFE AI Assistant</h1>

      <section className="answer-section bg-white p-5 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-3">Answer:</h2>
        <p className="text-gray-700 mb-4 whitespace-pre-wrap">{answer}</p>

        <div className="feedback mb-6">
          <label htmlFor="feedback" className="block font-medium mb-1">
            Your Feedback:
          </label>
          <textarea
            id="feedback"
            rows="3"
            value={feedback}
            onChange={handleFeedbackChange}
            className="w-full border rounded p-2"
            placeholder="Type your feedback here..."
          />
          <button
            onClick={handleSubmitFeedback}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Submit Feedback
          </button>
        </div>

        <MedicalReminder />
      </section>
    </div>
  );
}
