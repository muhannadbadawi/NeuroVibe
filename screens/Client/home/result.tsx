import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../../../assets/colors/colors";

interface IProps {
  result: number;
}

const ResultScreen = ({ result }: IProps) => {
  const cars = [
    {
      name:"Porsche",
      source: require("../../../assets/images/cars/car1.png"),
    },
    {
      name:"Tesla",
      source: require("../../../assets/images/cars/car2.png"),
    },
    {
      name:"BMW",
      source: require("../../../assets/images/cars/car3.png"),
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Your most valued</Text>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <View style={{ width: "80%", height: 170 }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            source={cars[result - 1].source}
          />
        </View>
      </View>
      <Text style={styles.resultText}>Result: {cars[result - 1].name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: colors.text,
  },
});

export default ResultScreen;
