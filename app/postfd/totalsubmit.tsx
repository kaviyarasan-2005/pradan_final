import { useActionSheet } from "@expo/react-native-action-sheet";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
const { height, width } = Dimensions.get('window');
import DropDownPicker from 'react-native-dropdown-picker';
import { IdFormStore } from "../../storage/IdStore";
import { useFormStore } from "../../storage/useFormStore";
import { DashbdStore } from "../../storage/DashbdStore";
const url = Constants.expoConfig.extra.API_URL;
const statusStyles = {
   11: { backgroundColor: '#C8E6C9', textColor: '#2E7D32' },
  9: { backgroundColor: '#C8E6C9', textColor: '#2E7D32' },
  7: { backgroundColor: '#FFF9C4', textColor: '#F9A825' },
  8: { backgroundColor: '#BBDEFB', textColor: '#1976D2' },
   10: { backgroundColor: '#EDE7F6', textColor: '#6A1B9A' },
};

const TotalSubmit = () => {
    const formTypeMap = {
  1: "LAND",
  2: "POND",
  3: "PLANTATION"
};

  const router = useRouter();
  // const { submittedForms, loadSubmittedForms, deleteFormByIndex } = useFormStore();
  const {dashbdforms,loaddashbdForms} = DashbdStore();
  const {setData,data,resetData} = useFormStore();
const forms = IdFormStore((state) => state.Idforms);
  const [searchText, setSearchText] = useState("");
  const [formType, setFormType] = useState("ALL");
  const [panchayat, setPanchayat] = useState("");
  const [block, setBlock] = useState("");
  const [hamlet, setHamlet] = useState("");
  const [gender, setGender] = useState("ALL");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [open, setOpen] = useState(false);
   const [typeopen, settypeOpen] = useState(false);
    const [genderfilter,setgenderfilter ] = useState([
    { label: 'ALL', value: 'ALL' },
    { label: 'MALE', value: 'Male' },
    { label: 'FEMALE', value: 'Female' },
    { label: 'TRANSGENDER', value: 'Transgender' },
  ]);
    const [formtypefilter, setformtypefilter] = useState([
    { label: 'ALL', value: 'ALL' },
    { label: 'LAND', value: '1' },
    { label: 'POND', value: '2' },
    { label: 'PLANTATION', value: '3' },
  ]);
  useEffect(() => {
    loaddashbdForms();
  }, []);

  const filteredForms = dashbdforms.filter((item) => {
    const matchesType = formType === "ALL" || String(item.form_type) === formType;
    const matchesName = item.farmer_name?.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = item.status ===7 || item.status ===8 || item.status ===9 || item.status ===10 || item.status ===11;
    const matchesPanchayat = item.panchayat?.toLowerCase().includes(panchayat.toLowerCase());
    const matchesBlock = item.block?.toLowerCase().includes(block.toLowerCase());
    const matchesHamlet = item.hamlet?.toLowerCase().includes(hamlet.toLowerCase());
    const matchesGender = gender === "ALL" || item.gender === gender;

    // Date range filtering logic
    const formatDate = (dateString) => {
      const [day, month, year] = dateString.split('/');
      return new Date(year, month - 1, day); // Create a Date object with year, month (0-indexed), and day
    };
  
    const itemDate = formatDate(item.created_at); // Convert the item's date to Date object
    const matchesStart = !startDate || itemDate >= new Date(startDate);
    const matchesEnd = !endDate || itemDate <= new Date(endDate);
  
    return matchesStatus&&matchesType && matchesBlock && matchesHamlet&& matchesName && matchesPanchayat && matchesGender&& matchesStart && matchesEnd;
    
  });
  const handleCardPress = async (item) => {
    let previewPath = "";
  
     if (item.form_type === 1) previewPath = "/landform/Preview";
    else if (item.form_type === 2) previewPath = "/pondform/Preview";
    else if (item.form_type === 3) previewPath = "/plantationform/Preview";
    else return alert("Unknown form type.");
  
    try {
      const response = await axios.get(`${url}/api/dashboard/getpreviewspecificformData`,{params:{form_id:item.id}});
      const fetchedData = response.data;
      console.log(fetchedData +" "+item.id);
    router.push({ pathname: previewPath, params: { id: item.id, fromsubmit: "true", returnsubmit: "/postfd/totalsubmit" } });
  
    } catch (error) {
      console.error("Error fetching form details:", error);
      // Alert.alert("Error", "Failed to fetch form details.");
    }
  };

  // const handleCardPress = (item) => {
    
  //   let previewPath = "";
  //  if (item.form_type === 1) previewPath = "/landform/Preview";
  //   else if (item.form_type === 2) previewPath = "/pondform/Preview";
  //   else if (item.form_type === 3) previewPath = "/plantationform/Preview";
  //   else return alert("Unknown form type.");

  //   router.push({ pathname: previewPath, params: { id: item.id, fromsubmit: "true", returnsubmit: "/postfd/totalsubmit" } });
  // };

  // Function to handle the date selection
  const handleConfirmStartDate = (date) => {
    setStartDate(date);
    setStartDatePickerVisible(false);
  };

  const handleConfirmEndDate = (date) => {
    setEndDate(date);
    setEndDatePickerVisible(false);
  };

  const resetFilters = () => {
    setSearchText("");
    setFormType("ALL");
    setPanchayat("");
    setBlock("");
    setHamlet("");
    setGender("ALL");
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/dashboard")} style={styles.icon}>
          <Ionicons name="arrow-back" size={24} color="#1B5E20" />
        </TouchableOpacity>
        <Text style={styles.title}>POST TotalForm Submissions</Text>
        <TouchableOpacity onPress={() =>{ setShowFilters(!showFilters) 
        // console.log(JSON.stringify(dashbdforms) +"total submit 111");
        }} style={styles.icon}>
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

         {/* Filter Options (Toggleable) */}
      {showFilters && (
        <View style={styles.filterSection}>
          <TextInput placeholder="Panchayat" value={panchayat} onChangeText={setPanchayat} style={styles.dropdown} />
          <TextInput placeholder="Block" value={block} onChangeText={setBlock} style={styles.dropdown} />
          <TextInput placeholder="Hamlet" value={hamlet} onChangeText={setHamlet} style={styles.dropdown} />

          <Text style={styles.filterSection}>Form Type</Text>
            <DropDownPicker
        open={typeopen}
        value={formType}
        items={formtypefilter}
        setOpen={settypeOpen}
        setValue={setFormType}
        setItems={setformtypefilter}
        style={styles.dropdown}
        placeholder="Select Form Type"
        dropDownContainerStyle={{ borderColor: '#1B5E20' }}
      />


          <Text style={styles.filterSection}>Gender</Text>
           <DropDownPicker
      open={open}
      value={gender}
      items={genderfilter}
      setOpen={setOpen}
      setValue={setGender}
      setItems={setgenderfilter}
      placeholder="Select Gender"
      style={styles.dropdown}
      dropDownContainerStyle={{ borderColor: '#1B5E20' }}
      // style={{ zIndex: 1000 }} // If overlapping issues occur
    />
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => setStartDatePickerVisible(true)} style={styles.dateButton}>
         <Text style={styles.dateText}>{startDate ? `Start Date: ${startDate.toLocaleDateString()}` : "Start Date"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEndDatePickerVisible(true)} style={styles.dateButton}>
            <Text style={styles.dateText}>{endDate ? `End Date: ${endDate.toLocaleDateString()}` : "End Date"}</Text>
          </TouchableOpacity> 
          </View>

          {/* Display the selected date range */}
          {startDate && endDate && (
            <Text style={styles.dateRangeText}>
              Showing data from {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
            </Text>
          )}

          <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      )}
      )}
    </ScrollView>
  );
};
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
  dateText: {
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    color: "#333",
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  filtersBox: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F0F4C3",
    marginBottom: 14,
  },
   filterSection: {
    marginBottom: height * 0.02,
    paddingRight: width * 0.04,
    gap: height * 0.01,
  },
    dropdown: {
    borderColor: '#1B5E20',
    marginBottom: height * 0.01,
    zIndex: 1000,
    borderWidth: 1,
    borderRadius: width * 0.02,
  },
  filterLabel: {
    fontWeight: "bold",
    marginTop: 6,
    color: "#1B5E20",
  },
    dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.01,
    paddingTop:width * 0.01,
  },
    dateButton: {
    padding: height * 0.015,
    borderWidth: 1,
    borderColor: '#1B5E20',
    borderRadius: width * 0.02,
    flex: 1,
    marginRight: width * 0.015,

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
    color: "#1B5E20",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  value: {
    fontSize: 14,
    color: "#333",
  },
  bioContainer: {
    marginTop: 12,
  },
  bioTitle: {
    fontSize: 14,
    color: "#555",
  },
  bioContent: {
    fontSize: 14,
    color: "#333",
  },
  deleteButton: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#E57373",
    borderRadius: 6,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
resetButton: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: width * 0.05,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    alignItems: 'center',
    marginTop: height * 0.01,
    backgroundColor: '#2E7D32',
  },
  resetButtonText: {
    color: '#F5F5F5',
    fontWeight: 'bold',
    fontSize: height * 0.02,
  },
  dateButton: {
    padding: height * 0.015,
    borderWidth: 1,
    borderColor: '#1B5E20',
    borderRadius: width * 0.02,
    flex: 1,
    marginRight: width * 0.015,

  },
  dateRangeText: {
    fontSize: 14,
    color: "#388E3C",
    marginTop: 8,
  },
});

export default TotalSubmit;