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
  Alert,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import FontIcon from "../../../components/font-icon";
import { colors } from "../../../assets/colors/colors";
import { useSelector } from "react-redux";
import { TabsEnum } from "../../../enums/tabs-enum";
import { changePassword } from "../../../config/api";
const { height } = Dimensions.get("screen");

interface IProps {
  changeScreen: (tabName: TabsEnum) => void;
}

function ChangePassword({ changeScreen }: IProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    if (!oldPassword || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    setLoading(true);
    //local ip (ipconfig)
    await changePassword(oldPassword, password)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Image
              source={require("../../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.title, { color: colors.primaryRed }]}>
              Change Password
            </Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#999999"
              placeholder="Old Password"
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#999999"
              placeholder="New Password"
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#999999"
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Text style={{color: colors.text}}>
              To edit your profile, please ensure all fields are filled in.
            </Text>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleEdit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.registerButtonText}>Edit</Text>
                  <FontIcon
                    type={"ionicon"}
                    name={"send"}
                    size={20}
                    color={"white"}
                    style={{ paddingLeft: 10 }}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.background,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  dateInput: {
    justifyContent: "center",
    height: 50,
  },
  disabledInput: {
    width: "95%",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    backgroundColor: colors.container,
  },
  input: {
    width: "95%",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    color: colors.text
  },
  picker: {
    width: "95%",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  radioGroup: {
    width: "95%",
    flexDirection: "row",
    gap: 50,
    marginBottom: 16,
  },
  radioGroupLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: colors.text,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButtonSelected: {
    borderRadius: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.inputBorder,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleSelected: {
    backgroundColor: colors.primaryRed,
  },
  radioLabel: {
    fontSize: 16,
    color: colors.text,
  },

  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    backgroundColor: colors.primaryRed,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 20,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  registerText: {
    marginTop: 20,
    fontSize: 14,
    color: colors.text,
  },
  registerNow: {
    color: colors.primaryRed,
    fontWeight: "bold",
  },
});

export default ChangePassword;
