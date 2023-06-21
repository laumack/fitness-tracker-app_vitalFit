import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { fetchMealPlan, fetchRecipe} from "../apis/api";
import SingleRecipeCard from "./SingleRecipeCard";


interface MealPlanData {
  meals: Array<object>;
  nutrients: {
    calories: number;
  };
}

const SingleRecipe: React.FC = ({navigation}) => {
  const [meal, setMeal] = useState<MealPlanData[]>([]);
  const [planCalories, setPlanCalories] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  let id = 660015;



  
  useEffect(() => {
    fetchRecipe(id).then((data) => {
     // console.log("RECIPESSSSSSSSSSSSSSSS:", data.meal);
      //console.log("RECIPESSSSSSSSSSSSSSSS:", data.meal.summary);
      //console.log("RECIPESSSSSSSSSSSSSSSS:", data.meal.analyzedInstructions[0].steps[0].step);
      //console.log("Nutrition:", data.meal.nutrition.nutrients[0].amount);
      //console.log("Steppppppppppppppppppppppppppp:", data.meal.analyzedInstructions);

      const nutrition = data.meal.nutrition.nutrients[0].amount;


    setMeal(data.meal)
    setPlanCalories(nutrition)
    //console.log("State Settttttttttt", meal);

      setIsLoading(false);
    });
}, [id]);

console.log(meal)  // return a different plan (change state) if user swipes "don't fancy this one". The particular data for that plan needs inputting below.


  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <SingleRecipeCard meal={meal}/>
     
    </View>
  );
};

export default SingleRecipe;

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