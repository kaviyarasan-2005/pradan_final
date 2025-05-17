import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
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

  // Radio Option Component
  const RadioOption = ({ options, value, onChange }) => (
    <View style={styles.radioGroup}>
      {options.map((opt) => (
        <TouchableOpacity key={opt} style={styles.radioOption} onPress={() => onChange(opt)}>
          <Ionicons
            name={value === opt ? 'radio-button-on' : 'radio-button-off'}
            size={width * .05}
            color="#0B8B42"
          />
          <Text style={styles.radioText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Checkbox Group Component
  const CheckboxGroup = ({ options, values, onToggle }) => (
    <View style={styles.checkboxGroup}>
      {options.map((opt) => (
        <TouchableOpacity key={opt} style={styles.checkboxOption} onPress={() => onToggle(opt)}>
          <Ionicons
            name={values.includes(opt) ? 'checkbox' : 'square-outline'}
            size={width * .05}
            color="#0B8B42"
          />
          <Text style={styles.radioText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  export default function BasicDetailsScreen() {
    const [hamlet, setHamlet] = useState(null);
    const [hamletOpen, setHamletOpen] = useState(false);
    const [hamletItems] = useState([
      { label: 'Hamlet 1', value: 'hamlet1' },
      { label: 'Hamlet 2', value: 'hamlet2' },
    ]);

    const [panchayat, setPanchayat] = useState(null);
    const [panchayatOpen, setPanchayatOpen] = useState(false);
    const [panchayatItems] = useState([
      { label: 'Panchayat 1', value: 'panchayat1' },
      { label: 'Panchayat 2', value: 'panchayat2' },
    ]);

    const [block, setBlock] = useState(null);
    const [blockOpen, setBlockOpen] = useState(false);
    const [blockItems] = useState([
      { label: 'Block A', value: 'blockA' },
      { label: 'Block B', value: 'blockB' },
    ]);

    const [identityType, setIdentityType] = useState('');
    const [otherIdentity, setOtherIdentity] = useState('');
    const [gender, setGender] = useState('');
    const [householdType, setHouseholdType] = useState('');
    const [houseOwnership, setHouseOwnership] = useState('');
    const [houseType, setHouseType] = useState('');
    const [caste, setCaste] = useState('');
    const [toiletAvailability, setToiletAvailability] = useState('');
    const [toiletCondition, setToiletCondition] = useState('');
    const [education, setEducation] = useState([]);
    const [drinkingSource, setDrinkingSource] = useState([]);
    const [potability, setPotability] = useState([]);
    const [domesticSource, setDomesticSource] = useState([]);
    const [occupation, setOccupation] = useState([]);
    const [specialCategories, setSpecialCategories] = useState([]);
    const [disabledCount, setDisabledCount] = useState('');
      const [areaIrrigated, setAreaIrrigated] = useState('');
        const [irrigation, setIrrigation] = useState('');

    const toggleCheckbox = (value, state, setState) => {
      setState(state.includes(value)
        ? state.filter((item) => item !== value)
        : [...state, value]
      );
    };

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <ScrollView contentContainerStyle={styles.inner}>
          <Animatable.View animation="fadeInUp" duration={600}>
          <Text style={styles.heading_land}>LAND REDEVELOPMENT FORM</Text>
            <View style={styles.headingContainer}>
                        <TouchableOpacity onPress={() => router.push("/dashboard")}>
                          <Ionicons name="arrow-back" size={width * .06} color="#0B8B42" />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Basic Details</Text>
                      </View>

            <Text style={styles.label}>1. Name of Farmer</Text>
            <TextInput style={styles.input} placeholder="Enter name" placeholderTextColor="#888" />

            <Text style={styles.label}>2. Age</Text>
            <TextInput style={styles.input} keyboardType="phone-pad" placeholder="Enter Age" placeholderTextColor="#888" />
            
            <Text style={styles.label}>3. Mobile Number</Text>
            <TextInput style={styles.input} keyboardType="phone-pad" placeholder="Enter mobile" placeholderTextColor="#888" />



            <Text style={styles.label}>4. District</Text>
            <TextInput style={styles.input} placeholder="Enter District" placeholderTextColor="#888" />

            <Text style={styles.label}>5. Block</Text>
            <TextInput style={styles.input} placeholder="Enter Block" placeholderTextColor="#888" />

            <Text style={styles.label}>6. Panchayat</Text>
            <TextInput style={styles.input} placeholder="Enter Panchayat" placeholderTextColor="#888" />

            <Text style={styles.label}>7.Hamlet </Text>
            <TextInput style={styles.input} placeholder="Enter Hamlet" placeholderTextColor="#888" />
            
            <Text style={styles.label}>8. Identity Card</Text>
            <RadioOption
              options={['Aadhar', 'EPIC', 'Driving License', 'Others']}
              value={identityType}
              onChange={setIdentityType}
            />
            {identityType === 'Others' && (
              <TextInput
                style={styles.input}
                placeholder="Specify other identity card"
                placeholderTextColor="#888"
                value={otherIdentity}
                onChangeText={setOtherIdentity}
              />
            )}

            <Text style={styles.label}>9. ID Card Number</Text>
            <TextInput style={styles.input} placeholder="Enter ID No." placeholderTextColor="#888" />

            <Text style={styles.label}>10. Gender</Text>
            <RadioOption options={['Male', 'Female', 'Transgender']} value={gender} onChange={setGender} />

            <Text style={styles.label}>11. Father / Spouse</Text>
            <TextInput style={styles.input} placeholder="Enter name" placeholderTextColor="#888" />

            <Text style={styles.label}>12. Type of Households</Text>
            <RadioOption options={['Nuclear', 'Joint']} value={householdType} onChange={setHouseholdType} />

            <Text style={styles.label}>13. Household Members</Text>
<View style={styles.row}>
  <View style={styles.inputHalfWrapper}>
    <Text style={styles.subLabel}>Adults</Text>
    <TextInput style={styles.inputHalf} keyboardType="numeric" placeholder="0" placeholderTextColor="#888" />
  </View>
  <View style={styles.inputHalfWrapper}>
    <Text style={styles.subLabel}>Children</Text>
    <TextInput style={styles.inputHalf} keyboardType="numeric" placeholder="0" placeholderTextColor="#888" />
  </View>
</View>


<Text style={styles.label}>14. Occupation</Text>
<View style={styles.irrigationRow}>
  <View style={styles.inputIrrigationWrapper}>
    <Text style={styles.subLabel}>Agriculture</Text>
    <TextInput style={[styles.input, styles.irrigationInput]} keyboardType="numeric" placeholder="0" placeholderTextColor="#888" />
  </View>
  <View style={styles.inputIrrigationWrapper}>
    <Text style={styles.subLabel}>Business</Text>
    <TextInput style={[styles.input, styles.irrigationInput]} keyboardType="numeric" placeholder="0" placeholderTextColor="#888" />
  </View>
  <View style={styles.inputIrrigationWrapper}>
    <Text style={styles.subLabel}>Others</Text>
    <TextInput style={[styles.input, styles.irrigationInput]} keyboardType="numeric" placeholder="0" placeholderTextColor="#888" />
  </View>
</View>
              <Text style={styles.label}>15. Disabled</Text>
                        <RadioOption
                          options={['Yes', 'No']}
                          value={irrigation}
                          onChange={(val) => {
                            setIrrigation(val);
                            if (val !== 'Yes') setAreaIrrigated('');
                          }}
                        />
              
                        {irrigation === 'Yes' && (
                          <>
                            <Text style={styles.label}>Disabled members </Text>
                            <TextInput
                              style={styles.input}
                              keyboardType="numeric"
                              placeholder="Enter Disabled members"
                              placeholderTextColor="#888"
                              value={areaIrrigated}
                              onChangeText={setAreaIrrigated}
                            />
                          </>
                        )}



            <Text style={styles.label}>16. Caste</Text>
            <RadioOption options={['OC', 'OBC', 'SC', 'ST']} value={caste} onChange={setCaste} />

            <Text style={styles.label}>17. House Ownership</Text>
            <RadioOption options={['Rented', 'Owned']} value={houseOwnership} onChange={setHouseOwnership} />

            <Text style={styles.label}>18. Type of House</Text>
            <RadioOption options={['Pucca', 'Kutcha']} value={houseType} onChange={setHouseType} />

            <Text style={styles.label}>19. Drinking Water Source</Text>
            <CheckboxGroup options={['Ponds', 'Wells & Borewells', 'Trucks']} values={drinkingSource} onToggle={(val) => toggleCheckbox(val, drinkingSource, setDrinkingSource)} />

            <Text style={styles.label}>20. Potability</Text>
            <CheckboxGroup options={['Ponds', 'Wells & Borewells', 'Tanks']} values={potability} onToggle={(val) => toggleCheckbox(val, potability, setPotability)} />

            <Text style={styles.label}>21. Domestic Water Source</Text>
            <CheckboxGroup options={['Ponds', 'Wells & Borewells', 'Tanks']} values={domesticSource} onToggle={(val) => toggleCheckbox(val, domesticSource, setDomesticSource)} />

            <Text style={styles.label}>22. Toilet Availability</Text>
            <RadioOption options={['Yes', 'No']} value={toiletAvailability} onChange={setToiletAvailability} />

            <Text style={styles.label}>23. Toilet Condition</Text>
            <RadioOption options={['Working', 'Not Working']} value={toiletCondition} onChange={setToiletCondition} />

            <Text style={styles.label}>24. Education of Householder</Text>
            <RadioOption options={['Illiterate', 'Primary', 'Secondary', 'University']} value={education} onChange={setEducation} />

            <TouchableOpacity style={styles.nextBtn}
                          onPress={() => {
                            router.push('/Land_Form/lnd_own');
                          }}>
              
              <Text style={styles.nextBtnText}>NEXT</Text>
              
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }

  // Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1F7ED',
    },
    inner: {
      padding: width * 0.05, // 5% of screen width
      paddingBottom: height * 0.03,
    },
    heading_land: {
      fontSize: width * 0.06,
      fontWeight: 'bold',
      color: '#0B8B42',
      marginBottom: height * 0.02,
      textAlign: 'center',
    },
    headingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: height * 0.02,
    },
    heading: {
      fontSize: width * 0.05,
      fontWeight: 'bold',
      color: '#0B8B42',
      marginBottom: height * 0.005,
    },
    label: {
      fontSize: width * 0.035,
      marginVertical: height * 0.01,
      color: '#333',
      fontWeight: '600',
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
    },
    inputHalf: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#A5D6A7',
      borderRadius: width * 0.025,
      paddingHorizontal: width * 0.035,
      paddingVertical: height * 0.015,
      backgroundColor: '#E8F5E9',
      color: '#333',
      fontSize: width * 0.035,
      marginRight: width * 0.025,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: width * 0.025,
    },
    radioGroup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: height * 0.01,
    },
    radioOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: width * 0.04,
      marginBottom: height * 0.01,
    },
    radioText: {
      marginLeft: width * 0.02,
      fontSize: width * 0.035,
      color: '#333',
    },
    checkboxGroup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    checkboxOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: width * 0.04,
      marginBottom: height * 0.01,
    },
    nextBtn: {
      backgroundColor: '#134e13',
      paddingVertical: height * 0.018,
      borderRadius: width * 0.025,
      alignItems: 'center',
      marginTop: height * 0.03,
    },
    nextBtnText: {
      color: '#fff',
      fontSize: width * 0.04,
      fontWeight: '600',
    },
    dropdown: {
      borderColor: '#A5D6A7',
      borderRadius: width * 0.025,
      marginBottom: height * 0.015,
      backgroundColor: '#E8F5E9',
    },
    dropdownContainer: {
      borderColor: '#A5D6A7',
      backgroundColor: '#E8F5E9',
      borderRadius: width * 0.025,
    },
    irrigationRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: height * 0.015,
    },
    irrigationInput: {
      flex: 1,
      marginRight: width * 0.02,
    },
    subLabel: {
      fontSize: width * 0.033,  // ~13px on typical 390px width
      color: '#555',
      marginBottom: height * 0.005,
      fontWeight: '500',
    },
    
    inputHalfWrapper: {
      flex: 1,
      marginRight: width * 0.02,
    },
    
    inputIrrigationWrapper: {
      flex: 1,
      marginHorizontal: width * 0.01,
    },
    
    
  });