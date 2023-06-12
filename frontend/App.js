import React from "react";
import { StyleSheet, Text, View, Image, Button, Animated } from "react-native";
import logo from "./assets/run-icon.png";
import MapView from "react-native-maps";

export default function App() {
  const opacity = React.useRef(new Animated.Value(1)).current;
  const position = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
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

  React.useEffect(() => {
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
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logo: {
    marginBottom: 30,
    width: 100,
    height: 100,
  },
  swipeDown: {
    fontSize: 16,
    marginTop: 40,
  },
});
