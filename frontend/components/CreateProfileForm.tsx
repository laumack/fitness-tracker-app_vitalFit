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

interface Preferences {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  nutFree: boolean;
}

interface Props {
  navigation: any;
}

const CreateProfileForm: React.FC<Props> = ({ navigation }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<Preferences>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    nutFree: false,
  });

  const toggleSwitch = (preference: keyof Preferences) => {
    setPreferences({ ...preferences, [preference]: !preferences[preference] });
  };

  const handleSubmit = async () => {
    const userData = {
      weight,
      height,
      gender,
      age,
      activityLevel,
      goal,
      preferences,
    };

    await SecureStore.setItemAsync("userProfile", JSON.stringify(userData));

    setWeight("");
    setHeight("");
    setGender("");
    setAge("");
    setActivityLevel(null);
    setGoal(null);
    setPreferences({
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      nutFree: false,
    });

    navigation.navigate("Menu");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome to Fitness Tracker!</Text>
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
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
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
        <Picker.Item label="Low" value="low" />
        <Picker.Item label="Moderate" value="moderate" />
        <Picker.Item label="Intense" value="intense" />
      </Picker>
      <Text style={styles.label}>Goal</Text>
      <Picker
        selectedValue={goal}
        onValueChange={(itemValue) => setGoal(itemValue)}
      >
        <Picker.Item label="Weight Loss" value="weight_loss" />
        <Picker.Item label="Bulk Up" value="bulk_up" />
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
    marginBottom: 30
  },
});

export default CreateProfileForm;
