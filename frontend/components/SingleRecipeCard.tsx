import React from "react";
import { StyleSheet, Text, View, Image, Button} from "react-native";
import { useState } from "react";



const SingleRecipeCard = ({ meal, navigation }) => {
    const nutrtion = meal.nutrition.nutrients[0].amount;

    const [ingredients, setIngredients] = useState<string>('');


  return (
    <View style={styles.container}>
      
      
      <Text style={styles.title}>Meal Description</Text>
      <Text>Meal</Text>
      <Text>
         <Image
        source={{ uri: meal.image }}
        style={styles.image}
      /></Text>
      <Text>[{meal.title}]</Text>
      <Text>------------------------</Text>
    
      <Text>TOTAL CALORIES: {nutrtion}</Text>
      <Text>------------------------</Text>
      <Text>------------------------</Text>
      <Text>Looks tasty? 😋 Click to save ❤️</Text>
      <Text>------------------------</Text>
      <Text style={{ textAlign: "center", textAlignVertical: "center" }}>
        Don't fancy this one?{"\n"}
        Swipe to choose a different meal plan{"\n"}
        {'<<<<<'}
      </Text>
      <Text>
  dishTypes:
  {meal.dishTypes.map((type, index) => (
    <Text key={index}> {type},</Text>
  ))}
</Text>

      <Text>diets: {meal.diets}</Text>
      <Text>readyInMinutes: {meal.readyInMinutes}</Text>


      <Text>
  Recipe:
  {meal.analyzedInstructions.map((item) => (
    item.steps.map((step, index) => (
      <Text key={index}>
          <Text>{"\n"}</Text>
        <Text>Step: {step.number}</Text>
        <Text>{"\n"}</Text>
        <Text>{step.step}</Text>
        <Text>{"\n\n"}</Text>
        <Text>Ingredients: {step.ingredients.map((item, index) => (
          <Text>
                      <Text>{"\n"}</Text>
                      <Text key={index}>{item.name}</Text>

            </Text>
          ))}</Text>
        <Text>{"\n"}</Text>
      </Text>
    ))
  ))}
</Text>



<Text>Step: {meal.analyzedInstructions[0].steps[0].step}</Text>





      <View>
        <Button
          title="ShowRecipe"
          onPress={() => navigation.navigate("SingleRecipe")}
        />


    </View>
    </View>

    );
    };

    


export default SingleRecipeCard;

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
  image: {
    alignSelf: "center",
    width: 312,
    height: 231,
  },
  text: {
    textAlign: "center",
  }
});