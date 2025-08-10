import admin from "firebase-admin";

// ✅ Prevent re-initializing on Vercel hot reloads
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { question, answer, rating, comments } = req.body;

  if (!question || !answer || !rating) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const docRef = await db.collection("feedback").add({
      question,
      answer,
      rating,
      comments: comments || "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({
      message: "✅ Feedback submitted successfully",
      id: docRef.id,
    });
  } catch (error) {
    console.error("❌ Error writing feedback:", error);
    return res.status(500).json({ message: "Error saving feedback" });
  }
}
