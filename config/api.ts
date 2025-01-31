import axios from "axios";
import { registerModel } from "./models/registerModel";
import { loginModel } from "./models/loginModel";
import { Alert } from "react-native";

const myIp = "172.31.99.235";
export const loginRequist = async (model: loginModel) => {
  const response = await fetch(`http://${myIp}:5000/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...model,
    }),
  });
  const result = await response.json();

  if (response.ok) {
    const user = result.user;
    return user;
  } else {
    Alert.alert("Error", result.message);
  }
};

export const registerRequist = async (model: registerModel) => {
  const response = await fetch("http://" + myIp + ":5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...model,
      type: "Client",
    }),
  });
  return response;
};

export const uploadFilesRequist = async (formData) => {
  const response = await axios.post(`http://${myIp}:5000/emotion`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const fitchHistory = async (email: string) => {
  console.log("Fetching history...");
  try {
    const response = await fetch(`http://${myIp}:5000/history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (response.ok) {
      return result.history;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching history: ", error);
    return [];
  }
};

export const fitchCarsCount = async () => {
  console.log("Fitch Cars Count...");
  try {
    const response = await fetch(`http://${myIp}:5000/carsCount`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result = await response.json();

    if (response.ok) {
      return result.counts;
    } else {
      Alert.alert("Error", result.message || "Failed to fetch history.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching history: ", error);
    Alert.alert("Error", "Something went wrong. Please try again.");
    return [];
  }
};

export const updateProfile = async (
  name: string,
  age: string,
  gender: string,
  password: string
) => {
  console.log("Update Profile...");
  try {
    const response = await fetch(`http://${myIp}:5000/updateProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, age, gender, password }),
    });

    const result = await response.json();

    if (response.ok) {
      return result.history;
    } else {
      Alert.alert("Error", result.message || "Failed to fetch history.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching history: ", error);
    Alert.alert("Error", "Something went wrong. Please try again.");
    return [];
  }
};

export const fitchClients = async () => {
  console.log("Fetching Clients...");
  try {
    const response = await fetch(`http://${myIp}:5000/clients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result = await response.json();
    console.log("result: ", result.clients);

    if (response.ok) {
      return result.clients;
    } else {
      Alert.alert("Error", result.message || "Failed to fetch history.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching history: ", error);
    Alert.alert("Error", "Something went wrong. Please try again.");
    return [];
  }
};

export const deleteClient = async (clientId: string) => {
  try {
    const response = await fetch(`http://${myIp}:5000/changePassword`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ clientId }),
    });
    
    const result = await response.json();

    if (!response.ok) {
      Alert.alert("Error", result.message);
    }
  } catch (error) {
    console.error("Error delete: ", error);
    Alert.alert("Error", "Something went wrong. Please try again.");
    return [];
  }
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  console.log("Change Password...");
  try {
    const response = await fetch(`http://${myIp}:5000/changePassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const result = await response.json();

    if (response.ok) {
      Alert.alert("Success", result.message || "YOUR PASSWORD HAS BEEN CHANGED.");
    } else {
      Alert.alert("Error", result.message || "Failed to fetch history.");
    }
  } catch (error) {
    console.error("Error fetching history: ", error);
    Alert.alert("Error", "Something went wrong. Please try again.");
    return [];
  }
};

export const logoutFormServer = async () => {
  try {
    await fetch(`http://${myIp}:5000/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  } catch (error) {
    console.error("Error logout: ", error);
    Alert.alert("Error", "Something went wrong. Please try again.");
    return [];
  }
};
