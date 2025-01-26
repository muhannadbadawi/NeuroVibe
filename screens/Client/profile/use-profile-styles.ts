import { Dimensions, TextStyle, ViewStyle } from "react-native";
import { colors } from "../../../assets/colors/colors";

export const useProfileStyles = () => {
  const { height } = Dimensions.get("screen");

  const container: ViewStyle = {
    width: "100%",
    height: height,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.background,
  };
  const logo = {
    width: 150,
    height: 150,
    marginBottom: 5,
  };
  const title = {
    fontSize: 24,
    marginBottom: 20,
  };
  const dateInput = {
    justifyContent: "center",
    height: 50,
  };
  const disabledInput: TextStyle = {
    width: "95%",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    backgroundColor: colors.container,
    color: colors.text,
  };
  const input: TextStyle = {
    width: "95%",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    color: colors.text,
  };
  const picker = {
    width: "95%",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  };
  const radioGroup: ViewStyle = {
    width: "95%",
    flexDirection: "row",
    gap: 50,
    marginBottom: 16,
  };
  const radioGroupLabel = {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: colors.text,
  };
  const radioButton: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  };
  const radioButtonSelected = {
    borderRadius: 8,
  };
  const radioCircle: ViewStyle = {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.inputBorder,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  };
  const radioCircleSelected = {
    backgroundColor: colors.primaryRed,
  };
  const radioLabel = {
    fontSize: 16,
    color: colors.text,
  };

  const registerButton: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    backgroundColor: colors.primaryRed,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 20,
  };
  const registerButtonText: TextStyle = {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  };
  const registerText = {
    marginTop: 20,
    fontSize: 14,
    color: colors.text,
  };
  const registerNow = {
    color: colors.primaryRed,
    fontWeight: "bold",
  };

  return {
    container,
    logo,
    title,
    dateInput,
    disabledInput,
    input,
    picker,
    radioGroup,
    radioGroupLabel,
    radioButton,
    radioButtonSelected,
    radioCircle,
    radioCircleSelected,
    radioLabel,
    registerButton,
    registerButtonText,
    registerText,
    registerNow,
  };
};
