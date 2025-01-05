import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import tw from 'twrnc';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../../firebaseConfig'; // Import your Firebase config

const SignUp = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '915135244048-etvhav73hrvu5j5kms5ns7ftom2hb9ri.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log('Google Sign-In Success:', userCredential.user);
        })
        .catch((error) => {
          console.error('Google Sign-In Error:', error);
        });
    }
  }, [response]);
  
  const handleEmailSignIn = async () => {
    try {
      const email = 'test@example.com'; // Replace with actual email input
      const password = 'password123'; // Replace with actual password input
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Email Sign-In Success:', userCredential.user);
    } catch (error) {
      console.error('Email Sign-In Error:', error.message);
    }
  };

  return (
    <ScrollView style={tw`bg-white`}>
      <Text style={tw`mt-12 text-center text-3xl`}>SignUp</Text>
      <Image style={tw`w-100 h-100`} source={require('../../assets/images/superteam.png')} />
      <View>
        <TouchableOpacity
          style={tw`bg-blue-500 p-4 w-70 flex flex-row rounded-md ml-14 mt-[-20]`}
          onPress={() => promptAsync()}
        >
          <AntDesign name="google" size={24} color="white" />
          <Text style={tw`ml-[10] mt-[-5] text-white text-xl`}>Sign Up With Google</Text>
        </TouchableOpacity>
      </View>
      <Text style={tw`text-center mt-10`}>------ OR ------</Text>
      <View style={tw`mt-20`}>
        <TouchableOpacity
          style={tw`bg-blue-500 p-4 w-70 flex flex-row rounded-md ml-14 mt-[-20]`}
          onPress={handleEmailSignIn}
        >
          <Fontisto name="email" size={24} color="white" />
          <Text style={tw`ml-[10] mt-[-5] text-white text-xl`}>Sign Up With Email</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;
