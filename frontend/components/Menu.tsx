import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <View style={styles.menuItem}>
        <Button
          title="Profile"
          onPress={() => navigation.navigate("ProfilePage")}
        />
      </View>
      <View style={styles.menuItem}>
        <Button
          title="Meal Plan"
          onPress={() => navigation.navigate("MealPlanPage")}
        />
      </View>
      <View style={styles.menuItem}>
        <Button
          title="Exercise Plan"
          onPress={() => navigation.navigate("ExercisePlan")}
        />
      </View>
      <View style={styles.menuItem}>
        <Button
          title="Progress"
          onPress={() => navigation.navigate("ProgressPage")}
        />
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
  },
  menuItem: {
    marginBottom: 16,
  },
});

export default Menu;