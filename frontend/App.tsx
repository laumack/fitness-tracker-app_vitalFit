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
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#499096",
          },
          headerTintColor: "#f9f3d0",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
          },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateProfileForm"
          component={CreateProfileForm}
          options={{
            title: "My Details",
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: "Dashboard",
          }}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{
            title: "My Profile",
          }}
        />
        <Stack.Screen
          name="MealPlanPage"
          component={MealPlanPage}
          options={{
            title: "Meal Plans",
          }}
        />
        <Stack.Screen
          name="RecipeDetails"
          component={RecipeDetails}
          options={{
            title: "Recipes",
          }}
        />
        <Stack.Screen
          name="ExercisePlan"
          component={ExercisePlan}
          options={{
            title: "Exercise Plans",
          }}
        />
        <Stack.Screen
          name="ProgressPage"
          component={ProgressPage}
          options={{
            title: "My Progress",
          }}
        />
        <Stack.Screen name="MealPlan" component={MealPlanPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
