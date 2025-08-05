const docRef = await addDoc(collection(db, "feedback"), {
  question,
  answer,
  rating,
  comments,
  createdAt: new Date().toISOString(),
});
