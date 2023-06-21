import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Switch, Button, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as SecureStore from "expo-secure-store";

interface UserData {
  [key: string]: any;
}

interface Preferences {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  nutFree: boolean;
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
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const storedData = await SecureStore.getItemAsync("userProfile");

    if (storedData) {
      const storedUserData = JSON.parse(storedData);
      setUserData(storedUserData);
      setPreferences(storedUserData.preferences);
    }
  };

  const updateUserData = async (key: string, value: any) => {
    const updatedUserData: UserData = {
      ...userData,
      [key]: value,
    };

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
    await SecureStore.deleteItemAsync("userProfile");
    setUserData({});
    setPreferences({
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      nutFree: false,
    });
    navigation.navigate("CreateProfileForm");
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <Text>Age: {userData.age}</Text>

      <Text>Weight: {userData.weight}</Text>
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

      <Text>Height: {userData.height}</Text>
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
            setFieldValue(userData.activityLevel || "low");
          }}
        />
      )}
      {editingField === "activityLevel" && (
        <View>
          <Picker
            selectedValue={fieldValue}
            onValueChange={(value) => setFieldValue(value)}
          >
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Moderate" value="moderate" />
            <Picker.Item label="Intense" value="intense" />
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
            setFieldValue(userData.goal || "weight_loss");
          }}
        />
      )}
      {editingField === "goal" && (
        <View>
          <Picker
            selectedValue={fieldValue}
            onValueChange={(value) => setFieldValue(value)}
          >
            <Picker.Item label="Weight Loss" value="weight_loss" />
            <Picker.Item label="Bulk Up" value="bulk_up" />
          </Picker>
          {renderUpdateButton("goal")}
        </View>
      )}

      <Text>Preferences: </Text>
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
      <Button title="Clear User Data" onPress={clearUserData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default ProfilePage;
