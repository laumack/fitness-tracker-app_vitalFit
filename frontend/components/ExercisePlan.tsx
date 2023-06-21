import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
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
            <Text
              style={styles.buttonText}
            >{`${selectedDifficulty} ${workout}`}</Text>
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
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{workout.name}</Text>
            <Text style={styles.description}>{workout.description}</Text>
            {workout.exercises.map((exercise, index) => (
              <View style={styles.exerciseBox} key={index}>
                <Text style={styles.exerciseTitle}>{exercise.name}</Text>
                <Text style={styles.exerciseDesc}>{exercise.description}</Text>
                <Text style={styles.exerciseSet}>Sets: {exercise.sets}</Text>
                {exercise.repetitions !== undefined && (
                  <Text style={styles.exerciseTime}>
                    Repetitions: {exercise.repetitions}
                  </Text>
                )}
                {exercise.duration_in_seconds !== undefined && (
                  <Text style={styles.exerciseTime}>
                    Duration: {exercise.duration_in_seconds}s
                  </Text>
                )}
              </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={handleBack}>
              <Text style={styles.buttonText}>Back to routines</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      content = <Text>No workout found</Text>;
    }
  }

  return (
    <View style={styles.container}>
      {content}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Menu")}
      >
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
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
  scrollView: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 10,
    color: "#499096",
    marginLeft: 5,
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#499096",
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#f9f3d0",
    fontWeight: "bold",
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 60,
    marginBottom: 50,
    borderRadius: 5,
  },
  backButtonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    paddingBottom: 20,
    marginLeft: 5,
  },
  exerciseBox: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 20,
    backgroundColor: "white",
    // shadowColor: "#171717",
    // shadowOffset: { width: 4, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  exerciseTitle: {
    color: "#499096",
    fontSize: 16,
    fontWeight: "bold",
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 3,
  },
  exerciseDesc: {
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 3,
  },
  exerciseSet: {
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 3,
    fontWeight: "bold",
  },
  exerciseTime: {
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 3,
    fontWeight: "bold",
  },
});
