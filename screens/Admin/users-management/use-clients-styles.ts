import { TextStyle, ViewStyle } from "react-native";
import { colors } from "../../../assets/colors/colors";

export const useClientsStyles = () => {
  const container: ViewStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: colors.background,
    padding: 16,
    marginTop: 50,
  };
  const deleteButton: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    height:50,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical:4,
    marginLeft: 8,
  };

  const title: TextStyle = {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginVertical: 16,
  };

  const tableRow: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  };

  const tableCell: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 8,
  };

  const date: TextStyle = {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.text,
  };

  const result: TextStyle = {
    fontSize: 12,
    color: colors.text,
  };

  const emptyState: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  };

  const noClients: TextStyle = {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 16,
  };

  return {
    container,
    title,
    tableRow,
    tableCell,
    date,
    result,
    emptyState,
    noClients,
    deleteButton,
  };
};
