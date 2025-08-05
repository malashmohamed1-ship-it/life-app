import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [thinking, setThinking] = useState(false);

  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleAsk = async () => {
    setThinking(true);
    setResponse("");
    setFeedbackGiven(false);
    setRating(0);
    setComments("");

    const res = await fetch("/api/groq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setResponse(data.answer);
    setThinking(false);
  };

  const handleFeedbackSubmit = async () => {
    console.log("Feedback submitted:", {
      question: input,
      answer: response,
      rating,
      comments,
    });
    setFeedbackGiven(true);
    setRating(0);
    setComments("");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4">LIFE</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What’s your problem today?"
        className="w-full max-w-xl p-4 border rounded mb-2"
      />

      <button
        onClick={handleAsk}
        className="bg-blue-600 text-white px-6 py-2 rounded w-full max-w-xl"
      >
        Ask LIFE
      </button>

      {thinking && <p className="mt-2 text-gray-500">Thinking...</p>}

      {response && (
        <div className="mt-4 p-4 bg-white border rounded shadow max-w-xl w-full">
          <p>{response}</p>
        </div>
      )}

      {response && !feedbackGiven && (
        <div className="mt-4 max-w-xl w-full bg-white border rounded p-4 shadow">
          <p className="mb-2 font-medium">Was this helpful?</p>
          <div className="flex gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            placeholder="Any comments or suggestions?"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handleFeedbackSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Feedback
          </button>
        </div>
      )}

      {feedbackGiven && (
        <p className="mt-2 text-green-600 font-medium">Thanks for your feedback! 💚</p>
      )}
    </main>
  );
}
