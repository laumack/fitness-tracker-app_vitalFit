import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, Button, Animated } from "react-native";
import logo from "../assets/vitalFit_logo.png";

const WelcomePage = ({ navigation }) => {
  const opacity = new Animated.Value(1);
  const position = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(position, {
          toValue: 50,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Fitness Tracker</Text>
      <Animated.Text
        style={{
          ...styles.swipeDown,
          opacity,
          transform: [{ translateY: position }],
        }}
      >
        Scroll for more
      </Animated.Text>
      <Button
        title="Go to your profile"
        onPress={() => navigation.navigate("CreateProfileForm")}
      />
    </View>
  );
};

export default WelcomePage;


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
    width: 300,
    height: 300,
    marginBottom: 32,
  },
});
