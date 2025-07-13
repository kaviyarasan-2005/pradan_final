import { useFormStore } from '@/storage/useFormStore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
const { width, height } = Dimensions.get('window');

const BasicDetailsForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, onSubmit } = route.params || {};
  const { data, submittedForms } = useFormStore();

  // Determine which form to use
const selectedForm = React.useMemo(() => {
  // console.log("Checking submittedForms against ID:", id);
  const matched = submittedForms.find(
    (form) => String(form.basicDetails?.form_id) === String(id)
  );
  console.log("Matched form:", matched);
  return matched || data;
}, [id, submittedForms, data]);



  if (!selectedForm || !selectedForm.basicDetails) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", color: "red" }}>Form not found!</Text>
      </View>
    );
  }

  const formData = {
    name: selectedForm.basicDetails.name || '',
    fatherSpouse: selectedForm.basicDetails.fatherSpouse || '',
    code: selectedForm.basicDetails.idCardNumber || '',
    hamlet: selectedForm.basicDetails.hamlet || '',
    panchayat: selectedForm.basicDetails.panchayat || '',
    revenueVillage: selectedForm.landOwnership?.revenueVillage || '',
    block: selectedForm.basicDetails.block || '',
    district: selectedForm.basicDetails.district || '',
    totalArea: selectedForm.landOwnership?.totalArea || '',
    pradanContribution: selectedForm.landDevelopment?.pradanContribution || '',
    farmerContribution: selectedForm.landDevelopment?.farmerContribution || '',
 

  };
  const [measuredBy, setMeasuredBy] = React.useState(
  selectedForm.bankDetails?.measuredBy || 'Associate'
);
  const [isEditable] = React.useState(false);

  const handleSubmit = () => {
    
  
  };

  const handleChange = () => {}; // disabled editing

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0B8B42" />
        </TouchableOpacity>
        <Text style={styles.header}>Post Fund Land Inspection</Text>
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
            editable={false}
          />
        </View>
      ))}

      {[
        { label: 'Total Area', field: 'totalArea' },
        { label: 'Pradan Contribution', field: 'pradanContribution' },
        { label: 'Farmer Contribution', field: 'farmerContribution' },
      ].map((item, index) => (
        <View style={styles.formGroup} key={index}>
          <Text style={styles.label}>{item.label}</Text>
          <View style={styles.editableContainer}>
            <TextInput
              style={styles.inputEditable}
              value={formData[item.field]}
              editable={isEditable}
              onChangeText={(text) => handleChange(item.field, text)}
            />
          </View>
        </View>
      ))}

    <View style={styles.formGroup}>
  <Text style={styles.label}>Measured By</Text>
  <View style={styles.radioGroup}>
    {['Associate', 'Coordinator'].map((option) => (
      <TouchableOpacity
        key={option}
        style={styles.radioOption}
        onPress={() => setMeasuredBy(option)}
      >
        <View style={styles.radioOuter}>
          {measuredBy === option && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.radioLabel}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
</View>


     <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('dashboard')}
>
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
    color: '#333',
    fontSize: width * 0.035,
    height: height * 0.06,
  },
  inputEditable: {
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.012,
    backgroundColor: '#E8F5E9',
    color: '#333',
    fontSize: width * 0.035,
    height: height * 0.06,
    flex: 1,
  },
  editableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  submitButton: {
    marginTop: height * 0.03,
    backgroundColor: '#0B8B42',
    paddingVertical: height * 0.015,
    borderRadius: width * 0.03,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: width * 0.05,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BasicDetailsForm;
