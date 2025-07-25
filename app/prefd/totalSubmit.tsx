import { useActionSheet } from "@expo/react-native-action-sheet";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  BackHandler, Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { DashbdStore } from "../../storage/DashbdStore";
import { IdFormStore } from "../../storage/IdStore";
import { useFormStore } from "../../storage/useFormStore";
const { height, width } = Dimensions.get('window');
const url = Constants.expoConfig.extra.API_URL;
const statusStyles = {
  4: { backgroundColor: '#C8E6C9', textColor: '#2E7D32' },
  1: { backgroundColor: '#FFF9C4', textColor: '#F9A825' },
  2: { backgroundColor: '#BBDEFB', textColor: '#1976D2' },
  3: { backgroundColor: '#FFCDD2', textColor: '#C62828' },
};

const TotalSubmit = () => {
    const formTypeMap = {
  1: "LAND",
  2: "POND",
  3: "PLANTATION"
};

  const router = useRouter();
  // const { submittedForms, loadSubmittedForms, deleteFormByIndex } = useFormStore();
  const { showActionSheetWithOptions } = useActionSheet();
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
    resetData();
    loaddashbdForms();
  }, []);
  
useFocusEffect(
  React.useCallback(() => {
    const onBackPress = () => {
      router.push('/dashboard');
      return true; 
    };

 const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

return () => backHandler.remove(); 

  }, [])
);

  const filteredForms = dashbdforms.filter((item) => {
    const matchesType = formType === "ALL" || String(item.form_type) === formType;

    const matchesName = item.farmer_name?.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = item.status ===1 || item.status ===2 || item.status ===3 || item.status ===4;
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
      //   
   
  });
  

const handleCardPress = async (item) => {
  let previewPath = "";

  if (item.form_type === 1) previewPath = "/landform/Preview";
  else if (item.form_type === 2) previewPath = "/pondform/Preview";
  else if (item.form_type === 3) previewPath = "/plantationform/Preview";
  else return alert("Unknown form type.");
    resetData();

  try {
    const response = await axios.get(`${url}/api/dashboard/getpreviewspecificformData`, {
      params: { form_id: item.id, form_type: item.form_type }
    });

    const fetchedData = response.data;

    // Set all keys of fetchedData into the form store using setData
      setData("basicDetails", fetchedData.basicDetails);
    setData("landOwnership", fetchedData.landOwnership);
    setData("landDevelopment", fetchedData.landDevelopment);
    setData("bankDetails", fetchedData.bankDetails);
       

    router.push(
      {
      pathname: previewPath,
      params: {
        id: item.id,
        fromsubmit: "true",
        returnsubmit: "/prefd/totalSubmit"
      }
    });

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
     <View style={styles.container}>
      <View >
       <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/dashboard')} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={width * .06} color="#1B5E20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Form Submissions</Text>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.filterIcon}>
          {showFilters ? (
            <MaterialIcons name="close" size={width * .06} color="#1B5E20" /> // Crossmark when filter is visible
          ) : (
            <MaterialIcons name="filter-list" size={width * .06} color="#1B5E20" /> // Filter icon when not visible
          )}
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
</View>
<ScrollView contentContainerStyle={styles.container}>
      {/* Date Time Picker Modal for Start Date */}
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmStartDate}
        onCancel={() => setStartDatePickerVisible(false)}
      />

      {/* Date Time Picker Modal for End Date */}
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmEndDate}
        onCancel={() => setEndDatePickerVisible(false)}
      />

      {/* No Data */}
      {filteredForms.length === 0 ? (
        <Text style={styles.noDataText}>No forms submitted yet.</Text>
      ) : (
       [...filteredForms].reverse().map((item, index) => {
          const statusStyle = statusStyles[item.status] || {
            backgroundColor: "#E0E0E0",
            textColor: "#424242",
          };

          return (
            <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress(item)}>
              <View style={styles.cardHeader}>
                <Text style={styles.name}>{item.farmer_name|| "N/A"}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
                  <Text style={[styles.statusText, { color: statusStyle.textColor }]}>
  {item.status === 1
    ? 'Pending'
    : item.status === 2
    ? 'Change'
    : item.status === 3
    ? 'Rejected'
    : item.status === 4
    ? 'Approved'
    : 'Unknown'}
</Text>

                </View>
              </View>
              
              
             <Text style={styles.label}>Form: <Text style={styles.value}>{formTypeMap[item.form_type] }</Text></Text>
              <Text style={styles.label}>Date: <Text style={styles.value}>{item.created_at}</Text></Text>
              <View style={styles.bioContainer}>
                      <Text style={styles.bioTitle}>Remarks</Text>
                      <Text style={styles.bioContent}>Remarks</Text>
                    </View>
            </TouchableOpacity>
          );
        })
      )}
    </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: width * 0.02,
    paddingRight: width * .02,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height * 0.015,
    paddingRight: width * 0.08,
    paddingTop: width * 0.02,
    paddingBottom: width*.01,
  },
  fixedSearchContainer: {
    marginTop: 0,
    paddingHorizontal: width * 0.04,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    width: '112%', // Fully responsive
  },
  scrollContainer: {
    paddingTop: height * 0.015,
    marginTop: height * 0.2,
    paddingBottom: height * 0.03,
  },
  backIcon: {
    padding: width * 0.01,
  },
  headerTitle: {
    fontSize: height * 0.027,
    fontWeight: 'bold',
    color: '#1B5E20',
    flex: 1,
    textAlign: 'center',
  },
  filterIcon: {
    padding: width * 0.01,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    width: '95%',
    borderColor: '#1B5E20',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.01,
  },
  searchIcon: {
    marginRight: width * 0.02,
  },
  searchInput: {
    flex: 1,
    paddingVertical: height * 0.01,
    color: '#000',
  },
  searchButton: {
    width: '95%',
    marginBottom: 0,
    backgroundColor: '#2E7D32',
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
  dateText: {
    color: '#1B5E20',
    fontWeight: 'bold',
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
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: width * 0.03,
    padding: width * 0.04,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  name: {
    fontSize: height * 0.023,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statusBadge: {
    paddingHorizontal: width * 0.025,
    paddingVertical: height * 0.005,
    borderRadius: width * 0.03,
  },
  statusText: {
    fontWeight: '600',
    fontSize: height * 0.019,
  },
  label: {
    fontWeight: '700',
    color: '#555',
    marginTop: height * 0.005,
    fontSize: height * 0.019,
  },
  value: {
    fontWeight: '400',
    fontSize: height * 0.019,
    color: '#333',
  },
  bioContainer: {
    marginTop: height * 0.015,
    backgroundColor: '#E8F5E9',
    borderRadius: width * 0.025,
    padding: width * 0.03,
  },
  bioTitle: {
    fontWeight: '600',
    color: '#1B5E20',
    fontSize: height * 0.019,
    marginBottom: height * 0.005,
  },
  bioContent: {
    color: '#4E4E4E',
    fontSize: height * 0.019,
    lineHeight: height * 0.028,
  },
});
export default TotalSubmit;