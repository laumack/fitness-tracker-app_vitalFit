import { firestore } from "firebase-admin";
import db from "../utils/connection";

export const fetchExercises = async () => {
  const snapshot = await db.collection("exercises").get();
  const exercises = snapshot.docs.map((doc) => doc.data());

  return exercises;
};

export const fetchExercisesByCategory = async (category: string) => {
  const collection: firestore.CollectionReference = db.collection("exercises");
  const query = collection.where("category", "==", category);

  const snapshot = await query.get();
  const exercises = snapshot.docs.map((doc) => doc.data());

  if (exercises.length === 0) {
    return Promise.reject({
      code: 400,
      msg: `No exercises found for category ${category}`,
    });
  }

  return exercises;
};
