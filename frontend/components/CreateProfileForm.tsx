import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Switch,
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

    console.log(userData);

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
      <Text style={styles.title}>VitalFit Details</Text>
      <Text style={styles.label}>Weight (kg)</Text>
      <Picker
        selectedValue={weight}
        onValueChange={(itemValue) => setWeight(itemValue)}
      >
        {[...Array(251)].map((_, i) => (
          <Picker.Item key={i} label={`${i + 50}`} value={`${i + 50}`} />
        ))}
      </Picker>

      <Text style={styles.label}>Height (cm)</Text>
      <Picker
        selectedValue={height}
        onValueChange={(itemValue) => setHeight(itemValue)}
      >
        {[...Array(181)].map((_, i) => (
          <Picker.Item key={i} label={`${i + 120}`} value={`${i + 120}`} />
        ))}
      </Picker>
      <Text style={styles.label}>Gender</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>
      <Text style={styles.label}>Age</Text>
      <Picker
        selectedValue={age}
        onValueChange={(itemValue) => setAge(itemValue)}
      >
        {[...Array(53)].map((_, i) => (
          <Picker.Item key={i} label={`${i + 13}`} value={`${i + 13}`} />
        ))}
      </Picker>
      <Text style={styles.label}>Activity Level</Text>
      <Picker
        selectedValue={activityLevel}
        onValueChange={(itemValue) => setActivityLevel(itemValue)}
      >
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Moderate" value="Moderate" />
        <Picker.Item label="Intense" value="Intense" />
      </Picker>
      <Text style={styles.label}>Goal</Text>
      <Picker
        selectedValue={goal}
        onValueChange={(itemValue) => setGoal(itemValue)}
      >
        <Picker.Item label="Weight Loss" value="Weight Loss" />
        <Picker.Item label="Bulk Up" value="Bulk Up" />
      </Picker>
      <Text style={styles.label}>Preferences</Text>

      <Text>Vegetarian</Text>
      <Switch
        onValueChange={() => toggleSwitch("vegetarian")}
        value={preferences.vegetarian}
      />
      <Text>Vegan</Text>
      <Switch
        onValueChange={() => toggleSwitch("vegan")}
        value={preferences.vegan}
      />
      <Text>Gluten Free</Text>
      <Switch
        onValueChange={() => toggleSwitch("glutenFree")}
        value={preferences.glutenFree}
      />
      <Text>Nut Free</Text>
      <Switch
        onValueChange={() => toggleSwitch("nutFree")}
        value={preferences.nutFree}
      />
      <Text>Dairy Free</Text>
      <Switch
        onValueChange={() => toggleSwitch("dairyFree")}
        value={preferences.dairyFree}
      />
      <Text>Shellfish Free</Text>
      <Switch
        onValueChange={() => toggleSwitch("shellfish")}
        value={preferences.shellfish}
      />
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default CreateProfileForm;
