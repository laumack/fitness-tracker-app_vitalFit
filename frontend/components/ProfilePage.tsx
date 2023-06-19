import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const ProfilePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Profile</Text>
      <Text style={styles.appName}>VITALFIT</Text>
      <Image source={require("../assets/runIcon.png")} style={styles.logo} />
    </View>
  );
};

export default ProfilePage;

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