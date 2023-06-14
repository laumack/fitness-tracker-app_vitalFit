/*
SECOND STEP: Extract the meal titles from the meal plan data.
Change data at the following places:
  *1    Replace with the path to the mealPlan file created in step one
  **2   Amend the file name to ensure that previous data is not overwritten
When you are sure that ALL parts have been changed, then run the file with "node 2-get_recipe_titles.js"
*/

const fs = require("fs");

function readJSONFile(filePath) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

function extractTitles(mealPlan) {
  const allTitles = [];

  Object.values(mealPlan).forEach((day) => {
    const titles = day.meals.map((meal) => meal.title);
    allTitles.push(...titles);
  });

  return allTitles;
}

function processJSONFile() {
  const filePath = "mealPlan_week_1200cals_allIntols.json"; ////////////////////////////////////////// *1

  const mealPlan = readJSONFile(filePath).week;
  const titles = extractTitles(mealPlan);

  console.log("Recipe titles:", titles);

  const titlesFileContent = JSON.stringify(titles);
  fs.writeFile(
    "recipeTitles_week_1200cals_allIntols.json", /////////////////////////////////////////////////// **2
    titlesFileContent,
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("Recipe titles saved to recipeTitles.json");
      }
    }
  );
}

processJSONFile();
