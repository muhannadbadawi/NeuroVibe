import { TextStyle, ViewStyle } from "react-native";
import { colors } from "../../../assets/colors/colors";

export const useHistoryStyles = () => {
  const container: ViewStyle = {
    width:"100%",
    height:"100%",
    backgroundColor: colors.background,
    paddingBottom: 50,
    marginTop:50
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  };

  const tableCell: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  };

  const date: TextStyle = {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  };

  const result: TextStyle = {
    fontSize: 14,
    color: colors.text,
  };

  const emptyState: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  };

  const noHistory: TextStyle = {
    fontSize: 16,
    color: colors.text,
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
    noHistory,
  };
};
