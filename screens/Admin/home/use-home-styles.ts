import { TextStyle, ViewStyle } from "react-native";

export const useHomeStyles = () => {
  const container:ViewStyle = {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    padding: 20,
  };
  const title:TextStyle = {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  };
  const noDataText:TextStyle = {
    fontSize: 16,
    color: "#FF7777",
    marginVertical: 20,
  };

  return {
    container,
    title,
    noDataText,
  };
};
