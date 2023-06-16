import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

const CreateProfileForm = ({ navigation }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Name:", name);
    console.log("Email:", email);
    // You can perform additional actions like API calls, validation, etc.

    // Reset the form fields
    setName("");
    setEmail("");
    navigation.navigate("Menu");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Fitness Tracker!</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
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
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default CreateProfileForm;