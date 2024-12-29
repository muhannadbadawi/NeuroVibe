import React from "react";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
                  <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
            {/* <Tabs.Screen name="home" /> */}
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}
