import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { fetchMealPlan } from "../apis/api";

interface MealPlanData {
  meals: Array<object>;
  nutrients: {
    calories: number;
  };
}

const MealPlan: React.FC = () => {
  const [mealPlan, setMealPlan] = useState<MealPlanData[]>([]);
  const [planCalories, setPlanCalories] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let calorieRequirement: number = 1600; // data from CALCULATION RESULTS (using user inputs)
  let dietaryPref: string[] = []; // data from user input: none || vegetarian || vegan - if vegetarian, use vegan meal plan
  let intolerances: boolean = true || false; // data from user input: true || false - if any intols, use intol meal plan

  useEffect(() => {
    fetchMealPlan(calorieRequirement).then((weekPlan) => {
      const mealsDay1 = weekPlan.monday.meals;
      const caloriesDay1 = weekPlan.monday.nutrients.calories;

      const mealsDay2 = weekPlan.tuesday.meals;
      const caloriesDay2 = weekPlan.tuesday.nutrients.calories;

      const mealsDay3 = weekPlan.wednesday.meals;
      const caloriesDay3 = weekPlan.wednesday.nutrients.calories;

      const mealsDay4 = weekPlan.thursday.meals;
      const caloriesDay4 = weekPlan.thursday.nutrients.calories;

      const mealsDay5 = weekPlan.friday.meals;
      const caloriesDay5 = weekPlan.friday.nutrients.calories;

      const mealsDay6 = weekPlan.saturday.meals;
      const caloriesDay6 = weekPlan.saturday.nutrients.calories;

      const mealsDay7 = weekPlan.sunday.meals;
      const caloriesDay7 = weekPlan.sunday.nutrients.calories;

      console.log("mealsDay1:", mealsDay1, caloriesDay1);
      console.log("mealsDay2:", mealsDay2, caloriesDay2);
      console.log("mealsDay3:", mealsDay3, caloriesDay3);
      console.log("mealsDay4:", mealsDay4, caloriesDay4);
      console.log("mealsDay5:", mealsDay5, caloriesDay5);
      console.log("mealsDay6:", mealsDay6, caloriesDay6);
      console.log("mealsDay7:", mealsDay7, caloriesDay7);

      //setMealPlan(mealsDay1); // CANNOT DO THIS AS THIS IS AN OBJECT NOT AN ARRAY
      setPlanCalories(caloriesDay1);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  // return a different plan (change state) if user swipes "don't fancy this one". The particular data for that plan needs inputting below.
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Plan page</Text>
      <Text>Breakfast</Text>
      <Text>[insert image of breakfast item]</Text>
      <Text>[insert name of breakfast item]</Text>
      <Text>------------------------</Text>
      <Text>Lunch</Text>
      <Text>[insert image of lunch item]</Text>
      <Text>[insert name of lunch item]</Text>
      <Text>------------------------</Text>
      <Text>Evening meal</Text>
      <Text>[insert image of evening meal item]</Text>
      <Text>[insert name of evening meal item]</Text>
      <Text>------------------------</Text>
      <Text>TOTAL CALORIES: {planCalories}</Text>
      <Text>------------------------</Text>
      <Text>------------------------</Text>
      <Text>Looks tasty? 😋 Click to save ❤️</Text>
      <Text>------------------------</Text>
      <Text style={{ textAlign: "center", textAlignVertical: "center" }}>
        Don't fancy this one?{"\n"}
        Swipe to choose a different meal plan{"\n"}
        {'<<<<<'}
      </Text>
    </View>
  );
};

export default MealPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    textAlign: "center",
  },
});

