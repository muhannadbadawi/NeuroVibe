import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FontIcon from "../../components/font-icon";
import { TabsEnum } from "../../enums/tabs-enum";
import { useAdminStyles } from "./use-admin-styles";
import HomeScreen from "./home/home";
import UsersManagement from "./users-management/user-management";
import { logoutFormServer } from "../../config/api";


const AdminScreen = ({ navigation }) => {
  const {
    container,
    tabsContainer,
    tabsinnerContainer,
    iconColor,
    activeIconColor,
  } = useAdminStyles();
  const [activeScreen, setActiveScreen] = useState<TabsEnum>(TabsEnum.Home);
  const [result, setResult] = useState(0);
  
  const changeScreen = (tabName: TabsEnum) => {
    setActiveScreen(tabName);
  };

  const logout = async () => {
    await logoutFormServer()
    navigation.navigate("Login"); // Ensure that you have defined this screen
  }

  const getIconColor = (tabName: TabsEnum): string => {
    if (tabName === TabsEnum.Home) {
      if (
        activeScreen === TabsEnum.FilesUpload ||
        activeScreen === TabsEnum.Result
      ) {
        return activeIconColor;
      }
    }
    return tabName === activeScreen ? activeIconColor : iconColor;
  };

  const renderFocusTab = () => {
      switch (activeScreen) {
        case TabsEnum.Home:
          return <HomeScreen />;
        case TabsEnum.UsersManagement:
          return <UsersManagement />;
        default:
    return null;
      }
  };
  return (
    <View style={container}>
      {renderFocusTab()}
      <View style={tabsContainer}>
        <View style={tabsinnerContainer}>
          <FontIcon
            type="ionicon"
            name="home"
            size={25}
            color={getIconColor(TabsEnum.Home)}
            onPress={() => changeScreen(TabsEnum.Home)}
          />
          <FontIcon
            type="fa"
            name="users"
            size={20}
            color={getIconColor(TabsEnum.UsersManagement)}
            onPress={() => changeScreen(TabsEnum.UsersManagement)}
          />
          <FontIcon
            type="material"
            name="logout"
            size={20}
            color={iconColor} // Logout is not active, keeping a default color
            onPress={() => logout()}
          />
        </View>
      </View>
    </View>
  );
};

export default AdminScreen;
