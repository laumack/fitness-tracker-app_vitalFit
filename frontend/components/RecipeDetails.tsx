import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { fetchRecipe } from "../apis/api";

type Props = {
  route: {
    params: {
      mealId: number;
    };
  };
  navigation: any;
};

type Nutrient = {
  name: string;
  amount: number;
  unit: string;
};

type Step = {
  number: number;
  step: string;
};

type Instructions = {
  steps: Step[];
};

type Meal = {
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  diets: string[];
  analyzedInstructions: Instructions[];
  nutrition: {
    nutrients: Nutrient[];
  };
  sourceUrl: string;
  summary: string;
};

const RecipeDetails: React.FC<Props> = ({ route, navigation }) => {
  const [mealDetails, setMealDetails] = useState<Meal | null>(null);
  const { mealId } = route.params;

  useEffect(() => {
    fetchRecipe(mealId).then((data) => {
      setMealDetails(data.meal);
    });
  }, [mealId]);

  if (!mealDetails) return <Text>Loading...</Text>;

  const handleBack = (): void => {
    navigation.navigate("MealPlan");
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>{mealDetails.title}</Text>
        <Image style={styles.image} source={{ uri: mealDetails.image }} />
        <Text>Ready in: {mealDetails.readyInMinutes} minutes</Text>
        <Text>Servings: {mealDetails.servings}</Text>
        {mealDetails.nutrition.nutrients.map((nutrient, index) => (
          <Text key={index}>
            {nutrient.name}: {Math.round(nutrient.amount)} {nutrient.unit} per
            serving
          </Text>
        ))}
        <Text>Dietary Information:</Text>
        {mealDetails.diets.map((diet, index) => (
          <Text key={index}>{diet}</Text>
        ))}

        {mealDetails.analyzedInstructions[0].steps.map((step: Step) => (
          <View key={step.number}>
            <Text>Step {step.number}</Text>
            <Text>{step.step}</Text>
          </View>
        ))}
        <Text>Source:</Text>
        <Text>{mealDetails.sourceUrl}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RecipeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 16,
  },
  
  text: {
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 30,
    marginBottom: 50,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
  },
});
