/*
THIRD STEP: Make the calls to the second API endpoint to get the detailed meal data.
Change data at the following places:
  *1     API key
  **2    Change this to the file name that was created in step two
  ***3   Amend the file name to ensure that previous data is not overwritten
When you are sure that ALL parts have been changed, then run the file with "node 1-apiCall_mealPlans.js".
When all steps are completed, the "recipeTitles..." file created in step two can be deleted.
*/

const fs = require("fs");
const axios = require("axios");

const apiKey = "API-key-here"; // *1 

function readJSONFile(filePath) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

async function makeAPICall(title) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&minCalories=0&titleMatch=${encodeURIComponent(title)}`; // Must keep minCalories = 0 otherwise calorie information will not be returned

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error making API call for "${title}":`, error.message);
    return null;
  }
}

async function processRecipeTitles() {
  const filePath = "recipeTitles_week_1200cals.json"; // **2

  const titles = readJSONFile(filePath);

  const results = [];

  for (const title of titles) {
    const data = await makeAPICall(title);
    if (data) {
      results.push(data.results[0]);
    }
  }

  const resultsFileContent = JSON.stringify(results);
  fs.writeFile("recipes_week_1200cals.json", resultsFileContent, (err) => { // ***3
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Recipe results saved to json file");
    }
  });
}

processRecipeTitles();
