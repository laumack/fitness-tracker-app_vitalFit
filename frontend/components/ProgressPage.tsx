import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import bmiChart from "../assets/bmi-chart.png"


interface Props {
  navigation: any;
}

const ProgressPage: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={bmiChart} style={styles.bmi} />
      <Text style={styles.title}>User progress page</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Menu")}
      >
        <Text style={styles.buttonText}>Go to Menu</Text>
      </TouchableOpacity>
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
  },
  button: {
    alignItems: "center",
    backgroundColor: "#499096",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#f9f3d0",
    fontWeight: "bold",
  },
});
