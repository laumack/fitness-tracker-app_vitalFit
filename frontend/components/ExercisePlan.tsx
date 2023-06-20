import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { fetchExercises } from "../apis/api";

interface Exercise {
  category: string;
}

const ExercisePlan: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDifficultyButtons, setShowDifficultyButtons] =
    useState<boolean>(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const difficulties: string[] = ["Beginner", "Intermediate", "Advanced"];
  const workouts: string[] = [
    "Abs Routine",
    "Cardio Routine",
    "Strength Routine",
  ];

  useEffect(() => {
    fetchExercises().then((exercises) => {
      setExercises(exercises);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  const handleDifficulty = (difficulty: string): void => {
    setSelectedDifficulty(difficulty);
    setShowDifficultyButtons(false);
  };

  const handleWorkout = (workout: string) => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Plan page</Text>
      <View>
        {showDifficultyButtons
          ? difficulties.map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={styles.button}
                onPress={() => handleDifficulty(difficulty)}
              >
                <Text style={styles.buttonText}>{difficulty}</Text>
              </TouchableOpacity>
            ))
          : workouts.map((workout) => (
              <TouchableOpacity
                key={workout}
                style={styles.button}
                onPress={() => handleWorkout(workout)}
              >
                <Text
                  style={styles.buttonText}
                >{`${selectedDifficulty} ${workout}`}</Text>
              </TouchableOpacity>
            ))}
      </View>
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
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
  },
});
