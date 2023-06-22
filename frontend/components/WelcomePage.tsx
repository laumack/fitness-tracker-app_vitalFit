import React, { useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import logo from "../assets/vitalFit_logo.png";
import * as SecureStore from "expo-secure-store";

interface Props {
  navigation: any;
}

const WelcomePage: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const checkForProfile = async () => {
      const userProfile = await SecureStore.getItemAsync("userProfile");
      if (userProfile !== null) {
        navigation.navigate("Menu");
      } else {
        const timer = setTimeout(() => {
          navigation.navigate("CreateProfileForm");
        }, 5000);
        return () => clearTimeout(timer);
      }
    };

    checkForProfile();
  }, []);

  const handleScreenPress = async () => {
    const userProfile = await SecureStore.getItemAsync("userProfile");
    if (userProfile !== null) {
      navigation.navigate("Menu");
    } else {
      navigation.navigate("CreateProfileForm");
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleScreenPress}>
      <View>
        <Image source={logo} style={styles.logo} />
      </View>
    </TouchableOpacity>
  );
};

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

export default WelcomePage;
