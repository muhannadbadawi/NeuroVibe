import React from "react";
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
    TouchableOpacity, // Import TouchableOpacity for custom button
} from "react-native";
import { useRouter } from "expo-router";
import FontIcon from "@/components/font-icon";

// Define colors (simplified)
const colors = {
    primaryRed: "#CB2C3E", // Red from your logo
    background: "#FFFFFF", // White background
    text: "#333333",       // Dark text for readability
    inputBorder: "#E0E0E0", // Lighter gray for input borders
};

export default function Login() {
    const router = useRouter();

    const handleLogin = () => {
        // Logic for authentication
        router.push('/(tabs)'); // Navigate to the "tabs" route
    };

    const handleRegisterRedirect = () => {
        // Logic for navigating to the registration screen
        router.push('/register'); // Adjust the route to your registration screen
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {/* Logo */}
                    <Image
                        source={require("../assets/images/logo.png")} // Replace with your image path
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={[styles.title, { color: colors.primaryRed }]}>
                        Welcome to NeuroVibe
                    </Text>
                    <TextInput
                        style={[styles.input, { borderColor: colors.inputBorder }]}
                        placeholder="Username"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={[styles.input, { borderColor: colors.inputBorder }]}
                        placeholder="Password"
                        secureTextEntry
                    />
                    
                    {/* Custom Login Button */}
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                        <FontIcon type={"ionicon"} name={"send"} size={20} color={"white"} style={{ paddingLeft: 10 }} />
                    </TouchableOpacity>

                    {/* Register Redirect Text */}
                    <TouchableOpacity onPress={handleRegisterRedirect}>
                        <Text style={styles.registerText}>
                            Don't have an account? <Text style={styles.registerNow}>Register now</Text>
                        </Text>
                    </TouchableOpacity>
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
        backgroundColor: colors.background, // White background
    },
    logo: {
        width: 150, // Set width of the image
        height: 150, // Set height of the image
        marginBottom: 20, // Add spacing below the logo
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: "95%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 16,
    },
    loginButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 180,
        backgroundColor: colors.primaryRed, // Red background for the button
        paddingVertical: 10,                // Vertical padding for the button
        paddingHorizontal: 30,              // Horizontal padding for the button
        borderRadius: 15,                   // Rounded corners
        marginTop: 20,                      // Spacing from the previous elements
    },
    loginButtonText: {
        color: "#FFFFFF", // White text color
        fontSize: 18,     // Text size
        fontWeight: "bold", // Bold text
        textAlign: "center", // Center-align text
    },
    registerText: {
        marginTop: 20,
        fontSize: 14,
        color: colors.text,
    },
    registerNow: {
        color: colors.primaryRed, // Make "Register now" red to highlight
        fontWeight: "bold",
    },
});