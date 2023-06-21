import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { fetchMealPlan } from "../apis/api";
import * as SecureStore from "expo-secure-store";

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
interface UserData {
  [key: string]: any;
  calorieIntake?: number;
}

const MealPlanPage: React.FC<MealPlanPageProps> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserData>({});
  const [mealData, setMealData] = useState<WeeklyPlan>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  
  useEffect(() => {
    fetchUserData();
  }, [userData]);
  
  const fetchUserData = async () => {
    const storedData = await SecureStore.getItemAsync("userProfile");
    if (storedData) {
      const storedUserData = JSON.parse(storedData);
      setUserData(storedUserData);
    }
  };

  const roundToNearestValidCalories = (calorieIntake: number): number => {
    const validCalories = [1200, 1600, 2000, 2500];
    return validCalories.reduce((prev, curr) =>
      Math.abs(curr - calorieIntake) < Math.abs(prev - calorieIntake) ? curr : prev
    );
  };

  useEffect(() => {
    const fetchMealPlanData = async () => {
      let calorieRequirement: number = roundToNearestValidCalories(userData.calorieIntake || 0);
      const data: WeeklyPlan = await fetchMealPlan(calorieRequirement);
      setMealData(data);
      setIsLoading(false);
    };
  
    fetchMealPlanData();
  }, [userData]);
  

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
            Total Calories for the day:{" "}
            {Math.round(mealData[day].nutrients.calories)} kcal
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
