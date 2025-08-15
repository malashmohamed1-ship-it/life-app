import React, { useState } from 'react';
import MedicalReminder from '../components/MedicalReminder';

export default function Home() {
  const [answer, setAnswer] = useState('Your AI-powered answer will appear here.');
  const [feedback, setFeedback] = useState('');

  function handleFeedbackChange(e) {
    setFeedback(e.target.value);
  }

  function handleSubmitFeedback() {
    if (!feedback.trim()) return alert('Please enter feedback before submitting.');
    alert('Thanks for your feedback!');
    setFeedback('');
  }

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem' }}>LIFE AI Assistant</h1>

      <section style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Answer:</h2>
        <p style={{ whiteSpace: 'pre-wrap', color: '#374151', marginBottom: '1rem' }}>{answer}</p>

        <label htmlFor="feedback" style={{ display: 'block', fontWeight: '600', marginBottom: '0.25rem' }}>
          Your Feedback:
        </label>
        <textarea
          id="feedback"
          rows="3"
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Type your feedback here..."
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '0.5rem' }}
        />

        <button
          onClick={handleSubmitFeedback}
          style={{ backgroundColor: '#16a34a', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', border: 'none' }}
        >
          Submit Feedback
        </button>

        <div style={{ marginTop: '2rem' }}>
          <MedicalReminder />
        </div>
      </section>
    </div>
  );
}
