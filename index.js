
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [thinking, setThinking] = useState(false);

  const handleAsk = async () => {
    setThinking(true);
    const res = await fetch("/api/groq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setResponse(data.reply);
    setThinking(false);
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
        <div className="mt-4 p-4 bg-white border rounded shadow max-w-xl">
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
