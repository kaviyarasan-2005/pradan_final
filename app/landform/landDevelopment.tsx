import { useRouter,useLocalSearchParams } from "expo-router";
import { useState,useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, TextInput, Checkbox, Button, IconButton } from "react-native-paper";
import { useFormStore } from "../../storage/useFormStore";

export default function LandDevelopment() {
  const router = useRouter();
  const { id, fromPreview,returnTo,returnsubmit,fromsubmit } = useLocalSearchParams<{ id?: string; fromPreview?: string }>();
   const { data, submittedForms, setData } = useFormStore();
  const [form, setForm] = useState(
    data.landDevelopment || {
      sfNumber: "",
      soilType: [],
      landBenefit: "",
      inspectionBy: "",
      approvedBy: "",
      dateInspectionText: "",
      dateApprovalText: "",
      workType: [],
      workTypeText: "",
      proposalArea: "",
      otherWorks: "",
      latitude: "",
      longitude: "",
      pradanContribution: "",
      farmerContribution: "",
      totalEstimate: "",
    }
  );
          useEffect(() => {
            if (id && fromPreview === "true") {
              // Load the form by ID and update current working data
              const selected = submittedForms.find((form) => form.id === id);
              if (selected) {
                // Set every key in the form data
                Object.entries(selected).forEach(([key, value]) => {
                  setData(key as keyof typeof data, value);
                });
              }
            }
          }, [id]);

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCheckbox = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value],
    }));
  };

  const renderCheckboxGroup = (
    field: string,
    options: string[],
    isSingle: boolean = false
  ) =>
    options.map((item) => (
      <Checkbox.Item
        key={item}
        label={item}
        status={
          isSingle
            ? form[field] === item
              ? "checked"
              : "unchecked"
            : form[field].includes(item)
            ? "checked"
            : "unchecked"
        }
        onPress={() =>
          isSingle ? updateField(field, item) : toggleCheckbox(field, item)
        }
      />
    ));

    const handleNext = () => {
      setData("landDevelopment", form);
      setTimeout(() => {
        if (fromPreview && returnTo) {
     
          router.push({ pathname: returnTo, params: { id ,returnsubmit:returnsubmit,fromsubmit:fromsubmit} });
        } else {
          router.push("/landform/bankDetails");
        }
      }, 50); 
    };
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />

      <Text style={styles.title}>Land Form</Text>
      <Text style={styles.subtitle}>Land Development Details</Text>

      <Text style={styles.question}>31. S.F. No. of the land to be developed:</Text>
      <TextInput
        value={form.sfNumber}
        onChangeText={(text) => updateField("sfNumber", text)}
        style={styles.input}
      />

      <Text style={styles.question}>31.a) Latitude and Longitude:</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 5 }]}
          placeholder="Latitude"
          value={form.latitude}
          onChangeText={(text) => updateField("latitude", text)}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { flex: 1, marginLeft: 5 }]}
          placeholder="Longitude"
          value={form.longitude}
          onChangeText={(text) => updateField("longitude", text)}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.question}>32. Soil Type:</Text>
      {renderCheckboxGroup("soilType", ["Red Soil", "Black Cotton", "Sandy Loam", "Laterite"])}

      <Text style={styles.question}>33. Land to benefit (ha):</Text>
      <TextInput
        value={form.landBenefit}
        onChangeText={(text) => updateField("landBenefit", text)}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>34. Field Inspection done by:</Text>
      {renderCheckboxGroup("inspectionBy", ["Associate", "Professional"], true)}

      <Text style={styles.question}>35. Site Approved by:</Text>
      {renderCheckboxGroup("approvedBy", ["Coordinator", "Team Leader"], true)}

      <Text style={styles.question}>36. Date of Inspection:</Text>
      <TextInput
        value={form.dateInspectionText}
        onChangeText={(text) => updateField("dateInspectionText", text)}
        style={styles.input}
        placeholder="DD/MM/YYYY"
      />

      <Text style={styles.question}>37. Date of Approval:</Text>
      <TextInput
        value={form.dateApprovalText}
        onChangeText={(text) => updateField("dateApprovalText", text)}
        style={styles.input}
        placeholder="DD/MM/YYYY"
      />
<Text style={styles.question}>38. Type of work proposed:</Text>
{renderCheckboxGroup("workType", [
  "Prosopis removal",
  "Redevelopment of eroded lands",
  "Silt application",
  "Other",
])}

{/* Show text input only if 'Other' is selected */}
{form.workType.includes("Other") && (
  <TextInput
    value={form.workTypeText}
    onChangeText={(text) => updateField("workTypeText", text)}
    style={styles.input}
    placeholder="Specify other work types"
  />
)}


      <Text style={styles.question}>39. Area benefited by proposal works (ha):</Text>
      <TextInput
        value={form.proposalArea}
        onChangeText={(text) => updateField("proposalArea", text)}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>40. Any other works:</Text>
      <TextInput
        value={form.otherWorks}
        onChangeText={(text) => updateField("otherWorks", text)}
        style={styles.input}
        placeholder="Mention if any"
      />

      <Text style={styles.question}>41. PRADAN Contribution (Rs):</Text>
      <TextInput
        value={form.pradanContribution}
        onChangeText={(text) => updateField("pradanContribution", text)}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>42. Farmer Contribution (Rs):</Text>
      <TextInput
        value={form.farmerContribution}
        onChangeText={(text) => updateField("farmerContribution", text)}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>43. Total Estimate (Rs):</Text>
      <TextInput
        value={form.totalEstimate}
        onChangeText={(text) => updateField("totalEstimate", text)}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button mode="contained" onPress={handleNext} style={styles.button}>
      {fromPreview ? "Preview" : "Next"}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 18, fontWeight: "600", textAlign: "center", marginBottom: 20 },
  question: { fontWeight: "bold", marginTop: 10, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: { marginTop: 20 },
});