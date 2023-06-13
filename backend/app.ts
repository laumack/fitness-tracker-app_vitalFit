import express from "express";
import db from "./utils/connection";

const app = express();
const port = 3009;

app.get("/api/exercises", async (req, res) => {
  const exerciseRef = db.collection("exercises");
  const snapshot = await exerciseRef.get();

  if (snapshot.empty) {
    console.log("No matching exercises.");
    res.status(404).send("No exercises found");
    return;
  }

  const exercises: FirebaseFirestore.DocumentData[] = [];
  snapshot.forEach((doc) => {
    exercises.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json(exercises);
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
