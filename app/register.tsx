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
} from "react-native";
import { useRouter } from "expo-router";
import FontIcon from "@/components/font-icon";
import { colors } from "@/assets/colors/colors";
import DateTimePicker from "@react-native-community/datetimepicker";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false); // Close the picker
    if (selectedDate) {
      // Format the date as YYYY-MM-DD
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setDateOfBirth(formattedDate);
    }
  };

  const handleRegister = () => {
    if (
      !name ||
      !email ||
      !gender ||
      !dateOfBirth ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "You have registered successfully!");
      router.push("/");
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
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
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Pressable
              style={[styles.input, styles.dateInput]}
              onPress={() => setShowPicker(true)}
            >
              <Text style={{ color: dateOfBirth ? "#000" : "#999" }}>
                {dateOfBirth || "Date of Birth (YYYY-MM-DD)"}
              </Text>
            </Pressable>

            {showPicker && (
              <DateTimePicker
                value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "calendar"} // Better Android UI
                onChange={(event, selectedDate) => {
                  setShowPicker(Platform.OS === "ios"); // Keep open on iOS
                  if (selectedDate) {
                    const formattedDate = selectedDate
                      .toISOString()
                      .split("T")[0];
                    setDateOfBirth(formattedDate);
                  }
                }}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
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

            <Pressable onPress={() => router.push("/")}>
              <Text style={styles.registerText}>
                Already have an account?{" "}
                <Text style={styles.registerNow}>Login now</Text>
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
    flexDirection:"row",
    gap:50,
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
