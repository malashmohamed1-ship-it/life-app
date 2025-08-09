import { dbAdmin } from '../../lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { question, answer, rating, comments } = req.body;

  try {
    const docRef = await dbAdmin.collection('feedback').add({
      question,
      answer,
      rating,
      comments,
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({ message: 'Feedback submitted', id: docRef.id });
  } catch (error) {
    console.error('Error writing feedback:', error);
    res.status(500).json({ message: 'Error saving feedback' });
  }
}
