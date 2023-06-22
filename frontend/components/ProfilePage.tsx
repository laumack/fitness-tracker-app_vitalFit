import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as SecureStore from "expo-secure-store";
import calculateCalorieIntake from "./CalorieCalculation";

interface UserData {
  [key: string]: any;
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

const ProfilePage: React.FC<Props> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserData>({});
  const [preferences, setPreferences] = useState<Preferences>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    nutFree: false,
    dairyFree: false,
    shellfish: false,
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState("");
  const [calorieIntake, setCalorieIntake] = useState<number>(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const storedData = await SecureStore.getItemAsync("userProfile");

    if (storedData) {
      const storedUserData = JSON.parse(storedData);
      const calculatedCalorieIntake = calculateCalorieIntake(storedUserData);
      if (calculatedCalorieIntake !== storedUserData.calorieIntake) {
        storedUserData.calorieIntake = calculatedCalorieIntake;
        await SecureStore.setItemAsync(
          "userProfile",
          JSON.stringify(storedUserData)
        );
      }
      setUserData(storedUserData);
      setCalorieIntake(calculatedCalorieIntake);
      setPreferences(storedUserData.preferences);
    }
  };

  const updateUserData = async (key: string, value: any) => {
    const updatedUserData: UserData = {
      ...userData,
      [key]: value,
    };

    if (
      key === "weight" ||
      key === "height" ||
      key === "activityLevel" ||
      key === "age" ||
      key === "gender"
    ) {
      updatedUserData.calorieIntake = calculateCalorieIntake(updatedUserData);
      setCalorieIntake(updatedUserData.calorieIntake);
    }

    await SecureStore.setItemAsync(
      "userProfile",
      JSON.stringify(updatedUserData)
    );
    setUserData(updatedUserData);
  };

  const toggleSwitch = (preference: keyof Preferences) => {
    const updatedPreferences: Preferences = {
      ...preferences,
      [preference]: !preferences[preference],
    };
    updateUserData("preferences", updatedPreferences);
    setPreferences(updatedPreferences);
  };

  const clearUserData = async () => {
    Alert.alert(
      "Clear User Data",
      "Are you sure you want to clear all user data?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await SecureStore.deleteItemAsync("userProfile");
            setUserData({});
            setPreferences({
              vegetarian: false,
              vegan: false,
              glutenFree: false,
              nutFree: false,
              dairyFree: false,
              shellfish: false,
            });
            navigation.navigate("CreateProfileForm");
          },
        },
      ]
    );
  };

  const weightRange = Array.from({ length: 251 }, (_, i) => i + 50);
  const heightRange = Array.from({ length: 181 }, (_, i) => i + 120);

  const renderUpdateButton = (field: string) => {
    if (editingField === field) {
      return (
        <Button
          title="Update"
          onPress={() => {
            updateUserData(field, fieldValue);
            setEditingField(null);
          }}
        />
      );
    }
    return null;
  };

  const handleBack = (): void => {
    navigation.navigate("Menu");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.calories}>Recommended Daily Calories:</Text>
      <Text style={styles.calories}>{calorieIntake}</Text>
      <Text>Age: {userData.age}</Text>

      <Text>Weight (kg): {userData.weight}</Text>
      {!editingField && (
        <Button
          title="Update Weight"
          onPress={() => {
            setEditingField("weight");
            setFieldValue(userData.weight || "50");
          }}
        />
      )}
      {editingField === "weight" && (
        <View>
          <Picker
            selectedValue={fieldValue}
            onValueChange={(value) => setFieldValue(value)}
          >
            {weightRange.map((value) => (
              <Picker.Item
                key={value}
                label={value.toString()}
                value={value.toString()}
              />
            ))}
          </Picker>
          {renderUpdateButton("weight")}
        </View>
      )}

      <Text>Height (cm): {userData.height}</Text>
      {!editingField && (
        <Button
          title="Update Height"
          onPress={() => {
            setEditingField("height");
            setFieldValue(userData.height || "120");
          }}
        />
      )}
      {editingField === "height" && (
        <View>
          <Picker
            selectedValue={fieldValue}
            onValueChange={(value) => setFieldValue(value)}
          >
            {heightRange.map((value) => (
              <Picker.Item
                key={value}
                label={value.toString()}
                value={value.toString()}
              />
            ))}
          </Picker>
          {renderUpdateButton("height")}
        </View>
      )}

      <Text>Gender: {userData.gender}</Text>

      <Text>Activity Level: {userData.activityLevel}</Text>
      {!editingField && (
        <Button
          title="Update Activity Level"
          onPress={() => {
            setEditingField("activityLevel");
            setFieldValue(userData.activityLevel || "Low");
          }}
        />
      )}
      {editingField === "activityLevel" && (
        <View>
          <Picker
            selectedValue={fieldValue}
            onValueChange={(value) => setFieldValue(value)}
          >
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Moderate" value="Moderate" />
            <Picker.Item label="Intense" value="Intense" />
          </Picker>
          {renderUpdateButton("activityLevel")}
        </View>
      )}

      <Text>Goal: {userData.goal}</Text>
      {!editingField && (
        <Button
          title="Update Goal"
          onPress={() => {
            setEditingField("goal");
            setFieldValue(userData.goal || "Weight Loss");
          }}
        />
      )}
      {editingField === "goal" && (
        <View>
          <Picker
            selectedValue={fieldValue}
            onValueChange={(value) => setFieldValue(value)}
          >
            <Picker.Item label="Weight Loss" value="Weight Loss" />
            <Picker.Item label="Bulk Up" value="Bulk Up" />
          </Picker>
          {renderUpdateButton("goal")}
        </View>
      )}
      <View style={styles.grid}>
        <View style={styles.gridRow}>
          <Text>Vegetarian</Text>
          <Switch
            onValueChange={() => toggleSwitch("vegetarian")}
            value={preferences.vegetarian}
          />
        </View>
        <View style={styles.gridRow}>
          <Text>Vegan</Text>
          <Switch
            onValueChange={() => toggleSwitch("vegan")}
            value={preferences.vegan}
          />
        </View>
        <View style={styles.gridRow}>
          <Text>Gluten Free</Text>
          <Switch
            onValueChange={() => toggleSwitch("glutenFree")}
            value={preferences.glutenFree}
          />
        </View>
      </View>
      <View style={styles.grid}>
        <View style={styles.gridRow}>
          <Text>Nut Free</Text>
          <Switch
            onValueChange={() => toggleSwitch("nutFree")}
            value={preferences.nutFree}
          />
        </View>
        <View style={styles.gridRow}>
          <Text>Dairy Free</Text>
          <Switch
            onValueChange={() => toggleSwitch("dairyFree")}
            value={preferences.dairyFree}
          />
        </View>
        <View style={styles.gridRow}>
          <Text>Shellfish Free</Text>
          <Switch
            onValueChange={() => toggleSwitch("shellfish")}
            value={preferences.shellfish}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={clearUserData}>
        <Text style={styles.clearText}>Clear User Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleBack}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
    marginBottom: 50,
  },
  calories: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#499096",
    width: 300,
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f9f3d0",
    alignSelf: "center",
    padding: 10,
  },
  clearText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  clearButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 5,
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
});

export default ProfilePage;
