/*
FIRST STEP: Make the calls to the first API endpoint to get meal plans with the specified queries.
Change data at the following places:
  *1        API key
  **2       Calories per day
  ***3      Dietary requirements (uncomment code out before use)
  ****4     Food intolerances (uncomment code out before use)
  *****5    Swap to this URL when using dietary requirements and/or food intolerances
  ******6   Amend file name to include ${diet} and/or ${exclude} when using these
When you are sure that ALL parts have been changed, then run the file with "node 1-apiCall_mealPlans.js"
*/

const fs = require("fs");
const axios = require("axios");

const apiKey = "API-key-here"; /////////////////////////////////////////////////////////////////////////// *1 

const apiUrl = "https://api.spoonacular.com/mealplanner/generate";

const targetCalories = 2500; // Set the number of calories per day: 1200, 1600, 2000 or 2500 /////////////**2

const timeFrame = "week"; // "week" or "day" (may wish to change to reduce API calls when testing, otherwise keep at "week")

//const diet = 'vegetarian'; // Set the desired diet: "vegetarian" or "vegan" ///////////////////////////***3

//const exclude = "Dairy, Egg, Gluten, Grain, Peanut, Seafood, Sesame, Shellfish, Soy, Sulfite, Tree Nut, Wheat"; // Set the desired allergens as a comma-separated string /////////////////////////////////////////////////////////////////////////////////////////////////****4

const apiUrlWithParams = `${apiUrl}?apiKey=${apiKey}&timeFrame=${timeFrame}&targetCalories=${targetCalories}`;

//const apiUrlWithParams = `${apiUrl}?apiKey=${apiKey}&timeFrame=${timeFrame}&targetCalories=${targetCalories}&diet=${diet}&exclude=${exclude}`; // When calling with different diets and/or allergens, use this url instead //////////////////////////////////////////////////////////////////////////////////////*****5

axios
  .get(apiUrlWithParams)
  .then((response) => {
    if (response.status !== 200) {
      throw new Error("Network response was not OK");
    }
    return response.data;
  })

  .then((data) => {
    const fileName = `mealPlan_${timeFrame}_${targetCalories}cals.json`; // file name must be unique to avoid overwriting existing data (add "vegan / allIntols etc") /////////////////////////////////////////////////////////////////////////////////////////////*****6

    fs.writeFile(fileName, JSON.stringify(data), (err) => {
      if (err) {
        console.error(`Error writing file ${fileName}:`, err);
      } else {
        console.log(`Response saved to ${fileName}`);
      }
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
