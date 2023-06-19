import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { RadioButton } from "react-native-paper";

const CreateProfileForm = ({ navigation }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("0");
  const [goal, setGoal] = useState("lose weight");

  const handleSubmit = () => {
    console.log("Weight:", weight);
    console.log("Height:", height);
    console.log("Gender:", gender);
    console.log("Age:", age);
    console.log("Activity Level:", activityLevel);
    console.log("Goal:", goal);

    setWeight("");
    setHeight("");
    setGender("");
    setAge("");
    setActivityLevel("0");
    setGoal("lose weight");
    navigation.navigate("Menu");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Fitness Tracker!</Text>
      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        placeholder="Enter your weight"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        placeholder="Enter your height"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={setGender}
        placeholder="Enter your gender"
      />
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Enter your age"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Activity Level</Text>
      <View style={styles.radioContainer}>
        <RadioButton
          value="0"
          status={activityLevel === "0" ? "checked" : "unchecked"}
          onPress={() => setActivityLevel("0")}
        />
        <Text style={styles.radioLabel}>0</Text>
        <RadioButton
          value="1"
          status={activityLevel === "1" ? "checked" : "unchecked"}
          onPress={() => setActivityLevel("1")}
        />
        <Text style={styles.radioLabel}>1</Text>
        <RadioButton
          value="2"
          status={activityLevel === "2" ? "checked" : "unchecked"}
          onPress={() => setActivityLevel("2")}
        />
        <Text style={styles.radioLabel}>2</Text>
      </View>
      <Text style={styles.label}>Goal</Text>
      <View style={styles.radioContainer}>
        <RadioButton
          value="lose weight"
          status={goal === "lose weight" ? "checked" : "unchecked"}
          onPress={() => setGoal("lose weight")}
        />
        <Text style={styles.radioLabel}>Lose Weight</Text>
        <RadioButton
          value="gain weight"
          status={goal === "gain weight" ? "checked" : "unchecked"}
          onPress={() => setGoal("gain weight")}
        />
        <Text style={styles.radioLabel}>Gain Weight</Text>
      </View>
      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  radioLabel: {
    marginLeft: 8,
    marginRight: 16,
  },
});

export default CreateProfileForm;
