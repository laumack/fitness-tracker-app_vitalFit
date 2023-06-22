import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as SecureStore from "expo-secure-store";
import calculateCalorieIntake from "./CalorieCalculation";

interface UserData {
  weight: number | null;
  height: number | null;
  gender: string;
  age: number | null;
  activityLevel: string | null;
  goal: string | null;
  preferences: Preferences;
  calorieIntake?: number;
}

interface Preferences {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  nutFree: boolean;
  dairyFree: boolean;
  shellfish: boolean;
}

interface Props {
  navigation: any;
}

const CreateProfileForm: React.FC<Props> = ({ navigation }) => {
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(null);
  const [activityLevel, setActivityLevel] = useState<string | null>("Low");
  const [goal, setGoal] = useState<string | null>("Weight Loss");
  const [preferences, setPreferences] = useState<Preferences>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    nutFree: false,
    dairyFree: false,
    shellfish: false,
  });

  const toggleSwitch = (preference: keyof Preferences) => {
    setPreferences({ ...preferences, [preference]: !preferences[preference] });
  };

  const handleSubmit = async () => {
    const userData: UserData = {
      weight,
      height,
      gender,
      age,
      activityLevel,
      goal,
      preferences,
    };

    userData.calorieIntake = calculateCalorieIntake(userData);
    await SecureStore.setItemAsync("userProfile", JSON.stringify(userData));

    setWeight(null);
    setHeight(null);
    setGender("Male");
    setAge(null);
    setActivityLevel("Low");
    setGoal("Weight Loss");
    setPreferences({
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      nutFree: false,
      dairyFree: false,
      shellfish: false,
    });

    navigation.navigate("Menu");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About me</Text>
      <Text style={styles.label}>Weight (kg)</Text>
      <Picker
        itemStyle={{ color: "#499096" }}
        selectedValue={weight}
        onValueChange={(itemValue) => setWeight(itemValue)}
      >
        {[...Array(251)].map((_, i) => (
          <Picker.Item key={i} label={`${i + 50}`} value={`${i + 50}`} />
        ))}
      </Picker>

      <Text style={styles.label}>Height (cm)</Text>
      <Picker
        itemStyle={{ color: "#499096" }}
        selectedValue={height}
        onValueChange={(itemValue) => setHeight(itemValue)}
      >
        {[...Array(181)].map((_, i) => (
          <Picker.Item key={i} label={`${i + 120}`} value={`${i + 120}`} />
        ))}
      </Picker>
      <Text style={styles.label}>Gender</Text>
      <Picker
        itemStyle={{ color: "#499096" }}
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>
      <Text style={styles.label}>Age</Text>
      <Picker
        itemStyle={{ color: "#499096" }}
        selectedValue={age}
        onValueChange={(itemValue) => setAge(itemValue)}
      >
        {[...Array(53)].map((_, i) => (
          <Picker.Item key={i} label={`${i + 13}`} value={`${i + 13}`} />
        ))}
      </Picker>
      <Text style={styles.label}>Activity Level</Text>
      <Picker
        itemStyle={{ color: "#499096" }}
        selectedValue={activityLevel}
        onValueChange={(itemValue) => setActivityLevel(itemValue)}
      >
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Moderate" value="Moderate" />
        <Picker.Item label="Intense" value="Intense" />
      </Picker>
      <Text style={styles.label}>Goal</Text>
      <Picker
        itemStyle={{ color: "#499096" }}
        selectedValue={goal}
        onValueChange={(itemValue) => setGoal(itemValue)}
      >
        <Picker.Item label="Weight Loss" value="Weight Loss" />
        <Picker.Item label="Bulk Up" value="Bulk Up" />
      </Picker>
      <View style={styles.grid}>
        <View style={styles.gridRow}>
          <Text>Vegetarian</Text>
          <Switch
            onValueChange={() => toggleSwitch("vegetarian")}
            value={preferences.vegetarian}
            ios_backgroundColor="#f9f3d0"
            thumbColor="#fcfbf5"
            trackColor={{ true: "#499096" }}
          />
        </View>
        <View style={styles.gridRow}>
          <Text>Vegan</Text>
          <Switch
            onValueChange={() => toggleSwitch("vegan")}
            value={preferences.vegan}
            ios_backgroundColor="#f9f3d0"
            thumbColor="#fcfbf5"
            trackColor={{ true: "#499096" }}
          />
        </View>
        <View style={styles.gridRow}>
          <Text>Gluten Free</Text>
          <Switch
            onValueChange={() => toggleSwitch("glutenFree")}
            value={preferences.glutenFree}
            ios_backgroundColor="#f9f3d0"
            thumbColor="#fcfbf5"
            trackColor={{ true: "#499096" }}
          />
        </View>
      </View>
      <View style={styles.grid}>
        <View style={styles.gridRow}>
          <Text>Nut Free</Text>
          <Switch
            onValueChange={() => toggleSwitch("nutFree")}
            value={preferences.nutFree}
            ios_backgroundColor="#f9f3d0"
            thumbColor="#fcfbf5"
            trackColor={{ true: "#499096" }}
          />
        </View>
        <View style={styles.gridRow}>
          <Text>Dairy Free</Text>
          <Switch
            onValueChange={() => toggleSwitch("dairyFree")}
            value={preferences.dairyFree}
            ios_backgroundColor="#f9f3d0"
            thumbColor="#fcfbf5"
            trackColor={{ true: "#499096" }}
          />
        </View>
        <View style={styles.gridRow}>
          <Text>Shellfish Free</Text>
          <Switch
            onValueChange={() => toggleSwitch("shellfish")}
            value={preferences.shellfish}
            ios_backgroundColor="#f9f3d0"
            thumbColor="#fcfbf5"
            trackColor={{ true: "#499096" }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 5,
    marginTop: 50,
    MarginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: 10,
    color: "#499096",
    marginLeft: 5,
    alignSelf: "center",
  },
  label: {
    color: "#499096",
    fontSize: 20,
    fontWeight: "bold",
    paddingRight: 15,
    paddingLeft: 15,
  },
  buttonContainer: {
    marginTop: 40,
    marginBottom: 60,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  gridRow: {
    width: "30%",
    alignItems: "center",
  },
  submitButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#499096",
    width: 300,
    height: 50,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  submitText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f9f3d0",
    alignSelf: "center",
    textAlign: "center",
  },
});

export default CreateProfileForm;
