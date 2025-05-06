import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-paper';

const statusStyles = {
  Approved: {
    backgroundColor: '#C8E6C9',
    textColor: '#2E7D32',
  },
  Pending: {
    backgroundColor: '#FFF9C4',
    textColor: '#F9A825',
  },
  Rejected: {
    backgroundColor: '#FFCDD2',
    textColor: '#C62828',
  },
};

const ApplicationCard = ({ name, form, date, bio, status }) => {
  const router = useRouter();
  const badgeStyle = statusStyles[status] || {
    backgroundColor: '#E0E0E0',
    textColor: '#424242',
    
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => {
      router.push('/Verifier/pondformverifier');
    }}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: badgeStyle.backgroundColor }]}>
          <Text style={[styles.statusText, { color: badgeStyle.textColor }]}>{status}</Text>
        </View>
      </View>

      <Text style={styles.label}>
        Form: <Text style={styles.value}>{form}</Text>
      </Text>
      <Text style={styles.label}>
        Date: <Text style={styles.value}>{date}</Text>
      </Text>

      {/* Bio Sub-Box */}
      <View style={styles.bioContainer}>
        <Text style={styles.bioTitle}>Remarks</Text>
        <Text style={styles.bioContent}>{bio}</Text>
      </View>
    </TouchableOpacity>
  );
};


const FormSubmissionsScreen = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [formTypeOpen, setFormTypeOpen] = useState(false);
  const [formTypeValue, setFormTypeValue] = useState(null);
  const [formTypeItems, setFormTypeItems] = useState([
    { label: 'Basic Details', value: 'basic' },
    { label: 'Land Details', value: 'land' },
    { label: 'Bank Details', value: 'bank' },
  ]);
  const [panchayatOpen, setPanchayatOpen] = useState(false);
  const [panchayatValue, setPanchayatValue] = useState(null);
  const [panchayatItems, setPanchayatItems] = useState([
    { label: 'Panchayat A', value: 'a' },
    { label: 'Panchayat B', value: 'b' },
  ]);
  const [blockOpen, setBlockOpen] = useState(false);
  const [blockValue, setBlockValue] = useState(null);
  const [blockItems, setBlockItems] = useState([
    { label: 'Block X', value: 'x' },
    { label: 'Block Y', value: 'y' },
  ]);
  const [hamletOpen, setHamletOpen] = useState(false);
  const [hamletValue, setHamletValue] = useState(null);
  const [hamletItems, setHamletItems] = useState([
    { label: 'Hamlet 1', value: '1' },
    { label: 'Hamlet 2', value: '2' },
  ]);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Transgender', value: 'transgender' },
  ]);
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState(null);
  const [statusItems, setStatusItems] = useState([
    { label: 'Submitted', value: 'submitted' },
    { label: 'Draft', value: 'draft' },
  ]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleSearch = () => {
    console.log('Search:', searchQuery);
  };

  const handleResetFilters = () => {
    setFormTypeValue(null);
    setPanchayatValue(null);
    setBlockValue(null);
    setHamletValue(null);
    setGenderValue(null);
    setStatusValue(null);
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const mockData = [
    {
      name: 'Ravi Kumar',
      form: 'Basic Details',
      date: '2025-04-05',
      bio: 'Farmer from Village A, applied for Basic Details scheme.',
      status: 'Approved',
    },
    {
      name: 'Sita Devi',
      form: 'Land Details',
      date: '2025-04-06',
      bio: 'Owns 2 hectares, applied for irrigation support.',
      status: 'Approved',
    },
    {
      name: 'Mohan Das',
      form: 'Bank Details',
      date: '2025-04-07',
      bio: 'Requested bank update for subsidy transfer.',
      status: 'Approved',
    },
  ];

return (
  <View style={styles.container}>
  {/* Header (Fixed) */}
  

  {/* Search and Filters (Fixed) */}
  <View style={styles.fixedSearchContainer}>
  <View style={styles.header}>
  <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
    <Ionicons name="arrow-back" size={24} color="#1B5E20" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Form Submissions</Text>
  <TouchableOpacity onPress={() => setFilterVisible(!filterVisible)} style={styles.filterIcon}>
    {filterVisible ? (
      <MaterialIcons name="close" size={24} color="#1B5E20" /> // Crossmark when filter is visible
    ) : (
      <MaterialIcons name="filter-list" size={24} color="#1B5E20" /> // Filter icon when not visible
    )}
  </TouchableOpacity>
</View>
    <View style={styles.searchContainer}>
      <FontAwesome5 name="search" size={16} color="#1B5E20" style={styles.searchIcon} />
      <TextInput
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        placeholderTextColor="#aaa"
      />
    </View>
    <Button mode="contained" onPress={handleSearch} style={styles.searchButton}>
      Search
    </Button>
    <Text style={{ textAlign: 'center', marginVertical: 10 }}>
      {mockData.length > 0 ? `${mockData.length} forms found` : 'No forms found'}
    </Text>

    {/* Filters */}
    {filterVisible && (
      <View style={styles.filterSection}>
        <DropDownPicker
          open={formTypeOpen}
          value={formTypeValue}
          items={formTypeItems}
          setOpen={setFormTypeOpen}
          setValue={setFormTypeValue}
          setItems={setFormTypeItems}
          placeholder="Form Type"
          style={styles.dropdown}
        />
        <DropDownPicker
          open={panchayatOpen}
          value={panchayatValue}
          items={panchayatItems}
          setOpen={setPanchayatOpen}
          setValue={setPanchayatValue}
          setItems={setPanchayatItems}
          placeholder="Panchayat"
          style={styles.dropdown}
        />
        <DropDownPicker
          open={blockOpen}
          value={blockValue}
          items={blockItems}
          setOpen={setBlockOpen}
          setValue={setBlockValue}
          setItems={setBlockItems}
          placeholder="Block"
          style={styles.dropdown}
        />
        <DropDownPicker
          open={hamletOpen}
          value={hamletValue}
          items={hamletItems}
          setOpen={setHamletOpen}
          setValue={setHamletValue}
          setItems={setHamletItems}
          placeholder="Hamlet"
          style={styles.dropdown}
        />
        <DropDownPicker
          open={genderOpen}
          value={genderValue}
          items={genderItems}
          setOpen={setGenderOpen}
          setValue={setGenderValue}
          setItems={setGenderItems}
          placeholder="Gender"
          style={styles.dropdown}
        />
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
            <Text style={styles.dateText}>Start: {startDate.toDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
            <Text style={styles.dateText}>End: {endDate.toDateString()}</Text>
          </TouchableOpacity>
        </View>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(e, date) => {
              setShowStartPicker(false);
              if (date) setStartDate(date);
            }}
          />
        )}
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(e, date) => {
              setShowEndPicker(false);
              if (date) setEndDate(date);
            }}
          />
        )}
        <TouchableOpacity onPress={handleResetFilters} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset Filters</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>

  {/* Scrollable Content (Application Cards) */}
  <ScrollView style={styles.scrollContainer}>
    {/* Result Message */}


    {/* Application Cards */}
    {mockData.map((item, index) => (
      <ApplicationCard key={index} {...item} />
    ))}
  </ScrollView>
