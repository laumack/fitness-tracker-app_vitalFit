import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomePage from "./components/WelcomePage";
import CreateProfileForm from "./components/CreateProfileForm";
import ProfilePage from "./components/ProfilePage";
import MealPlanPage from "./components/MealPlanPage";
import RecipeDetails from "./components/RecipeDetails";
import Menu from "./components/Menu";
import ProgressPage from "./components/ProgressPage";
import ExercisePlan from "./components/ExercisePlan";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ gestureEnabled: true }}>
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="CreateProfileForm"
          component={CreateProfileForm}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="MealPlanPage"
          component={MealPlanPage}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="ExercisePlan"
          component={ExercisePlan}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="ProgressPage"
          component={ProgressPage}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="MealPlan"
          component={MealPlanPage}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="RecipeDetails"
          component={RecipeDetails}
          options={{ headerShown: false, gestureEnabled: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
