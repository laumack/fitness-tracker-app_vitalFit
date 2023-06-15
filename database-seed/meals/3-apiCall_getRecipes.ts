import fs from "fs";
import axios, { AxiosResponse } from "axios";

const apiKey: string = "API-key-here";

function readJSONFile(filePath: string): any[] {
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
}

interface ApiResponse {
  results: any[];
}

async function makeAPICall(title: string): Promise<ApiResponse | null> {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&minCalories=0&titleMatch=${encodeURIComponent(
    title
  )}`;

  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error making API call for "${title}":`, error);
    return null;
  }
}

async function processRecipeTitles(): Promise<void> {
  const filePath: string = "recipeTitles_week_2500cals.json";

  const titles: any[] = readJSONFile(filePath);

  const results: any[] = [];

  for (const title of titles) {
    const data: ApiResponse | null = await makeAPICall(title);
    if (data) {
      results.push(data.results[0]);
    }
  }

  const resultsFileContent: string = JSON.stringify(results);
  fs.writeFile(
    "recipes_weel_2500cals.json",
    resultsFileContent,
    (err: NodeJS.ErrnoException | null) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("Recipe results saved to json file");
      }
    }
  );
}

processRecipeTitles();
