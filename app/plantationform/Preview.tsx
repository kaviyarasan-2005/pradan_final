
import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Alert, View,Image} from "react-native";
import { Card, Text, Button, Divider, IconButton } from "react-native-paper";
import { useFormStore } from "../../storage/useFormStore";
export default function Preview() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data, submittedForms, setData, submitForm } = useFormStore();
  const canEdit = () => {
    if (!isSubmittedPreview) return true; // if it's unsubmitted form
    const status = selectedForm?.bankDetails?.formStatus;
    return status === "Pending" || status === "Rejected";
  };
  const isSubmittedPreview = !!id;
  const selectedForm = isSubmittedPreview
    ? submittedForms.find((form) => form.id === id)
    : data;

  if (!selectedForm) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", color: "red" }}>Form not found!</Text>
      </View>
    );
  }

  const [submitting, setSubmitting] = React.useState(false);

const handleSubmit = async () => {
    if (submitting) return; 
  
    try {
      setSubmitting(true);
  
      // Prepare formType and formStatus
      const userStatus = data.bankDetails?.formStatus || "Not Filled";
      setData("formType", "PLANTATION");
      setData("formStatus", userStatus);
  
      await new Promise((resolve) => setTimeout(resolve, 50));
  
      await submitForm();
  
      Alert.alert("Success", "Form Successfully Submitted!", [
        { text: "OK", onPress: () => router.push("/dashboard") },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to submit the form. Please try again.\n" + error);
    } finally {
      setSubmitting(false);
    }
  };
  


  const renderSection = (title: string, fields: any[], editRoute: "/plantationform/basicDetails" | "/plantationform/landOwnership" | "/plantationform/landDevelopment" | "/plantationform/bankDetails") => (
    <Card style={styles.card}>
      <Card.Title title={title} />
      <Card.Content>
        {fields.map((field, index) => (
          <View key={index} style={styles.fieldContainer}>
            <Text style={styles.label}>{field.label}</Text>

            {Array.isArray(field.value) ? (
              field.value.map((item, idx) => {
                if (typeof item === "object" && item?.label && item?.uri) {
                  return (
                    <View key={idx} style={styles.fileRow}>
                      <Text style={styles.value}>{item.label}</Text>
                      <Button
                        mode="text"
                        onPress={() =>
                          router.push({
                            pathname: "/../storage/pdfViewer",
                            params: { uri: item.uri },
                          })
                        }
                        compact
                      >
                        View
                      </Button>
                    </View>
                  );
                } else if (typeof item === "object") {
                  return (
                    <Text key={idx} style={styles.value}>
                      {JSON.stringify(item)}
                    </Text>
                  );
                } else {
                  return (
                    <Text key={idx} style={styles.value}>
                      {item}
                    </Text>
                  );
                }
              })
            ) : typeof field.value === "object" && field.value !== null ? (
              Object.entries(field.value).map(([key, val], idx) => (
                <Text key={idx} style={styles.value}>{`${key}: ${val}`}</Text>
              ))
            ) : (
              <Text style={styles.value}>{field.value}</Text>
            )}

            <Divider style={styles.divider} />
          </View>
        ))}
      </Card.Content>
      {canEdit() && (
      <Card.Actions>
        <Button
          mode="outlined"
          onPress={() =>
            router.push({
              pathname: editRoute,
              params: {
                id: id, // <-- pass the form ID here
                fromPreview: "true", // <-- optional: to know it's from preview
                returnTo: "/plantation/Preview", // keep your existing param
              },
            })
          }
        >
          Edit
        </Button>
      </Card.Actions>
    )}
    </Card>
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconButton
        icon="arrow-left"
        size={24}
        style={styles.backButton}
        onPress={() => router.back()}
      />
 <Text style={styles.title}>Plantation Form</Text>
  <View style={styles.farmerPhotoContainer}>
   {selectedForm?.bankDetails?.submittedFiles?.farmerPhoto?.uri ? (
     <Image
       source={{ uri: selectedForm.bankDetails.submittedFiles.farmerPhoto.uri }}
       style={styles.farmerPhoto}
       resizeMode="cover"
     />
   ) : (
     <Text style={styles.noPhotoText}>Add a farmer photo</Text>
   )}
 </View>
      {renderSection("Basic Details", [
         {label : "Date",value: selectedForm.basicDetails?.date},
        { label: "1. Name of Farmer", value: selectedForm.basicDetails?.name },
        { label: "1-2. Age", value: selectedForm.basicDetails?.age },
        { label: "2. Mobile Number", value: selectedForm.basicDetails?.mobile },
        { label: "3. District", value: selectedForm.basicDetails?.district },
        { label: "4. Block", value: selectedForm.basicDetails?.block },
        { label: "5. Panchayat", value: selectedForm.basicDetails?.panchayat },
        { label: "6. Hamlet", value: selectedForm.basicDetails?.hamlet },
        { label: "4. Panchayat", value: selectedForm.basicDetails?.panchayat },
        { label: "5. Block", value: selectedForm.basicDetails?.block },
        { label: "6. Identity Card", value: data.basicDetails?.idCardType },
        { label: "7. ID Card Number", value: data.basicDetails?.idCardNumber },
        { label: "8. Gender", value: data.basicDetails?.gender },
        { label: "9. Father / Spouse Name", value: data.basicDetails?.fatherSpouse },
        { label: "10. Type of Household", value: data.basicDetails?.householdType },
        { label: "11. Household Members - Adults", value: data.basicDetails?.adults },
        { label: "    Household Members - Children", value: data.basicDetails?.children },
        { label: "12. Occupation of Household Members", value: data.basicDetails?.occupation },
        { label: "13. Special Category", value: data.basicDetails?.specialCategory ? "Yes" : "No" },
        { label: "    Special Category Number", value: data.basicDetails?.specialCategoryNumber },
        { label: "14. Caste", value: data.basicDetails?.caste },
        { label: "15. House Ownership", value: data.basicDetails?.houseOwnership },
        { label: "16. Type of House", value: data.basicDetails?.houseType },
        { label: "17. Drinking Water Source", value: data.basicDetails?.drinkingWater },
        { label: "18. Potability", value: data.basicDetails?.potability },
        { label: "19. Domestic Water Source", value: data.basicDetails?.domesticWater },
        { label: "20. Toilet Availability", value: data.basicDetails?.toiletAvailability },
        { label: "21. Toilet Condition", value: data.basicDetails?.toiletCondition },
        { label: "22. Education of Householder", value: data.basicDetails?.education },
      ],"/plantationform/basicDetails")}

      {renderSection("Land Ownership & Livestock", [
        { label: "23. Land Ownership", value: data.landOwnership?.landOwnershipType },
        { label: "24. Well for Irrigation", value: data.landOwnership?.hasWell },
        { label: "    Area Irrigated (ha)", value: data.landOwnership?.areaIrrigated },
        { label: "25. Irrigated Lands (ha)", value: data.landOwnership?.irrigatedLand },
        { label: "26. Patta Number", value: data.landOwnership?.pattaNumber },
        { label: "27. Total Area (ha)", value: data.landOwnership?.totalArea },
        { label: "27-28. Taluk", value: selectedForm.landOwnership?.taluk },
        { label: "27-28. Firka", value: selectedForm.landOwnership?.firka},
        { label: "28. Revenue Village", value: data.landOwnership?.revenueVillage },
        { label: "29. Crop Season", value: data.landOwnership?.cropSeason },
        { label: "30. LiveStocks" },
        { label: " Goat", value: selectedForm.landOwnership?.livestock?.goat || "0" },
        { label: "    Sheep", value: selectedForm.landOwnership?.livestock?.sheep || "0" },
        { label: "    Milch Animals :", value: selectedForm.landOwnership?.livestock?.milchAnimals || "0" },
        { label: "    Draught Animals :", value: selectedForm.landOwnership?.livestock?.draught_animals || "0" },
        { label: "    Poultry :", value: selectedForm.landOwnership?.livestock?.poultry || "0" },
        { label: "    Others :", value: selectedForm.landOwnership?.livestock?.others || "0" },
      ], "/plantationform/landOwnership")}

      {renderSection("Land Development Details", [
        { label: "31. S.F. No. of the land to be developed", value: data.landDevelopment?.sfNumber },
        {label: "31.a) Latitude", value: data.landDevelopment?.latitude},
        {label: "      Longitude", value: data.landDevelopment?.longitude},
        { label: "32. Soil Type", value: data.landDevelopment?.soilType },
        { label: "33. Land to benefit (ha)", value: data.landDevelopment?.landBenefit },
        { label: "34. Field Inspection done by", value: data.landDevelopment?.inspectionBy },
        { label: "35. Site Approved by", value: data.landDevelopment?.approvedBy },
        { label: "36. Date of Inspection", value: data.landDevelopment?.dateInspectionText },
        { label: "37. Date of Approval", value: data.landDevelopment?.dateApprovalText },
        { label: "38. Type of Plantation proposed", value: data.landDevelopment?.workType },
        { label: "    type of Plantation", value: data.landDevelopment?.workTypeText },
        { label: "39. Area benefited by proposal works (ha)", value: data.landDevelopment?.proposalArea },
        { label: "40. Any other works proposed", value: data.landDevelopment?.otherWorks },
        { label: "41. PRADAN Contribution", value: data.landDevelopment?.pradanContribution },
        { label: "42. Farmer Contribution", value: data.landDevelopment?.farmerContribution },
        { label: "43. Total Estimate Amount", value: data.landDevelopment?.totalEstimate },
      ], "/plantationform/landDevelopment")}

      {renderSection("Bank Details", [
        { label: "44. Name of Account Holder", value: data.bankDetails?.accountHolderName },
        { label: "45. Account Number", value: data.bankDetails?.accountNumber },
        { label: "46. Name of the Bank", value: data.bankDetails?.bankName },
        { label: "47. Branch", value: data.bankDetails?.branch },
        { label: "48. IFSC", value: data.bankDetails?.ifscCode },
        { label: "49. Farmer has agreed for the work and his contribution", value: data.bankDetails?.farmerAgreed },
        {
          label: "50. Files submitted",
          value:
            data.bankDetails?.submittedFiles &&
            Object.values(data.bankDetails.submittedFiles).some(Boolean)
              ? Object.entries(data.bankDetails.submittedFiles)
                  .filter(([_, val]) => !!val)
                  .map(([key, val]) => ({
                    label: `${key}: ${val.name}`,
                    uri: val.uri,
                  }))
              : ["No files uploaded"],
        },
        { label: "Form Status", value: selectedForm.bankDetails?.formStatus },
      ], "/plantationform/bankDetails")}

      <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
        Submit
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
  farmerPhoto: {
    width: 170,
    height: 180,
    position: "absolute",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    zIndex: 2,
  }, farmerPhotoContainer: {
    position: "absolute",
    top: 80,
    right: 30,
    width: 170,
    height: 180,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  
  noPhotoText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  card: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    marginLeft: 10,
  },
  divider: {
    marginVertical: 5,
  },
  submitButton: {
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
});