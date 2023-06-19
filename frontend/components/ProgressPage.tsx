import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const ProgressPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User progress page</Text>
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
  }
});