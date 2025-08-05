import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [thinking, setThinking] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleAsk = async () => {
    setThinking(true);
    setResponse("");
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
    // You can send this to a backend or external storage later
  };

  const renderFormattedResponse = (text) => {
    const lines = text.split(/\n+/).filter(Boolean);
    return lines.map((line, index) => (
      <p key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}></p>
    ));
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
        className="bg-blue-600 text-white px-6 py-2 rounded w-full max-w-xl mb-4"
      >
        Ask LIFE
      </button>
      {thinking && <p className="mt-2 text-gray-500">Thinking...</p>}
      {response && (
        <div className="mt-4 p-4 bg-white border rounded shadow max-w-xl w-full">
          <div>{renderFormattedResponse(response)}</div>

          <div className="mt-4">
            <p className="mb-1">Was this helpful?</p>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setRating(num)}
                  className={`text-2xl ${rating >= num ? "text-yellow-500" : "text-gray-400"}`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Any comments or suggestions?"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleFeedback}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
