import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { fetchMealPlan } from "../apis/api";
import MealPlanCard from "./MealPlanCard";

const MealPlanPage: React.FC = () => {
  const [mealArray, setMealArray] = useState<Meal[]>([]);
  const [currentMealIndex, setCurrentMealIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let calorieRequirement: number = 1600; // data from CALCULATION RESULTS (using user inputs)
  useEffect(() => {
    fetchMealPlan(calorieRequirement).then((weekPlan) => {
      const arrayOfDays = Object.values(weekPlan)
      setMealArray(arrayOfDays);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  const handleClick = () => {
    if (currentMealIndex < mealArray.length - 1) {
      setCurrentMealIndex(currentMealIndex + 1);
  };

  const currentMeal = mealArray[currentMealIndex];


return (
      <View style={styles.container}>
      <Text style={styles.title}>Meal Plan page</Text>

      <MealPlanCard meal={currentMeal} />
      <Button title="Next Meal" onPress={handleClick} />

      </View>
    );
  ;
};
}

export default MealPlanPage;

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


