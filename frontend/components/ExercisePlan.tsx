import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { fetchExercises } from "../apis/api";

interface Exercise {
  name: string;
  description: string;
  category: string;
  exercises: Array<{
    sets: number;
    name: string;
    description: string;
    repetitions?: number;
    duration_in_seconds?: number;
  }>;
}

interface Props {
  navigation: any;
}

const ExercisePlan: React.FC<Props> = ({ navigation }) => {
  const [routines, setRoutines] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDifficultyButtons, setShowDifficultyButtons] =
    useState<boolean>(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

  const difficulties: string[] = ["Beginner", "Intermediate", "Advanced"];
  const workouts: string[] = [
    "Abs Routine",
    "Cardio Routine",
    "Chest & Arms Routine",
    "Leg Routine",
  ];

  useEffect(() => {
    fetchExercises().then((data) => {
      setRoutines(data.exercises);
      setIsLoading(false);
    });
  }, []);

  const handleDifficulty = (difficulty: string): void => {
    setSelectedDifficulty(difficulty);
    setShowDifficultyButtons(false);
  };

  const handleWorkout = (workout: string): void => {
    setSelectedWorkout(workout);
  };

  const handleBack = (): void => {
    setSelectedWorkout(null);
    setShowDifficultyButtons(true);
  };

  if (isLoading) return <Text>Loading...</Text>;

  let content: JSX.Element | null = null;

  if (showDifficultyButtons) {
    content = (
      <>
        {difficulties.map((difficulty) => (
          <TouchableOpacity
            key={difficulty}
            style={styles.button}
            onPress={() => handleDifficulty(difficulty)}
          >
            <Text style={styles.buttonText}>{difficulty}</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  } else if (!selectedWorkout) {
    content = (
      <>
        {workouts.map((workout) => (
          <TouchableOpacity
            key={workout}
            style={styles.button}
            onPress={() => handleWorkout(workout)}
          >
            <Text style={styles.buttonText}>{`${selectedDifficulty} ${workout}`}</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  } else {
    const workout = routines.find(
      (exercise) =>
        exercise.category.toLowerCase() === selectedDifficulty?.toLowerCase() &&
        exercise.name.includes(selectedWorkout)
    );

    if (workout) {
      content = (
        <View>
          <Text style={styles.title}>{workout.name}</Text>
          <Text>{workout.description}</Text>
          {workout.exercises.map((exercise, index) => (
            <View key={index}>
              <Text>{exercise.name}</Text>
              <Text>{exercise.description}</Text>
              <Text>Sets: {exercise.sets}</Text>
              {exercise.repetitions !== undefined && (
                <Text>Repetitions: {exercise.repetitions}</Text>
              )}
              {exercise.duration_in_seconds !== undefined && (
                <Text>Duration: {exercise.duration_in_seconds}s</Text>
              )}
            </View>
          ))}
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Back to routines</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      content = <Text>No workout found</Text>;
    }
  }

  return <View style={styles.container}>{content}</View>;
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
