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
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import FontIcon from "../components/font-icon";
import { colors } from "../assets/colors/colors";
const { height } = Dimensions.get("screen");

function Register({navigation}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !gender || !password || !age || !confirmPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    setLoading(true);
    //local ip (ipconfig)
    const myIp = "192.168.100.5";
    const response = await fetch("http://" + myIp + ":5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: name,
        gender: gender,
        age: age,
        type: "Client",
        password: password,
      }),
    });
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "You have registered successfully!");
      navigation.navigate("Login"); 
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
              source={require("../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.title, { color: colors.primaryRed }]}>
              Register on NeuroVibe
            </Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#999999"
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#999999"
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#999999"
              placeholder="Age"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#999999"
              placeholder="Password"
              secureTextEntry={!showPassword}
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
            <View style={styles.radioGroup}>
              {["Male", "Female"].map((option) => (
                <Pressable
                  key={option}
                  style={[
                    styles.radioButton,
                    gender === option.toLowerCase() &&
                      styles.radioButtonSelected,
                  ]}
                  onPress={() => setGender(option.toLowerCase())}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      gender === option.toLowerCase() &&
                        styles.radioCircleSelected,
                    ]}
                  />
                  <Text style={styles.radioLabel}>{option}</Text>
                </Pressable>
              ))}
            </View>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.registerButtonText}>Register</Text>
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

            <Pressable >
              <Text style={styles.registerText}>
                Already have an account?
                <Text style={styles.registerNow} onPress={()=>{navigation.replace("Login")}}>Login now</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    width: "95%",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
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
    width: 180,
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

export default Register;
