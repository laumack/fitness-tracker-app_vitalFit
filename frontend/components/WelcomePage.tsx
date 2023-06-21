import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, Button, Animated } from "react-native";
import logo from "../assets/vitalFit_logo.png";

const WelcomePage = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("CreateProfileForm");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#499096",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 32,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: "rgba(249, 243, 208, 0.72)",
  },
});
