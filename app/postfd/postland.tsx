import { useFormStore } from '@/storage/useFormStore';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import { Buffer } from "buffer";
import Constants from "expo-constants";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from "expo-file-system";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert, Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";


const url = Constants.expoConfig.extra.API_URL;

const { width, height } = Dimensions.get('window');

const PostlLndForm = () => {
  const route = useRoute();
  const { id } = useLocalSearchParams() || {};
  const { data, submittedForms } = useFormStore();

  const selectedForm = React.useMemo(() => {
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
  form_id: basicDetails.form_id || '',
  name: basicDetails.name || '',
  fatherSpouse: basicDetails.fatherSpouse || '',
  code: basicDetails.idCardNumber || '',
  hamlet: basicDetails.hamlet || '',
  panchayat: basicDetails.panchayat || '',
  revenueVillage: landOwnership.revenueVillage || '',
  block: basicDetails.block || '',
  district: basicDetails.district || '',
  totalArea: landOwnership.totalArea || '',
  pradanContribution: landDevelopment.pradanContribution || '',
  farmerContribution: landDevelopment.farmerContribution || '',
  pf_passbook: bankDetails?.pf_passbook || null,
});
   useEffect(() => {
    console.log('selectedForm:', selectedForm);
  console.log('basicDetails:', basicDetails);
      const totalAmount = (parseFloat(formData.pradanContribution || 0) +parseFloat(formData.farmerContribution || 0)).toFixed(2);
      setFormData((prev) => ({ ...prev, totalAmount }));
    }, [formData.pradanContribution, formData.farmerContribution]);
  const [measuredBy, setMeasuredBy] = React.useState(
    bankDetails.measuredBy || 'Associate'
  );
  const [isEditable] = React.useState(false);
  const [files, setFiles] = React.useState({});
const handleSubmit = async () => {
  try {
    const updatedForm = {
      ...selectedForm,
      landOwnership: {
        ...selectedForm.landOwnership,
        totalArea: formData.totalArea,
      },
      landDevelopment: {
        ...selectedForm.landDevelopment,
        pradanContribution: formData.pradanContribution,
        farmerContribution: formData.farmerContribution,
        totalEstimate: formData.totalAmount,
      },
      bankDetails: {
        ...selectedForm.bankDetails,
        submittedFiles: {
          ...selectedForm.bankDetails.pf_passbook,
        },
      },
    };

    // File Upload (if file was picked)
    if (files['paymentProof']) {
      const file = files['paymentProof'];
      const ext = file.name?.split('.').pop();
      const mimeMap = {
        pdf: "application/pdf",
      
      };
      const mimeType = mimeMap[ext] || "application/octet-stream";

      // Get presigned URL from server
      const uploadURL = await axios.get(`${url}/api/files/getUploadurl`, {
        params: { fileName: file.name },
      });

      const fileData = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const buffer = Buffer.from(fileData, "base64");

      await axios.put(uploadURL.data, buffer, {
        headers: { "Content-Type": mimeType },
      });

      // Save file reference in submittedFiles
      updatedForm.bankDetails.submittedFiles["paymentProof"] = {
        uri: file.uri,
        name: file.name,
        name2: file.name,
      };
    }

    // Update to server
    await axios.put(`${url}/api/formData/updatepf_landformData`, updatedForm);

    Alert.alert("Success", "Form updated successfully!");
    router.push("/dashboard");
  } catch (error) {
    Alert.alert("Error", "Failed to update form: " + error.message);
  }
};
const handleChange = (field: string, value: string) => {
 
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
};

  const handleFilePick = async (key) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (!result.canceled) {
        setFiles((prev) => ({ ...prev, [key]: result.assets[0] }));
      }
    } catch (error) {
      console.error('File pick error:', error);
    }
  };

  if (!selectedForm || !selectedForm.basicDetails) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', color: 'red' }}>
          Form not found!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#0B8B42" />
        </TouchableOpacity>
        <Text style={styles.header}>Post Fund Land Inspection</Text>
      </View>

      {/* Non-editable fields */}
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

      {/* Editable fields */}
      {[
        { label: 'Total Area', field: 'totalArea' },
        { label: 'Pradan Contribution', field: 'pradanContribution' },
        { label: 'Farmer Contribution', field: 'farmerContribution' },
        { label: 'Total Amount', field: 'totalAmount', editable: false },
      ].map((item, index) => (
        <View style={styles.formGroup} key={index}>
          <Text style={styles.label}>{item.label}</Text>
          <View style={styles.editableContainer}>
            <TextInput
              style={styles.inputEditable}
             keyboardType="numeric"
              value={formData[item.field]}
              onChangeText={(text) => handleChange(item.field, text)}
            />
          </View>
        </View>
      ))}

      {/* Upload document */}
      <Text style={styles.label}>File submitted:</Text>
      <View style={styles.uploadGroup}>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => handleFilePick('paymentProof')}
        >
          <Ionicons
            name={files['paymentProof'] ? 'document-attach' : 'cloud-upload-outline'}
            size={width * 0.05}
            color="#0B8B42"
          />
          <Text style={styles.uploadLabel}>Payment Received Proof</Text>
          <Text style={styles.uploadStatus}>
            {files['paymentProof'] ? 'Uploaded' : 'Tap to Upload'}
          </Text>
        </TouchableOpacity>
      </View>

     <TouchableOpacity
  style={styles.submitButton}
  onPress={handleSubmit}
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
  uploadGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  uploadBox: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: width * 0.025,
    padding: width * 0.03,
    marginBottom: height * 0.02,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
  },
  uploadLabel: {
    fontSize: width * 0.035,
    fontWeight: '600',
    marginTop: height * 0.01,
    color: '#333',
    textAlign: 'center',
  },
  uploadStatus: {
    fontSize: width * 0.03,
    color: '#777',
    marginTop: height * 0.005,
    textAlign: 'center',
  },
});

export default PostlLndForm;
