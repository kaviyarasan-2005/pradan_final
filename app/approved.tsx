import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useFormStore } from "../storage/useFormStore";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

const statusStyles = {
  Approved: {
    backgroundColor: "#C8E6C9",
    textColor: "#2E7D32",
  },
};

const Approved = () => {
  const router = useRouter();
  const { submittedForms, loadSubmittedForms, deleteFormByIndex } = useFormStore();
  const { showActionSheetWithOptions } = useActionSheet();

  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  useEffect(() => {
    loadSubmittedForms();
  }, []);

  const openFilterSheet = () => {
    const options = ["ALL", "LAND", "POND", "PLANTATION", "Cancel"];
    const cancelButtonIndex = 4;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: "Filter by Form Type",
      },
      (buttonIndex) => {
        if (buttonIndex !== cancelButtonIndex) {
          setSelectedFilter(options[buttonIndex]);
        }
      }
    );
  };

  const handleCardPress = (item) => {
    const formType = item.formType?.toLowerCase();
    let previewPath = "";

    if (formType === "land") {
      previewPath = "/landform/Preview";
    } else if (formType === "pond") {
      previewPath = "/pondform/Preview";
    } else if (formType === "plantation") {
      previewPath = "/plantationform/Preview";
    } else {
      alert("Unknown form type.");
      return;
    }

    router.push({ pathname: previewPath, params: { id: item.id } });
  };

  const handleDelete = (index) => {
    Alert.alert("Delete Form", "Are you sure you want to delete this form?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          deleteFormByIndex(index);
        },
        style: "destructive",
      },
    ]);
  };

  const filteredForms = submittedForms.filter((item) => {
    const isApproved = item.formStatus === "Approved";
    const matchesType = selectedFilter === "ALL" || item.formType === selectedFilter;
    const matchesSearch = item.basicDetails?.name?.toLowerCase().includes(searchText.toLowerCase());
    return isApproved && matchesType && matchesSearch;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/dashboard")} style={styles.icon}>
          <Ionicons name="arrow-back" size={24} color="#1B5E20" />
        </TouchableOpacity>
        <Text style={styles.title}>Approved Forms</Text>
        <TouchableOpacity onPress={openFilterSheet} style={styles.icon}>
          <MaterialIcons name="filter-list" size={24} color="#1B5E20" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={16} color="#1B5E20" style={styles.searchIcon} />
        <TextInput
          placeholder="Search by farmer name"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* No data */}
      {filteredForms.length === 0 ? (
        <Text style={styles.noDataText}>No approved forms yet.</Text>
      ) : (
        filteredForms.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleCardPress(item)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{item.basicDetails?.name || "N/A"}</Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: statusStyles.Approved.backgroundColor },
                ]}
              >
                <Text style={[styles.statusText, { color: statusStyles.Approved.textColor }]}>
                  {item.formStatus}
                </Text>
              </View>
            </View>

            <Text style={styles.label}>
              Form: <Text style={styles.value}>{item.formType}</Text>
            </Text>
            <Text style={styles.label}>
              Submission ID: <Text style={styles.value}>{item.id}</Text>
            </Text>
            <Text style={styles.label}>
              Date: <Text style={styles.value}>{item.date || "N/A"}</Text>
            </Text>

            <View style={styles.bioContainer}>
              <Text style={styles.bioTitle}>Remarks</Text>
              <Text style={styles.bioContent}>{item.basicDetails?.remarks || "No remarks"}</Text>
            </View>

            <TouchableOpacity
              onPress={() => handleDelete(index)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default Approved;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  icon: {
    padding: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    color: "#333",
  },
  noDataText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontWeight: "600",
    color: "#333",
  },
  bioContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  bioTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#444",
  },
  bioContent: {
    fontSize: 13,
    color: "#666",
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    backgroundColor: "#FFCDD2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "#C62828",
    fontWeight: "bold",
  },
});
