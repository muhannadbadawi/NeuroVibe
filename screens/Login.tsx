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
import FontIcon from "../components/font-icon";
import { colors } from "../assets/colors/colors";
import { loginRequist } from "../config/api";
import { useDispatch } from "react-redux";
import { setUser } from "../config/redux/slices/userSlice";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    try {
      const user = await loginRequist({ email, password });

      // Dispatch user data to Redux store
      dispatch(setUser(user));

      if (user.type === "Client") {
        navigation.navigate("ClientScreen"); // Ensure that you have defined this screen
      } else if (user.type === "Admin") {
        navigation.navigate("AdminScreen");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  const handleRegisterRedirect = () => {
    navigation.navigate("Register");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.title, { color: colors.primaryRed }]}>
            Welcome to NeuroVibe
          </Text>

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.inputBorder }]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="password"
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
            <FontIcon
              type={"ionicon"}
              name={"send"}
              size={20}
              color={"white"}
              style={{ paddingLeft: 10 }}
            />
          </TouchableOpacity>

          <Pressable onPress={handleRegisterRedirect}>
            <Text style={styles.registerText}>
              Don't have an account?{" "}
              <Text style={styles.registerNow}>Register now</Text>
            </Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.background,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputLabel: {
    width: "95%",
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  input: {
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    borderColor: colors.inputBorder,
    color:colors.text,
    backgroundColor:colors.container
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    backgroundColor: colors.primaryRed,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 20,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
export default Login;
