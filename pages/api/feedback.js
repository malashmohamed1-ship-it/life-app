import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { feedback, userId } = JSON.parse(req.body);
      await addDoc(collection(db, "feedback"), {
        feedback,
        userId: userId || null,
        createdAt: serverTimestamp()
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
