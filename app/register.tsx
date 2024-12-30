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
} from "react-native";
import { useRouter } from "expo-router";
import FontIcon from "@/components/font-icon";

const colors = {
    primaryRed: "#CB2C3E",
    background: "#FFFFFF",
    text: "#333333",
    inputBorder: "#E0E0E0",
    error: "#FF0000",
};

function Register() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = () => {
        if (!name || !email || !phone || !password || !confirmPassword) {
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
                        placeholder="Phone"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
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
                                <FontIcon type="ionicon" name="checkmark" size={20} color="white" />
                            </>
                        )}
                    </TouchableOpacity>
                    <Text style={styles.registerText}>
                        Already have an account?{" "}
                        <Text
                            style={styles.registerNow}
                            onPress={() => router.push("/")}
                        >
                            Login now
                        </Text>
                    </Text>
                </View>
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
    input: {
        width: "95%",
        borderWidth: 1,
        borderColor: colors.inputBorder,
        borderRadius: 10,
        padding: 10,
        marginBottom: 16,
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
