import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { fetchMealPlan } from "../apis/api";
import { TouchableOpacity } from "react-native-gesture-handler";

type Meal = {
  title: string;
  readyInMinutes: number;
  id: number;
};

type DailyPlan = {
  meals: Meal[];
  nutrients: {
    calories: number;
    carbohydrates: number;
    fat: number;
    protein: number;
  };
};

type WeeklyPlan = Record<string, DailyPlan>;

type MealPlanPageProps = {
  navigation: any;
};

const MealPlanPage: React.FC<MealPlanPageProps> = ({ navigation }) => {
  const [mealData, setMealData] = useState<WeeklyPlan>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let calorieRequirement: number = 1600; // data from CALCULATION RESULTS (using user inputs)

  useEffect(() => {
    fetchMealPlan(calorieRequirement).then((data: WeeklyPlan) => {
      setMealData(data);
      setIsLoading(false);
    });
  }, []);

  const handleMealPress = (id: number) => {
    navigation.navigate("RecipeDetails", { mealId: id });
  };

  if (isLoading) return <Text>Loading...</Text>;

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const mealLabels = ["Breakfast", "Lunch", "Dinner"];

  return (
    <ScrollView style={styles.container}>
      {daysOfWeek.map((day) => (
        <View key={day}>
          <Text style={styles.title}>{day.toUpperCase()}</Text>
          {mealData[day].meals.map((meal, index) => (
            <TouchableOpacity
              key={index}
              style={styles.mealCard}
              onPress={() => handleMealPress(meal.id)}
            >
              <View key={index}>
                <Text style={styles.subtitle}>{mealLabels[index]}</Text>
                <Text>{meal.title}</Text>
                <Text>Cooking Time: {meal.readyInMinutes} minutes</Text>
              </View>
            </TouchableOpacity>
          ))}
          <Text>
            Total Calories for the day: {Math.round(mealData[day].nutrients.calories)} kcal
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default MealPlanPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  mealCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
});
