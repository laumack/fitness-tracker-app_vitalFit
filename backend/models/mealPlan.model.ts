import { firestore } from "firebase-admin";
import db from "../utils/connection";

export const fetchMealPlan = async (planName: string) => {
  const docRef: firestore.DocumentReference = db
    .collection("mealplans")
    .doc(planName);

  const doc = await docRef.get();
  if (!doc.exists) {
    return Promise.reject({
      code: 400,
      msg: `No recipe found for meal ${planName}`,
    });
  } else {
    return doc.data();
  }
};
