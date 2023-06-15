import { firestore } from "firebase-admin";
import db from "../utils/connection";

export const fetchRecipeByMealId = async (mealId: string) => {
  const docRef: firestore.DocumentReference = db.collection("recipes").doc(mealId);

  const doc = await docRef.get();
  if (!doc.exists) {
    return Promise.reject({
      code: 400,
      msg: `No recipe found for meal ${mealId}`,
    });
  } else {
    return doc.data();
  }
};