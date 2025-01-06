import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import tw from "twrnc";
import { Client, Account } from "appwrite";
import AppwriteOauth from "react-native-appwrite-oauth";
import { useRouter } from "expo-router";

// Initialize Appwrite Client
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("677a5bb10006d3cc1736"); // Replace with your project ID

const account = new Account(client);

const SignUp = () => {
  const router = useRouter();
  const [authenticating, setAuthenticating] = useState(false);

  const handleSuccess = (session) => {
    setAuthenticating(false);
    console.log("Google Sign-In Successful:", session);
    Alert.alert("Success", "Google Sign-In Successful!");
    router.push("/home"); // Navigate to the home screen
  };

  const handleFailure = (error) => {
    setAuthenticating(false);
    console.error("Google Sign-In Failed:", error);
    Alert.alert("Error", `Google Sign-In Failed: ${error.message}`);
  };

  return (
    <ScrollView style={tw`bg-white`}>
      <Text style={tw`mt-12 text-center text-3xl`}>Sign Up</Text>
      <Image
        style={tw`w-100 h-100`}
        source={require("../../assets/images/superteam.png")}
      />
      <View style={tw`mt-10`}>
        <AppwriteOauth
          account={account}
          authenticating={authenticating}
          provider="google"
          onSuccess={handleSuccess}
          onFailure={handleFailure}
        />
        <TouchableOpacity
          style={tw`bg-blue-500 p-4 flex flex-row rounded-md mx-14`}
          onPress={() => setAuthenticating(true)}
        >
          <Text style={tw`text-white text-xl ml-2`}>Sign Up With Google</Text>
        </TouchableOpacity>
      </View>

      <Text style={tw`text-center mt-10`}>------ OR ------</Text>
      <View style={tw`mt-20`}>
        <TouchableOpacity
          style={tw`bg-blue-500 p-4 flex flex-row rounded-md mx-14`}
          onPress={() => router.push("/auth/signEmail")}
        >
          <Text style={tw`text-white text-xl ml-2`}>Sign Up With Email</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;
