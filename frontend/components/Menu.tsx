import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";

interface Props {
  navigation: any;
}

const Menu: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <View style={styles.menuItem}>
        <TouchableOpacity
          style={styles.test}
          onPress={() => navigation.navigate("ProfilePage")}
        >
          <Text style={styles.buttonText}>my Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity
          style={styles.test}
          onPress={() => navigation.navigate("MealPlanPage")}
        >
          <Text style={styles.buttonText}>My Meal Plan</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity
          style={styles.test}
          onPress={() => navigation.navigate("ExercisePlan")}
        >
          <Text style={styles.buttonText}>My Exercise Plan</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity
          style={styles.test}
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#499096",
  },
  menuItem: { flex: 2 },
  test: {
    backgroundColor: "#499096",
    width: 300,
    height: 50,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#f9f3d0",
    alignSelf: "center",
    padding: 10,
  },
});

export default Menu;
