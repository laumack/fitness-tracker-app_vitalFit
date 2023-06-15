import fs from "fs";
import axios, { AxiosResponse } from "axios";

const apiKey: string = "API-key-here";
const apiUrl: string = "https://api.spoonacular.com/mealplanner/generate";
const targetCalories: number = 2500;
const timeFrame: string = "week";
// const diet: string = 'vegetarian'; // Set the desired diet: "vegetarian" or "vegan"
// const exclude: string = "Dairy, Egg, Gluten, Grain, Peanut, Seafood, Sesame, Shellfish, Soy, Sulfite, Tree Nut, Wheat";
const apiUrlWithParams: string = `${apiUrl}?apiKey=${apiKey}&timeFrame=${timeFrame}&targetCalories=${targetCalories}`;
// const apiUrlWithParams: string = `${apiUrl}?apiKey=${apiKey}&timeFrame=${timeFrame}&targetCalories=${targetCalories}&diet=${diet}&exclude=${exclude}`;

interface ApiResponse {
  data: any;
}

axios
  .get<ApiResponse>(apiUrlWithParams)
  .then((response: AxiosResponse<ApiResponse>) => {
    if (response.status !== 200) {
      throw new Error("Network response was not OK");
    }
    return response.data;
  })
  .then((data: any) => {
    const fileName: string = `mealPlan_${timeFrame}_${targetCalories}cals.json`;

    fs.writeFile(
      fileName,
      JSON.stringify(data),
      (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.error(`Error writing file ${fileName}:`, err);
        } else {
          console.log(`Response saved to ${fileName}`);
        }
      }
    );
  })
  .catch((error: Error) => {
    console.error("Error:", error);
  });
