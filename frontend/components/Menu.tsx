import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";

interface Props {
  navigation: any;
}

const Menu: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.menuItem}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ProfilePage")}
        >
          <Text style={styles.buttonText}>My Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MealPlanPage")}
        >
          <Text style={styles.buttonText}>My Meal Plan</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ExercisePlan")}
        >
          <Text style={styles.buttonText}>My Exercise Plan</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ProgressPage")}
        >
          <Text style={styles.buttonText}>Check My Progress</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  menuItem: { flex: 2 },
  button: {
    backgroundColor: "#499096",
    width: 300,
    height: 50,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f9f3d0",
    alignSelf: "center",
    padding: 10,
  },
});

export default Menu;
