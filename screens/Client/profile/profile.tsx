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
import FontIcon from "../../../components/font-icon";
import { colors } from "../../../assets/colors/colors";
import { useSelector } from "react-redux";
import { TabsEnum } from "../../../enums/tabs-enum";
import { useProfileStyles } from "./use-profile-styles";
import { updateProfile } from "../../../config/api";
const { height } = Dimensions.get("screen");

interface IProps {
  changeScreen: (tabName: TabsEnum) => void;
}

function ProfileScreen({ changeScreen }: IProps) {
  const user = useSelector((state: any) => state.user);
  const {
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
  } = useProfileStyles();
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateToChangePassword = () => {
    changeScreen(TabsEnum.ChangePassword);
  };

  const handleEdit = async () => {
    if (!name || !gender || !password || !age) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    setLoading(true);
    //local ip (ipconfig)
    await updateProfile(name, age, gender, password);
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
          <View style={container}>
            <Image
              source={require("../../../assets/images/logo.png")}
              style={logo}
              resizeMode="contain"
            />
            <Text style={[title, { color: colors.primaryRed }]}>Profile</Text>
            <TextInput
              style={disabledInput}
              placeholderTextColor="#999999"
              placeholder="Email"
              keyboardType="email-address"
              value={user.email}
              editable={false}
            />
            <TextInput
              style={input}
              placeholderTextColor="#999999"
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={input}
              placeholderTextColor="#999999"
              placeholder="Age"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
            <TextInput
              style={input}
              placeholderTextColor="#999999"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
            <View style={radioGroup}>
              {["Male", "Female"].map((option) => (
                <Pressable
                  key={option}
                  style={[
                    radioButton,
                    gender === option.toLowerCase() && radioButtonSelected,
                  ]}
                  onPress={() => setGender(option.toLowerCase())}
                >
                  <View
                    style={[
                      radioCircle,
                      gender === option.toLowerCase() && radioCircleSelected,
                    ]}
                  />
                  <Text style={radioLabel}>{option}</Text>
                </Pressable>
              ))}
            </View>
            <Text style={{ color: "white" }}>
              To edit your profile, please ensure all fields are filled in.
            </Text>
            <TouchableOpacity
              style={registerButton}
              onPress={navigateToChangePassword}
              disabled={loading}
            >
              <>
                <Text style={registerButtonText}>Change Password</Text>
                <FontIcon
                  type={"ionicon"}
                  name={"key"}
                  size={20}
                  color={"white"}
                  style={{ paddingLeft: 10 }}
                />
              </>
            </TouchableOpacity>
            <TouchableOpacity
              style={registerButton}
              onPress={handleEdit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={registerButtonText}>Edit</Text>
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

export default ProfileScreen;
