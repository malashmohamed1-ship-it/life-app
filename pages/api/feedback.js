import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const { question, answer, rating, comments } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    await addDoc(collection(db, 'feedback'), {
      question,
      answer,
      rating,
      comments,
      createdAt: serverTimestamp(),
    });

    return res.status(200).json({ message: 'Feedback stored successfully' });
  } catch (error) {
    console.error('Feedback error:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
