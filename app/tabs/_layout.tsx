import React from "react";
import { Tabs, useRouter } from "expo-router";
import FontIcon from "@/components/font-icon";
import { Pressable, View, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontIcon type={"ant"} name={"home"} size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontIcon type={"ionicon"} name={"person"} size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Logout",
          tabBarIcon: ({ color }) => (
            <FontIcon type={"material"} name={"logout"} size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = {
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CB2C3E", // Match primary red color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%", // Full width to look like a tab
    height: "100%", // Ensure it's the same height as other tabs
  },
  logoutText: {
    color: "white",
    marginLeft: 5,
    fontSize: 14,
  },
};
