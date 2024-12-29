import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

const baseUrl = "http://192.168.1.189:5000/api/";

// Import required modules and components

export default function LogoutScreen() {
  const router = useRouter(); // Initialize the router for navigation

  useEffect(() => {
    router.push("/"); // Navigate to the index (home or login) page
  }, []);

  return (
    <View>
      <Text>Logging out...</Text>
    </View>
  );
}
