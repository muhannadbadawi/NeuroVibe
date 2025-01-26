import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { fitchHistory } from "../../../config/api";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useHistoryStyles } from "./use-history-styles";

interface HistoryItem {
  id: string;
  date: string;
  result: number;
}
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
const HistoryScreen: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const styles = useHistoryStyles();
  const user = useSelector((state: any) => state.user);

  const getHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const historyList = await fitchHistory(user.email);
      if (historyList) {
        setHistory(historyList);
      } else {
        setHistory([]);
      }
    } catch (error) {
      setError("Failed to fetch history. Please try again.");
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getHistory();
    setRefreshing(false);
  };

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.tableRow}>
      <View style={styles.tableCell}>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.result}>{cars[item.result - 1].name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your History</Text>
      {error && <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>}
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : history.length > 0 ? (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderHistoryItem}
          contentContainerStyle={{ paddingVertical: 16 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialIcons name="sentiment-dissatisfied" size={64} color="#888" />
          <Text style={styles.noHistory}>No history available.</Text>
        </View>
      )}
    </View>
  );
};

export default HistoryScreen;
