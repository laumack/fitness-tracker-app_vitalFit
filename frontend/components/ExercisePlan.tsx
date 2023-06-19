import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { fetchExercises } from "../apis/api";

const ExercisePlan = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [beginnerRoutine, setBeginnerRoutine] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let advancedRoutine = [];
  let intermediateRoutine = [];

  useEffect(() => {
    fetchExercises().then((exercises) => {
      setExercises(exercises);
      setIsLoading(false);

      let routine = [];
      let newExercises = exercises.exercises;
      newExercises.map((obj) => {
        if (obj.category === "beginner") {
          routine.push(obj);
        }
      });
      setBeginnerRoutine(routine);
    });
  }, []);

  console.log(beginnerRoutine[1]);
  if (isLoading) return <p>Loading...</p>;

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
