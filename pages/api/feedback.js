import admin from "firebase-admin";

if (!admin.apps.length) {
  // Initialize Firebase Admin SDK only once
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Private key must replace escaped newlines
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { question, answer, rating, comments } = req.body;

  if ((!rating && rating !== 0) || !answer || !question) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await db.collection("feedback").add({
      question,
      answer,
      rating,
      comments: comments || "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: "Feedback saved successfully" });
  } catch (error) {
    console.error("Firestore feedback error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
