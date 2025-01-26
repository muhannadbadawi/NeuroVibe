import { colors } from "../../assets/colors/colors";
import { ViewStyle } from "react-native";

export const useClientStyles = () => {
  const iconColor = colors.text;
  const logoutIconColor = colors.error;
  const activeIconColor = colors.primaryRed;

  const container: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background,
  };

  const tabsContainer: ViewStyle = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 90,
    backgroundColor: colors.container,
    paddingBottom:20,
  };

  const tabsinnerContainer: ViewStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 35,
  };

  return {
    container,
    tabsContainer,
    tabsinnerContainer,
    iconColor,
    logoutIconColor,
    activeIconColor
  };
};