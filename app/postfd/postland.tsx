import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFormStore } from '../../storage/useFormStore'; // adjust path if needed


const { width, height } = Dimensions.get('window');
const getFormDataById = async (formId) => {
  const data = await AsyncStorage.getItem('submittedForms');
  const forms = data ? JSON.parse(data) : [];
  return forms.find((form) => form.id === formId);
};
const Postland = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data, submittedForms, draftForms } = useFormStore();

  const isSubmittedPreview = !!id;
  const selectedForm = React.useMemo(() => {
    if (isSubmittedPreview && id) {
      return (
        submittedForms.find((form) => String(form.id) === id)
      );
    }
    return data;
  }, [id, submittedForms, draftForms, data]);

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (selectedForm) {
      setFormData(selectedForm);
      setLoading(false);
    }
  }, [selectedForm]);

  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const renderCard = (title: string, fields: { label: string; value: any }[]) => (
    <View style={styles.formGroup}>
      <Text style={styles.cardTitle}>{title}</Text>
      {fields.map((field, idx) => (
        <View key={idx} style={styles.cardRow}>
          <Text style={styles.cardLabel}>{field.label}</Text>
          <Text style={styles.cardValue}>
            {Array.isArray(field.value) ? field.value.join(', ') : String(field.value || '')}
          </Text>
        </View>
      ))}
    </View>
  );
  
 

  if (loading || !formData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading form data...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0B8B42" />
        </TouchableOpacity>
        <Text style={styles.header}>Post Fund Land Inspection</Text>
      </View>
     
      {renderCard("Farmer Details", [
  { label: 'Name of Farmer', value: formData?.basicDetails.name },
  { label: 'Father/Spouse', value: formData?.basicDetails.fatherOrSpouse },
  { label: 'Code', value: formData?.basicDetails.code },
  { label: 'Hamlet', value: formData?.basicDetails.hamlet },
  { label: 'Panchayat', value: formData?.basicDetails.panchayat },
  { label: 'Revenue Village', value: formData?.basicDetails.revenueVillage },
  { label: 'Block', value: formData?.basicDetails.block },
  { label: 'District', value: formData?.basicDetails.district },
])}

{renderCard("Fund Contribution", [
  { label: 'Total Area', value: formData?.landDevelopment.totalArea },
  { label: 'Pradan Contribution', value: formData?.landDevelopment.pradanContribution },
  { label: 'Farmer Contribution', value: formData?.landDevelopment.farmerContribution },
])}

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

      <TouchableOpacity style={styles.submitButton} onPress={() => { router.push('dashboard'); }}>
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
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0B8B42',
  },
  cardRow: {
    marginBottom: 10,
  },
  cardLabel: {
    fontWeight: '600',
    color: '#555',
  },
  cardValue: {
    color: '#333',
  },
  
});

export default Postland;
