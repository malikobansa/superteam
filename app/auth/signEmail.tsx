import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import tw from "twrnc";
import { Client, Account, ID } from "react-native-appwrite";
import { useRouter } from "expo-router";

// Initialize Appwrite Client
const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1") // Replace with your endpoint
      .setProject("677a5bb10006d3cc1736"); // Replace with your project ID

const account = new Account(client);

const SignEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For registration
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register

  // Handle User Login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await account.createEmailPasswordSession(email, password);
      console.log("User signed in:", response);
      Alert.alert("Success", "You have signed in successfully!");
      router.push("../home"); // Redirect to the home page after login
    } catch (error) {
      console.error("Error signing in:", error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle User Registration
  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      // Use a custom userId (e.g., generated UUID or any unique identifier with 36 or fewer valid characters)
      const userId = ID.custom(`${name}-${Date.now()}`); // Ensure it's unique and valid
      const response = await account.create(userId, email, password, name);
      console.log("User registered:", response);
  
      // Automatically log in the user after registration
      await handleLogin();
    } catch (error) {
      console.error("Error registering user:", error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
      console.log("Generated userId:", userId);

    }
  };
  
  return (
    <View style={tw`flex-1 justify-center px-6 bg-gray-100`}>
      <Text style={tw`text-xl font-bold text-center mb-6`}>
        {isRegistering ? "Register with Email" : "Sign In with Email"}
      </Text>

      {/* Name Input (only for registration) */}
      {isRegistering && (
        <TextInput
          style={tw`h-12 border border-gray-300 rounded px-3 bg-white mb-4`}
          placeholder="Name"
          autoCapitalize="words"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      )}

      {/* Email Input */}
      <TextInput
        style={tw`h-12 border border-gray-300 rounded px-3 bg-white mb-4`}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      {/* Password Input */}
      <TextInput
        style={tw`h-12 border border-gray-300 rounded px-3 bg-white mb-4`}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={tw`h-12 bg-blue-500 rounded justify-center items-center`}
        onPress={isRegistering ? handleRegister : handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={tw`text-white text-base font-bold`}>
            {isRegistering ? "Register" : "Sign In"}
          </Text>
        )}
      </TouchableOpacity>

      {/* Toggle Button */}
      <TouchableOpacity
        style={tw`mt-4`}
        onPress={() => setIsRegistering(!isRegistering)}
      >
        <Text style={tw`text-blue-500 text-center`}>
          {isRegistering ? "Already have an account? Sign In" : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignEmail;
