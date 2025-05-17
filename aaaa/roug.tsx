import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const scaleFont = size => size * (width / 375); // 375 is a base width (like iPhone X)


export default function PreviewPage() {
  const renderField = (label, value) => (
    <View style={styles.item} key={label}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || 'N/A'}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Basic Details */}
      <View style={styles.headerContainer}>
  <TouchableOpacity onPress={() => router.push("/Land_Form/bank_details")}>
    <Ionicons name="arrow-back" size={width * 0.06} color="#0B8B42" style={styles.backArrow} />
  </TouchableOpacity>
  <Text style={styles.heading_land}>LAND REDEVELOPMENT FORM</Text>
</View>

                 <View style={styles.imageContainer}>
                <Image
                  source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYr59QqXDLWbSy6A1b0wOP-sxDEFvHLyB-LA&s' }}
                  style={styles.photo}
                  resizeMode="cover"
                />
              </View>

      
      <View style={styles.card}>
        <Text style={styles.pageTitle}>Preview</Text>



        <Text style={styles.sectionTitle}>Basic Details</Text>



        {renderField('1. Name of Farmer', '')}
        {renderField('2. Age', '')}
        {renderField('3. Mobile Number', '')}
        {renderField('4. District', '')}
        {renderField('5. Block', '')}
        {renderField('6. Panchayat', '')}
        {renderField('7. Hamlet', '')}
        {renderField('8. Identity Card Type', '')}
        {renderField('9. ID Card Number', '')}
        {renderField('10. Gender', '')}
        {renderField('11. Father / Spouse Name', '')}
        {renderField('12. Household Type', '')}

        <View style={styles.item}>
          <Text style={styles.label}>13. Household Members</Text>
          <Text style={styles.subLabel}>Adults:</Text>
          <Text style={styles.value}></Text>
          <Text style={styles.subLabel}>Children:</Text>
          <Text style={styles.value}></Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>14. Occupation</Text>
          <Text style={styles.subLabel}>Agriculture:</Text>
          <Text style={styles.value}></Text>
          <Text style={styles.subLabel}>Buisness:</Text>
          <Text style={styles.value}></Text>
          <Text style={styles.subLabel}>Others:</Text>
          <Text style={styles.value}></Text>
        </View>

        {renderField('15. Special Category', '')}
        {renderField('Disabled Members', '')}
        {renderField('16. Caste', '')}
        {renderField('17. House Ownership', '')}
        {renderField('18. House Type', '')}
        {renderField('19. Drinking Water Source', '')}
        {renderField('20. Water Potability', '')}
        {renderField('21. Domestic Water Source', '')}
        {renderField('22. Toilet Available?', '')}
        {renderField('23. Toilet Condition', '')}
        {renderField('24. Education Level of Householder', '')}

        <View style={styles.editButtonContainer}>
          <TouchableOpacity style={styles.editBtn}onPress={() => {
                                                        router.push('/Land_Form/Basic details');
                                                      }}>
            <Ionicons name="create-outline" size={ width * 0.06} color="#0B8B42" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Land Ownership & Livestock Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Land Ownership & Livestock Details</Text>

        {renderField('25. Land Ownership', '')}
        {renderField('26. Well for Irrigation', '')}
        <View style={styles.item}>
          <Text style={styles.label}>27. Irrigated Lands (ha)</Text>
          <Text style={styles.subLabel}>Rainfed:</Text>
          <Text style={styles.value}></Text>
          <Text style={styles.subLabel}>Tankfed:</Text>
          <Text style={styles.value}></Text>
          <Text style={styles.subLabel}>Well irrigated:</Text>
          <Text style={styles.value}></Text>
        </View>
        {renderField('28. Patta Number', '')}
        {renderField('29. Total Land Holding', '')}
        {renderField('30. Taluk', '')}
        {renderField('31. Firka', '')}
        {renderField('32. Revenue Village', '')}
        {renderField('33. Crop Season', '')}
        <View style={styles.item}>
          <Text style={styles.label}>35. Livestock at Home (ha)</Text>
          <Text style={styles.subLabel}>Goat:</Text>
          <Text style={styles.value}></Text>
          <Text style={styles.subLabel}>Sheep:</Text>
          <Text style={styles.value}></Text>
          <Text style={styles.subLabel}>Milch Animals:</Text>
          <Text style={styles.value}></Text>
          <Text style={styles.subLabel}>Drought Animals:</Text>
          <Text style={styles.value}></Text>
          <Text style={styles.subLabel}>Poultry:</Text>
          <Text style={styles.value}></Text>
          <Text style={styles.subLabel}>Others:</Text>
          <Text style={styles.value}></Text>
        </View>

        <View style={styles.editButtonContainer}>
          <TouchableOpacity style={styles.editBtn}onPress={() => {
                                                        router.push('/Land_Form/lnd_own');
                                                      }}>
            <Ionicons name="create-outline" size={ width * 0.05} color="#0B8B42" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Land Development Activity */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Land Development Activity</Text>

        {renderField('31. S.F. No. of the land to be developed', '')}
        <View style={styles.item}>
          <Text style={styles.label}>35.a) Latitude and Longitude</Text>
          <Text style={styles.subLabel}>Latitude:</Text>
          <Text style={styles.value}></Text>
          <Text style={styles.subLabel}>Longitude:</Text>
          <Text style={styles.value}></Text>
        </View>
        {renderField('36. Soil Type', '')}
        {renderField('38. Date of Inspection', '')}
        {renderField('39. Type of work proposed', '')}
        {renderField('40. Area benefited by proposed works (ha)', '')}
        {renderField('41. Any other works proposed', '')}
        {renderField('42. PRADAN contribution (in Rs)', '')}
        {renderField('43. Farmer contribution (in Rs)', '')}
        {renderField('44. Total Estimate Amount (in Rs)', '')}

        <View style={styles.editButtonContainer}>
          <TouchableOpacity style={styles.editBtn}onPress={() => {
                                                        router.push('/Land_Form/land_develop_act');
                                                      }}>
            <Ionicons name="create-outline" size={ width * 0.05} color="#0B8B42" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bank Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Bank Details</Text>

        {renderField('45. Name of Account Holder', '')}
        {renderField('46. Account Number', '')}
        {renderField('47. Name of the Bank', '')}
        {renderField('48. Branch', '')}
        {renderField('49. IFSC', '')}
        {renderField('50. Farmer has agreed for the work, and his contribution', '')}

        {/* Field 50: Files submitted */}
        <View style={styles.item}>
          <Text style={styles.label}>51. Files submitted:</Text>
          {[
            'Patta',
            'ID Card',
            'FMB',
            'Photo of Farmer',
            'Bank Passbook',
            'Geo-tagged Photo',
          ].map((file, index) => (
            <View key={index} style={styles.fileRow}>
              <View style={styles.fileLeft}>
              <Ionicons name="document-text-outline" size={ width * 0.06} color="#2E7D32" />
                <Text style={styles.fileName}>{file}</Text>
              </View>
              <View style={styles.fileRight}>
                <Text style={styles.statusText}>Uploaded</Text>
                <Ionicons name="eye-outline" size={ width * 0.05} color="#388E3C" style={{ marginLeft: 10 }} />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.editButtonContainer}>
          <TouchableOpacity style={styles.editBtn}onPress={() => {
                                                        router.push('/Land_Form/bank_details');
                                                      }}>
            <Ionicons name="create-outline" size={ width * 0.05} color="#0B8B42" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View><View style={styles.submitContainer}>
  <TouchableOpacity style={styles.draftBtn} onPress={() => {
    router.push("/draft_page");
  }}>
    <Ionicons name="save-outline" size={width * 0.06} color="#fff" />
    <Text style={styles.draftText}>Save Draft</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.submitBtn} onPress={() => {
    router.push("/dashboard");
  }}>
    <Ionicons name="checkmark-circle-outline" size={width * 0.06} color="#fff" />
    <Text style={styles.submitText}>Submit</Text>
  </TouchableOpacity>
</View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F7ED',
    flex: 1,
  },
  card: {
    margin: width * 0.05, // 5% of screen width
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: width * 0.06, // 6% of screen width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  imageContainer: {
    position: 'absolute',
    top: height * 0.13,     // Adjust vertical offset
    right: width * 0.09,    // Align to right with some margin
    alignItems: 'center',
    zIndex: 10,             // Ensure it stays on top
  },
  photo: {
    width: width * 0.3,     // 30% of screen width
    height: width * 0.3,
    borderRadius: width * 0.02,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  photoLabel: {
    marginTop: height * 0.02,
    fontSize: width * 0.04,
    color: '#388E3C',
    fontWeight: '600',
  },
  pageTitle: {
    fontSize: width * 0.06, // 6% of screen width
    fontWeight: 'bold',
    color: '#0B8B42',
    marginBottom: height * 0.02, // 2% of screen height
    textAlign: 'left',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: height * 0.03, // 3% of screen height
    textAlign: 'left',
  },
  item: {
    marginBottom: height * 0.02, // 2% of screen height
    borderBottomWidth: 1,
    borderBottomColor: '#C8E6C9',
    paddingBottom: height * 0.01, // 1% of screen height
  },
  label: {
    color: '#0B8B42',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: '700',
  },
  subLabel: {
    color: '#388E3C',
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: '600',
    marginTop: height * 0.01, // 1% of screen height
  },
  value: {
    fontSize: width * 0.04, // 4% of screen width
    color: '#444',
    marginTop: height * 0.01, // 1% of screen height
    fontWeight: '500',
  },
  editButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: height * 0.05, // 5% of screen height
  },
  heading_land: {
    fontSize: width * 0.055, // 5.5% of screen width
    fontWeight: 'bold',
    color: '#0B8B42',
    marginBottom: height * 0.02, // 2% of screen height
    marginTop: height * 0.03, // 3% of screen height
    textAlign: 'center',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.02, // 2% of screen height
    paddingHorizontal: width * 0.04, // 4% of screen width
    backgroundColor: '#DFF5E3',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#134e13',
  },
  editText: {
    marginLeft: width * 0.02, // 2% of screen width
    color: '#134e13',
    fontWeight: '600',
    fontSize: width * 0.04, // 4% of screen width
  },
  fileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
    borderRadius: 10,
    paddingVertical: height * 0.02, // 2% of screen height
    paddingHorizontal: width * 0.04, // 4% of screen width
    marginTop: height * 0.02, // 2% of screen height
    backgroundColor: '#F1F8E9',
  },
  fileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileName: {
    marginLeft: width * 0.02, // 2% of screen width
    fontSize: width * 0.04, // 4% of screen width
    color: '#2E7D32',
    fontWeight: '600',
  },
  fileRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: width * 0.035, // 3.5% of screen width
  },
  submitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: height * 0.05,
    marginHorizontal: width * 0.05,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B8B42',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.08,
    borderRadius: 30,
  },
  submitText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    marginLeft: 8,
  },
  draftBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.08,
    borderRadius: 30,
  },
 
draftText: {
  color: '#fff',
  fontSize: scaleFont(16),
  fontWeight: 'bold',
  marginLeft: 8,
},
headerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: height * 0.0,    // ~1.5% of screen height
  paddingHorizontal: width * 0.04,   // ~4% of screen width
},

backArrow: {
  marginRight: width * 0.025,        // ~2.5% of screen width
  paddingTop: height * 0.01,         // ~1% of screen height
},



  
  
});