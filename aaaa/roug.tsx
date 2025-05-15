import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');

export default function BankDetailsForm() {
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [branch, setBranch] = useState('');
  const [ifsc, setIFSC] = useState('');
  const [contribution, setContribution] = useState('');

  const [files, setFiles] = useState({
    patta: null,
    idCard: null,
    fmb: null,
    photo: null,
    passbook: null,
    geoTagged: null, // Added for geo-tagged photo
  });

  const handleFilePick = async (field) => {
    const result = await DocumentPicker.getDocumentAsync({ type: '/' });
    if (result?.assets && result.assets.length > 0 && result.assets[0].uri) {
      setFiles((prev) => ({ ...prev, [field]: result.assets[0] }));
    }
  };

  const handleGeoTaggedPhotoPick = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted' || locationStatus !== 'granted') {
      Alert.alert('Permissions required', 'Camera and location permissions are needed.');
      return;
    }

    const imageResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!imageResult.canceled && imageResult.assets.length > 0) {
      const location = await Location.getCurrentPositionAsync({});
      const { uri } = imageResult.assets[0];
      setFiles((prev) => ({
        ...prev,
        geoTagged: {
          uri,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        },
      }));
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Animatable.View animation="fadeInUp" duration={600}>
          <Text style={styles.heading_land}>LAND REDEVELOPMENT FORM</Text>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                router.push('/Land_Form/land_develop_act');
              }}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={width * .06} color="#0B8B42" />
            </TouchableOpacity>
            <Text style={styles.heading}>Bank Details</Text>
          </View>

          <Text style={styles.label}>45. Name of Account Holder</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            placeholderTextColor="#888"
            value={accountHolder}
            onChangeText={setAccountHolder}
          />

          <Text style={styles.label}>46. Account Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter account number"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />

          <Text style={styles.label}>47. Name of the Bank</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter bank name"
            placeholderTextColor="#888"
            value={bankName}
            onChangeText={setBankName}
          />

          <Text style={styles.label}>48. Branch</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter branch name"
            placeholderTextColor="#888"
            value={branch}
            onChangeText={setBranch}
          />

          <Text style={styles.label}>49. IFSC</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter IFSC code"
            placeholderTextColor="#888"
            value={ifsc}
            onChangeText={setIFSC}
          />

          <Text style={styles.label}>50. Farmer has agreed for the work, and his contribution</Text>
          <View style={styles.radioGroup}>
            {['Yes', 'No'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.radioOption}
                onPress={() => setContribution(option)}
              >
                <Ionicons
                  name={contribution === option ? 'radio-button-on' : 'radio-button-off'}
                  size={width * .05}
                  color="#0B8B42"
                />
                <Text style={styles.radioText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>51. Files submitted:</Text>
          <View style={styles.uploadGroup}>
            {[{ label: 'Patta', key: 'patta', onPress: () => handleFilePick('patta') },
              { label: 'ID Card', key: 'idCard', onPress: () => handleFilePick('idCard') },
              { label: 'FMB', key: 'fmb', onPress: () => handleFilePick('fmb') },
              { label: 'Photo of Farmer', key: 'photo', onPress: () => handleFilePick('photo') },
              { label: 'Bank Passbook', key: 'passbook', onPress: () => handleFilePick('passbook') },
              { label: 'Geo-tagged Photo', key: 'geoTagged', onPress: handleGeoTaggedPhotoPick }
            ].map(({ label, key, onPress }) => (
              <TouchableOpacity key={key} style={styles.uploadBox} onPress={onPress}>
                <Ionicons
                  name={files[key] ? 'document-attach' : 'cloud-upload-outline'}
                  size={width * .05}
                  color="#0B8B42"
                />
                <Text style={styles.uploadLabel}>{label}</Text>
                <Text style={styles.uploadStatus}>
                  {files[key] ? (key === 'geoTagged' ? `Lat: ${files[key].location.latitude.toFixed(2)}` : 'Uploaded') : 'Tap to Upload'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={() => { router.push('/Land_Form/preview'); }}>
            <Text style={styles.nextBtnText}>PREVIEW</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F7ED',
  },
  inner: {
    padding: width * 0.05,
    paddingBottom: height * 0.025,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.025,
  },
  backButton: {
    marginRight: width * 0.025,
  },
  heading: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#0B8B42',
  },
  label: {
    fontSize: width * 0.035,
    marginVertical: height * 0.01,
    color: '#333',
    fontWeight: '600',
  },
  heading_land: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#0B8B42',
    marginBottom: height * 0.025,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: width * 0.025,
    paddingHorizontal: width * 0.035,
    paddingVertical: height * 0.015,
    backgroundColor: '#E8F5E9',
    color: '#333',
    fontSize: width * 0.035,
    marginBottom: height * 0.015,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: height * 0.015,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: width * 0.04,
    marginBottom: height * 0.01,
  },
  radioText: {
    marginLeft: width * 0.015,
    fontSize: width * 0.035,
    color: '#333',
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
  },
  uploadStatus: {
    fontSize: width * 0.03,
    color: '#777',
    marginTop: height * 0.005,
    textAlign: 'center',
  },
  nextBtn: {
    backgroundColor: '#134e13',
    paddingVertical: height * 0.018,
    borderRadius: width * 0.025,
    alignItems: 'center',
    marginTop: height * 0.025,
    marginBottom: height * 0.025,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '600',
  },
});