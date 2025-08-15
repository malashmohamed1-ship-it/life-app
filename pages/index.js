
import React, { useState } from "react";
import DarkModeToggle from "../components/DarkModeToggle";
import MedicalReminder from "../components/MedicalReminder";
import Toast from "../components/Toast";

export default function Home() {
  const [answer, setAnswer] = useState("Your AI-powered answer will appear here.");
  const [feedback, setFeedback] = useState("");
  const [toast, setToast] = useState(null);

  function submitFeedback() {
    const val = feedback.trim();
    if (!val) {
      setToast({ title: "Please add feedback first" });
      return;
    }
    // TODO: hook up to your /api/feedback if desired
    setFeedback("");
    setToast({ title: "Feedback received", subtitle: "Thanks for helping improve LIFE" });
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-950 transition">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              LIFE
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fast, grounded answers that remember and act.
            </p>
          </div>
          <DarkModeToggle />
        </div>

        <section className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-5 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Answer</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {answer}
            </p>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
              Your Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              placeholder="Type your feedback here..."
              className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={submitFeedback}
              className="mt-2 inline-flex items-center rounded-xl px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium transition"
            >
              Submit Feedback
            </button>
          </div>

          <div className="mt-6">
            <MedicalReminder onToast={setToast} />
          </div>
        </section>

        <footer className="text-xs text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} LIFE. Built for speed, memory, and clarity.
        </footer>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </main>
  );
}
