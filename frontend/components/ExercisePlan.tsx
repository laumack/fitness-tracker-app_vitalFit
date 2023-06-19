import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const ExercisePlan = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Plan page</Text>
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
  }
});