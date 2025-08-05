import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [thinking, setThinking] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleAsk = async () => {
    setThinking(true);
    const res = await fetch("/api/groq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setResponse(data.answer);
    setThinking(false);
  };

  const handleFeedback = async () => {
    const feedback = {
      question: input,
      answer: response,
      rating,
      comments,
    };

    console.log("Feedback submitted:", feedback);
    setRating(0);
    setComments("");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">LIFE</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What’s your problem today?"
        className="w-full max-w-xl p-4 border rounded mb-4"
      />
      <button
        onClick={handleAsk}
        className="bg-blue-600 text-white px-6 py-2 rounded w-full max-w-xl mb-4"
      >
        Ask LIFE
      </button>

      {thinking && <p className="mt-2 text-gray-500">Thinking...</p>}

      {response && (
        <div
          className="mt-4 p-4 bg-white border rounded shadow max-w-xl w-full whitespace-pre-line leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: response
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\n/g, "<br>"),
          }}
        ></div>
      )}

      {response && (
        <div className="mt-6 max-w-xl w-full">
          <p className="mb-2 font-medium">Was this helpful?</p>
          <div className="flex space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-xl ${
                  rating >= star ? "text-yellow-500" : "text-gray-400"
                }`}
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
            onClick={handleFeedback}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Feedback
          </button>
        </div>
      )}
    </main>
  );
}
