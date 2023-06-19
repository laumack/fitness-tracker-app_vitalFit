import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, Button, Animated } from "react-native";
import logo from "./assets/run-icon.png";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomePage from "./components/WelcomePage";
import CreateProfileForm from './components/CreateProfileForm';
import ProfilePage from "./components/ProfilePage";
import MealPlanPage from "./components/MealPlanPage";
import Menu from './components/Menu';
import ProgressPage from "./components/ProgressPage";
import ExercisePlan from './components/ExercisePlan';


const Stack = createStackNavigator();



  const HomeScreen = ({ navigation }) => {
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
        <WelcomePage navigation={"WelcomePage"}/>
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
        title="Go to Welcome Page"
        onPress={() => navigation.navigate("CreateProfileForm")}
      />
      </View>
    );
  };

  export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="CreateProfileForm" component={CreateProfileForm} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="MealPlanPage" component={MealPlanPage} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="ExercisePlan" component={ExercisePlan} />
        <Stack.Screen name="ProgressPage" component={ProgressPage} />


        


        
      </Stack.Navigator>
    </NavigationContainer>
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