</View>
);

};  

export default FormSubmissionsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  // header: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   paddingHorizontal: 20,
  //   paddingTop: 20,
  //   backgroundColor: '#fff',
  //   position: 'absolute',
  //   top: 0,
  //   width: '100%',
  //   zIndex: 1,
  // },
  fixedSearchContainer: {
    marginTop: 0, // Adjust this based on the height of the header and search/filter section
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 1,
    position: 'absolute',
    top: 0, // This should align with the header height
    width: '110%',
  },
  scrollContainer: {
    paddingTop:10,
    marginTop: 160, // Adjust this based on the combined height of the header and search/filter section
    paddingBottom: 20,
  },
  backIcon: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
    flex: 1,
    textAlign: 'center',
  },
  filterIcon: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1B5E20',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    color: '#000',
  },
  searchButton: {
    width:'100%',
    marginBottom: 0,
    backgroundColor: '#2E7D32',
  },
  filterSection: {
    marginBottom: 16,
    gap: 10,
  },
  dropdown: {
    borderColor: '#ccc',
    marginBottom: 10,
    zIndex: 1000,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#1B5E20',
    borderRadius: 6,
    flex: 1,
    marginRight: 5,
  },
  dateText: {
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#4CAF50', // or any color matching your theme
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#2E7D32',
  },
  resetButtonText: {
    color: '#F5F5F5',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontWeight: '600',
  },
  label: {
    fontWeight: '500',
    color: '#555',
    marginTop: 4,
  },
  value: {
    fontWeight: '400',
    color: '#333',
  },
  bioContainer: {
    marginTop: 12,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 10,
  },
  bioTitle: {
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 4,
  },
  bioContent: {
    color: '#4E4E4E',
    fontSize: 14,
    lineHeight: 20,
  },
  
});