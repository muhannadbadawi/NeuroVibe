import { TextStyle, ViewStyle } from "react-native";
import { colors } from "../../../assets/colors/colors";

export const useHomeStyles = () => {
  const iconColor = colors.text;
  const logoutIconColor = colors.error;
  const activeIconColor = colors.primaryBlue;

  const container: ViewStyle = {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 10, 
    marginTop:50
  };
  
  const title: TextStyle = {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginVertical: 16,
  };

  const imageContainer: ViewStyle = {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    marginVertical: 10,
  };

  return {
    container,
    imageContainer,
    iconColor,
    logoutIconColor,
    activeIconColor,
    title
  };
};
