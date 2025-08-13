// MedicalReminder.js
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
    <div className="medical-reminder p-4 border rounded bg-white shadow-sm max-w-md">
      <h3 className="text-lg font-semibold mb-3">Medical Reminders</h3>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Medication or Appointment"
          value={newMed.name}
          onChange={e => setNewMed({ ...newMed, name: e.target.value })}
          className="flex-grow border p-2 rounded"
        />
        <input
          type="time"
          value={newMed.time}
          onChange={e => setNewMed({ ...newMed, time: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <ul>
        {meds.length === 0 && <li className="text-gray-500">No reminders set.</li>}
        {meds.map(med => (
          <li key={med.id} className="flex justify-between items-center py-1">
            <span>{med.name} — <time>{med.time}</time></span>
            <button
              onClick={() => handleRemove(med.id)}
              className="text-red-500 hover:text-red-700 font-bold"
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
