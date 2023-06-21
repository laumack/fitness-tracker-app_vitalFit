import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";


function MealPlanCard({meal}) {
const calories = meal.nutrients.calories
const breakfast = meal.meals[0]
const lunch = meal.meals[1]
const dinner = meal.meals[2]



return(
<View style={styles.container}>
<Text>Breakfast</Text>
<Text>{breakfast.title}</Text>
<Text>Cooking Time: {breakfast.readyInMinutes} minutes</Text>
<Text>Lunch</Text>
<Text>{lunch.title}</Text>
<Text>Cooking Time: {lunch.readyInMinutes} minutes</Text>
<Text>Dinner</Text>
<Text>{dinner.title}</Text>
<Text>Cooking Time: {dinner.readyInMinutes} minutes</Text>
<Text>Total Calories for the day: {calories}kcal</Text>

</View>
 )
}

export default MealPlanCard;

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