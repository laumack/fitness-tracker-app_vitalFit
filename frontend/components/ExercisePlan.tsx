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
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [workoutClicked, setWorkoutClicked] = useState<boolean>(false);

  const difficulties: string[] = ["Beginner", "Intermediate", "Advanced"];
  const workouts: string[] = [
    "Abs Routine",
    "Cardio Routine",
    "Chest & Arms Routine",
    "Leg Routine",
  ];

  useEffect(() => {
    fetchExercises().then((exercises) => {
      setExercises(exercises);
      setIsLoading(false);
    });
  }, []);

  const handleDifficulty = (difficulty: string): void => {
    setSelectedDifficulty(difficulty);
    setShowDifficultyButtons(false);
  };

  let routines = exercises.exercises;

  const handleWorkout = (workout: string) => {
    setWorkoutClicked(true);
    setSelectedWorkout(workout);
  };

  if (isLoading) return <Text>Loading...</Text>;

  if (workoutClicked === true)
    return (
      <>
        {routines.map((obj) => {
          if (obj.name === `${selectedDifficulty} ${selectedWorkout}`) {
            <Text key={obj.name}>{obj.name}</Text>;
            let arr = obj.exercises;
            console.log(arr);

            // arr.map((e) => {
            //   console.log(e.name);
            //   return (
            //     <View style={styles.container}>
            //       <Text key={e.name}>{e.name}</Text>
            //     </View>
            //   );
            // });
          }
        })}
      </>
    );

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
        {/* (workoutClicked && (<h1> hello </h1>)) */}
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
