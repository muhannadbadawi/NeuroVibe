import React, { useState } from "react";
import { View } from "react-native";
import FontIcon from "../../components/font-icon";
import { TabsEnum } from "../../enums/tabs-enum";
import { useClientStyles } from "./use-client-styles";
import HomeScreen from "./home/home";
import FilesUploadScreen from "./home/files-upload";
import HistoryScreen from "./history/history";
import ProfileScreen from "./profile/profile";
import ResultScreen from "./home/result";
import ChangePassword from "./profile/change-password";
import { logoutFormServer } from "../../config/api";

const ClientScreen = ({ navigation }) => {
  const {
    container,
    tabsContainer,
    tabsinnerContainer,
    iconColor,
    activeIconColor,
  } = useClientStyles();
  const [activeScreen, setActiveScreen] = useState<TabsEnum>(TabsEnum.Home);
  const [result, setResult] = useState(0);

  const changeScreen = (tabName: TabsEnum) => {
    setActiveScreen(tabName);
  };

  const logout = async () => {
    await logoutFormServer();
    navigation.navigate("Login"); // Ensure that you have defined this screen
  };

  const changeResult = (imageResult) => {
    setResult(imageResult);
  };

  const getIconColor = (tabName: TabsEnum): string => {
    if (tabName === TabsEnum.Home) {
      if (
        activeScreen === TabsEnum.FilesUpload ||
        activeScreen === TabsEnum.Result
      ) {
        return activeIconColor;
      }
    }
    if(tabName === TabsEnum.Profile && activeScreen === TabsEnum.ChangePassword){
      return activeIconColor;
    } 
    return tabName === activeScreen ? activeIconColor : iconColor;
  };

  const renderFocusTab = () => {
    switch (activeScreen) {
      case TabsEnum.Home:
        return <HomeScreen changeScreen={changeScreen} />;
      case TabsEnum.FilesUpload:
        return (
          <FilesUploadScreen
            changeScreen={changeScreen}
            changeResult={changeResult}
          />
        );
      case TabsEnum.Result:
        return <ResultScreen result={result} />; //result
      case TabsEnum.History:
        return <HistoryScreen />;
      case TabsEnum.Profile:
        return <ProfileScreen changeScreen={changeScreen} />;
      case TabsEnum.ChangePassword:
        return <ChangePassword changeScreen={changeScreen} />;
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
            type="fa5"
            name="user-edit"
            size={20}
            color={getIconColor(TabsEnum.Profile)}
            onPress={() => changeScreen(TabsEnum.Profile)}
          />
          <FontIcon
            type="materialCommunity"
            name="history"
            size={25}
            color={getIconColor(TabsEnum.History)}
            onPress={() => changeScreen(TabsEnum.History)}
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

export default ClientScreen;
