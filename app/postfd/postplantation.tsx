import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const BasicDetailsForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onSubmit } = route.params || {};

  const [formData, setFormData] = useState({
    name: 'John Doe',
    fatherSpouse: 'Father Name',
    code: '12345',
    hamlet: 'Hamlet Name',
    panchayat: 'Panchayat Name',
    revenueVillage: 'Revenue Village Name',
    block: 'Block Name',
    district: 'District Name',
    totalArea: '2.5',
    pradanContribution: '5000',
    farmerContribution: '2000',
    totalAmount: '7000',
    measuredBy: '', // <- New field for radio selection
  });
  

  const [isEditable, setIsEditable] = useState(true);

  const [plantations, setPlantations] = useState([
    { type: '', number: '', price: '' },
  ]);

  const [otherExpenses, setOtherExpenses] = useState('');

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    if (onSubmit) {
      onSubmit();
    }
    router.push('/dashboard');
  };

  const handlePlantationChange = (index, field, value) => {
    const updated = [...plantations];
    updated[index][field] = value;
    setPlantations(updated);
  };

  const addPlantationRow = () => {
    setPlantations([...plantations, { type: '', number: '', price: '' }]);
  };

  const handleDeletePlantationRow = (index) => {
    const updated = plantations.filter((_, idx) => idx !== index);
    setPlantations(updated);
  };

  const calculateTotalExpenses = () => {
    const plantationTotal = plantations.reduce((acc, plantation) => {
      return acc + (parseFloat(plantation.price || 0) * parseInt(plantation.number || 0));
    }, 0);
    return plantationTotal + (parseFloat(otherExpenses) || 0);
  };

  const totalExpenses = calculateTotalExpenses();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0B8B42" />
        </TouchableOpacity>
        <Text style={styles.header}>Horticulture Form Verification</Text>
      </View>

      {[ 
        { label: 'Name of Farmer', field: 'name' },
        { label: 'Father/Spouse', field: 'fatherSpouse' },
        { label: 'Code', field: 'code' },
        { label: 'Hamlet', field: 'hamlet' },
        { label: 'Panchayat', field: 'panchayat' },
        { label: 'Revenue Village', field: 'revenueVillage' },
        { label: 'Block', field: 'block' },
        { label: 'District', field: 'district' },
      ].map((item, index) => (
        <View style={styles.formGroup} key={index}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={styles.input}
            value={formData[item.field]}
            editable={isEditable}
            onChangeText={(text) => handleChange(item.field, text)}
          />
        </View>
      ))}

      {[ 
        { label: 'Total Area (in Hectare)', field: 'totalArea' },
        { label: 'Pradan Contribution', field: 'pradanContribution' },
        { label: 'Farmer Contribution', field: 'farmerContribution' },
        { label: 'Total Amount', field: 'totalAmount', editable: false },
      ].map((item, index) => (
        <View style={styles.formGroup} key={index}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={styles.inputEditable}
            value={formData[item.field]}
            editable={isEditable}
            onChangeText={(text) => handleChange(item.field, text)}
            keyboardType="numeric"
          />
        </View>
      ))}

      {/* Plantation Table Section */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Plantation Details</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Type</Text>
          <Text style={styles.tableHeaderText}>Number</Text>
          <Text style={styles.tableHeaderText}>Price</Text>
        </View>

        {plantations.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <TextInput
              style={styles.tableInput}
              placeholder="e.g. Mango"
              value={item.type}
              onChangeText={(text) => handlePlantationChange(index, 'type', text)}
              editable={isEditable}
            />
            <TextInput
              style={styles.tableInput}
              placeholder="0"
              keyboardType="numeric"
              value={item.number}
              onChangeText={(text) => handlePlantationChange(index, 'number', text)}
              editable={isEditable}
            />
            <TextInput
              style={styles.tableInput}
              placeholder="0.00"
              keyboardType="numeric"
              value={item.price}
              onChangeText={(text) => handlePlantationChange(index, 'price', text)}
              editable={isEditable}
            />
            {isEditable && (
              <TouchableOpacity onPress={() => handleDeletePlantationRow(index)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}

        {isEditable && plantations.length > 0 && (
          <TouchableOpacity onPress={addPlantationRow} style={styles.addRowIconContainer}>
            <Ionicons name="add-circle" size={40} color="#0B8B42" />
          </TouchableOpacity>
        )}

        {/* Other Expenses and Total Expenses */}
        <View style={styles.tableRow}>
          <TextInput
            style={styles.tableInput}
            placeholder="Other Expenses"
            keyboardType="numeric"
            value={otherExpenses}
            onChangeText={(text) => setOtherExpenses(text)}
            editable={isEditable}
          />
          <TextInput
            style={styles.tableInput}
            placeholder="Total Expenses"
            value={`₹ ${totalExpenses.toFixed(2)}`}
            editable={false}
          />
        </View>
        <View style={styles.tableRow}>
          <TextInput
            style={styles.tableInput}
            placeholder="Total Expenses"
            keyboardType="numeric"
            value={otherExpenses}
            onChangeText={(text) => setOtherExpenses(text)}
            editable={isEditable}
          />
          <TextInput
            style={styles.tableInput}
            placeholder="Total Expenses"
            value={`₹ ${totalExpenses.toFixed(2)}`}
            editable={false}
          />
        </View>
      </View>

      {/* Measured By - Radio Buttons */}
  <View style={styles.formGroup}>
        <Text style={styles.label}>Measured By</Text>
        <View style={styles.radioGroup}>
          {['Associate', 'Coordinator'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.radioOption}
              onPress={() => handleChange('measuredBy', option)}
            >
              <View style={styles.radioOuter}>
                {formData.measuredBy === option && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      

      <TouchableOpacity style={styles.submitButton} onPress={() => { router.push('/dashboard'); }}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
    backgroundColor: '#F3F6F4',
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F6F4',
    paddingVertical: height * 0.02,
    marginBottom: height * 0.02,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#0B8B42',
    marginLeft: 10,
  },
  formGroup: {
    marginBottom: height * 0.02,
  },
  label: {
    fontSize: width * 0.04,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.012,
    backgroundColor: '#E8F5E9',
    fontSize: width * 0.04,
  },
  inputEditable: {
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.012,
    backgroundColor: '#E8F5E9',
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.01,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: height * 0.015,
    alignItems: 'center', // Align the delete button to the right
  },
  tableInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.012,
    backgroundColor: '#E8F5E9',
    marginRight: width * 0.02,
    fontSize: width * 0.04,
  },
  addRowIconContainer: {
    marginVertical: height * 0.02,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#0B8B42',
    paddingVertical: height * 0.015,
    borderRadius: width * 0.02,
    marginTop: height * 0.02,
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0B8B42',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0B8B42',
  },
  radioLabel: {
    marginLeft: 5,
    fontSize: width * 0.035,
    color: '#333',
  },
  
});

export default BasicDetailsForm;
