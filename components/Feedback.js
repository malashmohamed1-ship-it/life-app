import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Feedback({ answer }) {
  const [showPopup, setShowPopup] = useState(false);
  const [thumb, setThumb] = useState(null);
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reasons = ["Too short", "Too long", "Not helpful", "Loved it"];

  const handleFeedback = async () => {
    try {
      await addDoc(collection(db, "feedback"), {
        answer,
        thumb,
        reason,
        timestamp: new Date()
      });
      setSubmitted(true);
      setTimeout(() => setShowPopup(false), 1500);
    } catch (err) {
      console.error("Error sending feedback:", err);
    }
  };

  if (submitted) return <p className="text-green-600 text-sm">✅ Thank you!</p>;

  return (
    <div className="mt-2">
      <div className="flex gap-3 text-lg">
        <button onClick={() => { setThumb("up"); setShowPopup(true); }}>👍</button>
        <button onClick={() => { setThumb("down"); setShowPopup(true); }}>👎</button>
      </div>

      {showPopup && (
        <div className="p-3 border rounded bg-gray-100 mt-2">
          <p className="text-sm mb-2">Why?</p>
          <div className="flex flex-col gap-1">
            {reasons.map((r) => (
              <button
                key={r}
                className={`p-1 border rounded ${reason === r ? "bg-blue-200" : ""}`}
                onClick={() => setReason(r)}
              >
                {r}
              </button>
            ))}
            <textarea
              placeholder="Other..."
              className="p-1 border rounded mt-1"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white p-1 rounded mt-2"
              onClick={handleFeedback}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
