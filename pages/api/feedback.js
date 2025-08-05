import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { question, answer, rating, comments } = req.body;

  try {
    const docRef = await addDoc(collection(db, 'feedback'), {
      question,
      answer,
      rating,
      comments,
      timestamp: new Date().toISOString()
    });
    res.status(200).json({ message: 'Feedback submitted', id: docRef.id });
  } catch (err) {
    console.error('Error writing feedback:', err);
    res.status(500).json({ message: 'Error saving feedback' });
  }
}
