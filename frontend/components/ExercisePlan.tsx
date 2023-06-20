import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { fetchExercises } from "../apis/api";

interface Exercise {
  category: string;
}

const ExercisePlan: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [beginnerRoutine, setBeginnerRoutine] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  let advancedRoutine: Exercise[] = [];
  let intermediateRoutine: Exercise[] = [];

  useEffect(() => {
    fetchExercises().then((exercises) => {
      setExercises(exercises);
      setIsLoading(false);

      let routine: Exercise[] = [];
      let newExercises: Exercise[] = exercises.exercises;
      newExercises.forEach((obj) => {
        if (obj.category === "beginner") {
          routine.push(obj);
        }
      });
      setBeginnerRoutine(routine);
    });
  }, []);

  console.log(beginnerRoutine[1]);
  if (isLoading) return <Text>Loading...</Text>;

  let test = beginnerRoutine[0];
  console.log(test);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Plan page</Text>
      <Text>beginner</Text>
      <Text>intermediate</Text>
      <Text>advanced</Text>
    </View>
  );
};

export default ExercisePlan;

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
});
