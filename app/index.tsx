import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();
  return (
    <View style={tw`flex-1 bg-white`}>
      {/* First Image (Fixed Position) */}
      <Image
        style={[
          tw`w-80 h-20 absolute top-12 left-10`, // `absolute` to fix its position
          { transform: [{ scale: 0.5 }] },
        ]}
        source={require('../assets/images/earn-logo-dark.png')} // Adjust the path as needed
        contentFit="cover"
        transition={1000}
      />

      {/* Second Image (With Border Radius) */}
      <View style={tw`flex-1 justify-center items-center`}>
        <Image
          style={[
            tw`w-90 h-100 mt-10 absolute rounded-lg bg-black`, // Added `rounded-lg` for border radius
            { transform: [{ scale: 1.5 }] }, // Added scale transformation correctly
          ]}
          source={require('../assets/images/super.png')} // Adjust the path as needed
          contentFit="cover"
          transition={1000}
        />
        <Text style={tw`text-white mt-52 text-3xl ml-10 w-90 text-gray-100 bg-black p-1`}>
          Find Your Next High Paying Crypto Gig
        </Text>
        <Text style={tw` mt-10 ml-5 text-xl bg-black text-white rounded-sm p-2`}>Participate in bounties or apply to freelance gigs of world-class crypto companies, all with a single profile.</Text>
        <TouchableOpacity style={tw`bg-white p-8 w-50 rounded-xl mt-10`} onPress={() => router.push("/auth/signup")}>
          <Text style={tw`bg-white text-2xl text-blue-500 text-center`}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
