import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Register from "./screens/Register";
import ClientScreen from "./screens/Client/client-screen";
import AdminScreen from "./screens/Admin/admin-screen";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="ClientScreen" component={ClientScreen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
