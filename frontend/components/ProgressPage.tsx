import React from "react";
import { StyleSheet, View, Image } from "react-native";
import bmiChart from "../assets/bmi-chart.png"

const ProgressPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={bmiChart} style={styles.bmi} />
    </View>
  );
};

export default ProgressPage;

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
  bmi: {
    width: 380,
    height: 300,
    marginBottom: 32,
    borderRadius: 30,
  }
});
