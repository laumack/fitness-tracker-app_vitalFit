import dotenv from "dotenv";
import fetch from "node-fetch";
import fs from "fs";

dotenv.config();

async function getRecipeById(id: number): Promise<any | null> {
  const url = `https://api.spoonacular.com/recipes/${id}/information`;
  const params = new URLSearchParams({
    apiKey: process.env.API_KEY || "",
  });

  const response = await fetch(`${url}?${params}`);

  if (response.ok) {
    const recipe = await response.json();
    return recipe;
  } else {
    console.log("HTTP-Error: " + response.status);
    return null;
  }
}

async function fetchMultipleRecipes(num: number): Promise<void> {
  const recipes: any[] = [];
  for (let i = 0; i < num; i++) {
    const id = Math.floor(Math.random() * 1000000) + 1;
    const recipe = await getRecipeById(id);
    if (recipe !== null) {
      recipes.push(recipe);
    }
  }

  fs.writeFileSync("./meals/recipes.json", JSON.stringify(recipes, null, 2));
}

fetchMultipleRecipes(100);
