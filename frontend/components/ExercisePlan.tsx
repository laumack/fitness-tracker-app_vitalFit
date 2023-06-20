import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { fetchExercises } from "../apis/api";

interface Exercise {
  category: string;
}

const ExercisePlan: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDifficulty, setShowDifficulty] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showDifficultyButtons, setShowDifficultyButtons] =
    useState<boolean>(true);

  let difficulties = ["beginner", "intermediate", "advanced"];
  let workouts = [
    "abs routine",
    "cardio routine",
    "legs routine",
    "chest & arms routine",
  ];

  useEffect(() => {
    fetchExercises().then((exercises) => {
      setExercises(exercises);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  const handleDifficulty = (difficulty: string) => {
    setShowDifficulty(difficulty);
    setShowCategories(true);
  };

  const handleWorkout = (workout: string) => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Plan page</Text>

      {showDifficultyButtons
        ? difficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => handleDifficulty(difficulty)}
            >
              {difficulty}
            </button>
          ))
        : workouts.map((workout) => (
            <button key={workout} onClick={() => handleWorkout(workout)}>
              {`${selectedDifficulty} ${workout}`}
            </button>
          ))}
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
