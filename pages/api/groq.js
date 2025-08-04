export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { prompt } = req.body;

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
  return res.status(200).json({ answer: data.choices[0]?.message?.content });
}
