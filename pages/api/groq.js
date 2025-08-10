import { dbAdmin } from '../../lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { prompt, rating, comments } = req.body;

  try {
    // 1️⃣ Call Groq API for AI answer
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: "You are LIFE, a helpful assistant offering clear, practical advice in everyday language." },
          { role: 'user', content: prompt },
        ],
      }),
    });

    const data = await groqRes.json();
    const answer = data.choices[0]?.message?.content;

    // 2️⃣ Save the Q&A in Firestore
    const docRef = await dbAdmin.collection('feedback').add({
      question: prompt,
      answer,
      rating: rating ?? null, // Optional
      comments: comments ?? null, // Optional
      timestamp: new Date().toISOString(),
    });

    // 3️⃣ Return the AI answer + Firestore ID
    return res.status(200).json({
      answer,
      feedbackId: docRef.id,
    });

  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ message: 'Error processing request' });
  }
}
