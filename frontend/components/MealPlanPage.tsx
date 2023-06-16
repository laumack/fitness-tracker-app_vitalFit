import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const MealPlanPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> MealPlanPage</Text>
      <Text style={styles.appName}>VITALFIT</Text>
      <Image source={require("../assets/run-icon.png")} style={styles.logo} />
    </View>
  );
};

export default MealPlanPage;

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
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 32,
  },
});