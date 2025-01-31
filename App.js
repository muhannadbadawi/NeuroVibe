import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./MainStackNavigator";
import { Provider } from 'react-redux';
import store from './config/redux/store'; // Import your store

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </Provider>
  );
}
