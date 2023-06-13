import dotenv from "dotenv";
import fetch from "node-fetch";
import * as admin from "firebase-admin";

dotenv.config();

const serviceAccount = require("./login.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

interface FetchResult {
  success: boolean;
  data: any | null;
}

async function getRecipeById(id: number): Promise<FetchResult> {
  const url = `https://api.spoonacular.com/recipes/${id}/information`;
  const params = new URLSearchParams({
    apiKey: process.env.API_KEY || "",
  });

  const response = await fetch(`${url}?${params}`);

  if (response.ok) {
    const recipe = await response.json();
    return { success: true, data: recipe };
  } else {
    return { success: false, data: null };
  }
}

async function fetchMultipleRecipes(num: number): Promise<void> {
  for (let i = 0; i < num; i++) {
    const id = Math.floor(Math.random() * 1000000) + 1;
    const result = await getRecipeById(id);
    if (result.success) {
      console.log(result.data.id);
      db.collection("meals")
        .doc(result.data.id.toString())
        .set(result.data)
        .then(() => {
          console.log(`Meal ID ${id} was successfully added.`);
        })
        .catch((err) => {
          console.log(`Error adding user: ${err}`);
        });
    } else {
      console.log(`Meal ID ${id} failed to be added.`);
    }
  }
}

fetchMultipleRecipes(100);
