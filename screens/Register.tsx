import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Pressable,
  ScrollView
} from "react-native";
import FontIcon from "../components/font-icon";
import { colors } from "../assets/colors/colors";
import { registerModel } from "../config/models/registerModel";
import { registerRequist } from "../config/api";
import { useRegisterStyles } from "./use-register-styles";

function Register({navigation}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const styles = useRegisterStyles()
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
    await registerRequist({name:name,email:email,gender:gender,password:password,age:age}as registerModel)
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
              value={password}
              secureTextEntry
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
                <Text style={styles.registerNow} onPress={()=>{navigation.replace("Login")}}> Login now</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
export default Register;