import { useFormStore } from '@/storage/useFormStore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const BasicDetailsForm = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { submittedForms, data } = useFormStore();

  const selectedForm = useMemo(() => {
    const matched = submittedForms.find(
      (form) => String(form?.basicDetails?.form_id) === String(id)
    );
    return matched || data;
  }, [id, submittedForms, data]);

  const basicDetails = selectedForm?.basicDetails || {};
  const landOwnership = selectedForm?.landOwnership || {};
  const landDevelopment = selectedForm?.landDevelopment || {};
  const bankDetails = selectedForm?.bankDetails || {};

  const [formData, setFormData] = useState({
    name: basicDetails.name || '',
    fatherSpouse: basicDetails.fatherSpouse || '',
    code: basicDetails.idCardNumber || '',
    hamlet: basicDetails.hamlet || '',
    panchayat: basicDetails.panchayat || '',
    revenueVillage: landOwnership.revenueVillage || '',
    block: basicDetails.block || '',
    district: basicDetails.district || '',
    length: landDevelopment.length,
    breadth: landDevelopment.breadth,
    depth: landDevelopment.depth,
    totalArea: landOwnership.totalArea || '',
    pradanContribution: landDevelopment.pradanContribution || '',
    farmerContribution: landDevelopment.farmerContribution || '',
    totalAmount: '',
    measuredBy: bankDetails.measuredBy || 'Associate',
    measuredByName: bankDetails.measuredByName || '',
    measuredByDesignation: bankDetails.measuredByDesignation || '',
    approvedByName: bankDetails.approvedByName || '',
    approvedByDesignation: bankDetails.approvedByDesignation || '',
  });

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const { length, breadth, depth, pradanContribution, farmerContribution } = formData;

    if (length && breadth && depth) {
      const totalArea = (
        parseFloat(length) * parseFloat(breadth) * parseFloat(depth)
      ).toFixed(2);
      setFormData((prevData) => ({ ...prevData, totalArea }));
    }

    const totalAmount = (
      parseFloat(pradanContribution || 0) + parseFloat(farmerContribution || 0)
    ).toFixed(2);
    setFormData((prevData) => ({ ...prevData, totalAmount }));
  }, [formData.length, formData.breadth, formData.depth, formData.pradanContribution, formData.farmerContribution]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  if (!selectedForm || !selectedForm.basicDetails) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', color: 'red' }}>Form not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0B8B42" />
        </TouchableOpacity>
        <Text style={styles.header}>Post Funding Pond Inspection</Text>
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
          <TextInput style={styles.input} value={formData[item.field]} editable={false} />
        </View>
      ))}

      {[
        { label: 'Length (m)', field: 'length' },
        { label: 'Breadth (m)', field: 'breadth' },
        { label: 'Depth (m)', field: 'depth' },
        { label: 'Total Area (cu m)', field: 'totalArea', editable: false },
      ].map((item, index) => (
        <View style={styles.formGroup} key={index}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={styles.inputEditable}
            value={formData[item.field]}
            editable={item.editable !== false ? isEditable : false}
            onChangeText={(text) => handleChange(item.field, text)}
            keyboardType="numeric"
          />
        </View>
      ))}

      {[
        { label: 'Pradan Contribution', field: 'pradanContribution' },
        { label: 'Farmer Contribution', field: 'farmerContribution' },
        { label: 'Total Amount', field: 'totalAmount', editable: false },
      ].map((item, index) => (
        <View style={styles.formGroup} key={index}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={styles.inputEditable}
            value={formData[item.field]}
            editable={item.editable !== false ? isEditable : false}
            onChangeText={(text) => handleChange(item.field, text)}
            keyboardType="numeric"
          />
        </View>
      ))}

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

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          router.push('/dashboard');
        }}
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
