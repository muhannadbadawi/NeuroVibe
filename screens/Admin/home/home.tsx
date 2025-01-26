import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { TabsEnum } from "../../../enums/tabs-enum";
import { fitchCarsCount } from "../../../config/api";
import { useHomeStyles } from "./use-home-styles";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const [cars, setCars] = useState<any[]>([]);
  const styles = useHomeStyles();
  const getCarsCount = async () => {
    try {
      const carsList = await fitchCarsCount();

      if (carsList) {
        setCars([
          {
            name: "Porsche",
            population: carsList.car1,
            color: "#767A86",
            legendFontColor: "#767A86",
            legendFontSize: 15,
          },
          {
            name: "Tesla",
            population: carsList.car2,
            color: "#DBD9DA",
            legendFontColor: "#DBD9DA",
            legendFontSize: 15,
          },

          {
            name: "BMW",
            population: carsList.car3,
            color: "#354B7C",
            legendFontColor: "#354B7C",
            legendFontSize: 15,
          },
        ]);
      } else {
        setCars([]);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    getCarsCount();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.title}>Popularity Of Cars</Text>
      <View
        style={{
          width: "100%",
          height: 150,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "30%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            source={require("../../../assets/images/cars/car1.png")}
          />
          <Text style={{ color: "white", textAlign: "center" }}>
            Porsche 911 GT3 RS
          </Text>
        </View>
        <View
          style={{
            width: "30%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            source={require("../../../assets/images/cars/car2.png")}
          />
          <Text style={{ color: "white", textAlign: "center" }}>
            Tesla Model X
          </Text>
        </View>
        <View
          style={{
            width: "30%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            source={require("../../../assets/images/cars/car3.png")}
          />
          <Text style={{ color: "white", textAlign: "center" }}>BMW M3</Text>
        </View>
      </View>
      {cars.length > 0 ? (
        <PieChart
          data={cars}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientTo: "#08130D",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          style={{ paddingTop: 50 }}
          paddingLeft={"15"}
          center={[0, 0]}
          absolute
        />
      ) : (
        <Text style={styles.noDataText}>No data available</Text>
      )}
    </View>
  );
};

export default HomeScreen;
