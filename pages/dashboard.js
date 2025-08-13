// pages/dashboard.js
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // make sure this is your firebase config

export default function Dashboard() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const snapshot = await getDocs(collection(db, "feedback"));
      setFeedback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchFeedback();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Feedback Dashboard</h1>
      {feedback.length === 0 ? (
        <p>No feedback found.</p>
      ) : (
        <ul>
          {feedback.map(item => (
            <li key={item.id}>
              <strong>{item.rating}★</strong> — {item.comment || "(no comment)"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
