import fs from "fs";

interface Meal {
  title: string;
  [key: string]: any;
}

interface DayPlan {
  meals: Meal[];
  [key: string]: any;
}

interface MealPlan {
  [key: string]: DayPlan;
}

function readJSONFile(filePath: string): { week: MealPlan } {
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
}

function extractTitles(mealPlan: MealPlan): string[] {
  const allTitles: string[] = [];

  Object.values(mealPlan).forEach((day: DayPlan) => {
    const titles = day.meals.map((meal: Meal) => meal.title);
    allTitles.push(...titles);
  });

  return allTitles;
}

function processJSONFile(): void {
  const filePath: string = "mealPlan_week_2500cals.json";

  const mealPlan: MealPlan = readJSONFile(filePath).week;
  const titles: string[] = extractTitles(mealPlan);

  console.log("Recipe titles:", titles);

  const titlesFileContent: string = JSON.stringify(titles);
  fs.writeFile(
    "recipeTitles_week_2500cals.json",
    titlesFileContent,
    (err: NodeJS.ErrnoException | null) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("Recipe titles saved to recipeTitles.json");
      }
    }
  );
}

processJSONFile();
