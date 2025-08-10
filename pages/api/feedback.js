import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { question, answer, rating, comments } = req.body;
    await db.collection("feedback").add({
      question,
      answer,
      rating,
      comments,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).json({ message: "Feedback saved" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Failed to save feedback" });
  }
}
