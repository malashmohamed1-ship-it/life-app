import React, { useState, useEffect } from 'react';

export default function MedicalReminder() {
  const [meds, setMeds] = useState(() => {
    const saved = localStorage.getItem('medications');
    return saved ? JSON.parse(saved) : [];
  });
  const [newMed, setNewMed] = useState({ name: '', time: '' });

  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(meds));
  }, [meds]);

  function handleAdd() {
    if (!newMed.name || !newMed.time) return;
    setMeds([...meds, { ...newMed, id: Date.now() }]);
    setNewMed({ name: '', time: '' });
  }

  function handleRemove(id) {
    setMeds(meds.filter(med => med.id !== id));
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', maxWidth: '400px', background: 'white' }}>
      <h3 style={{ marginBottom: '0.75rem' }}>Medical Reminders</h3>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Medication or Appointment"
          value={newMed.name}
          onChange={e => setNewMed({ ...newMed, name: e.target.value })}
          style={{ flexGrow: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="time"
          value={newMed.time}
          onChange={e => setNewMed({ ...newMed, time: e.target.value })}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          onClick={handleAdd}
          style={{ backgroundColor: '#2563eb', color: 'white', borderRadius: '4px', padding: '0 0.75rem', cursor: 'pointer' }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {meds.length === 0 && <li style={{ color: '#666' }}>No reminders set.</li>}
        {meds.map(med => (
          <li key={med.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0' }}>
            <span>{med.name} — <time>{med.time}</time></span>
            <button
              onClick={() => handleRemove(med.id)}
              style={{ color: '#dc2626', cursor: 'pointer', border: 'none', background: 'none', fontWeight: 'bold' }}
              aria-label={`Remove reminder for ${med.name}`}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
