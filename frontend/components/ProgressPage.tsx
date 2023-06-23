import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import bmiChart from "../assets/bmi-chart.png";

interface Props {
  navigation: any;
}

const ProgressPage: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Progress</Text>
      </View>
      <View style={styles.container}>
        <Image source={bmiChart} style={styles.bmi} />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Menu")}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProgressPage;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  titleContainer: {
    paddingTop: 10,
    alignSelf: "center",
    marginTop: 50,
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
    alignSelf: "center",
    padding: 10,
    marginTop: 10,
    marginBottom: 40,
    width: 300,
    height: 50,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f9f3d0",
    alignSelf: "center",
    justifyContent: "flex-end",
  },
});
