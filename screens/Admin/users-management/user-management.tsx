import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { fitchClients } from "../../../config/api"; // Assume deleteClient API is available
import { MaterialIcons } from "@expo/vector-icons";
import { useClientsStyles } from "./use-clients-styles";

interface ClientItem {
  id: string;
  name: string;
  age: string;
  email: string;
  gender: string;
}

const UsersManagement: React.FC = () => {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const styles = useClientsStyles();

  const getClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const clientsList = await fitchClients();
      setClients(clientsList || []);
    } catch (error) {
      setError("Failed to fetch clients. Please try again.");
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (clientId: string) => {
    Alert.alert(
      "Delete Client",
      "Are you sure you want to delete this client?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
            //   await deleteClient(clientId); // Call the API to delete the client
              setClients((prevClients) =>
                prevClients.filter((client) => client.id !== clientId)
              );
              Alert.alert("Success", "Client deleted successfully.");
            } catch (error) {
              console.error("Error deleting client:", error);
              Alert.alert("Error", "Failed to delete the client. Please try again.");
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getClients();
    setRefreshing(false);
  };

  const renderClientItem = ({ item }: { item: ClientItem }) => (
    <View style={styles.tableRow}>
      <View style={styles.tableCell}>
        <Text style={styles.date}>{item.name}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.result}>{item.email}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.result}>{item.gender}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.result}>{item.age}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <MaterialIcons name="delete" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clients</Text>
      {error && <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>}
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : clients.length > 0 ? (
        <FlatList
          data={clients}
          keyExtractor={(item) => item.id}
          renderItem={renderClientItem}
          contentContainerStyle={{ paddingVertical: 16 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialIcons name="sentiment-dissatisfied" size={64} color="#888" />
          <Text style={styles.noClients}>No clients available.</Text>
        </View>
      )}
    </View>
  );
};

export default UsersManagement;
