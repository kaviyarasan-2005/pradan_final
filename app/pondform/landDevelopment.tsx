import { useRouter,useLocalSearchParams } from "expo-router";
import { useState,useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, TextInput, Checkbox, Button, IconButton, Divider } from "react-native-paper";
import { useFormStore } from "../../storage/useFormStore";

export default function PondDevelopment() {
  const router = useRouter();
  const { id, fromPreview } = useLocalSearchParams<{ id?: string; fromPreview?: string }>();
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
      latitude: "",
      longitude: "",
      length: "",
      breadth: "",
      depth: "",
      volume: "",
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

  // Auto-calculate volume
  useEffect(() => {
    const l = parseFloat(form.length);
    const b = parseFloat(form.breadth);
    const d = parseFloat(form.depth);

    if (!isNaN(l) && !isNaN(b) && !isNaN(d)) {
      const volume = (l * b * d).toFixed(2);
      setForm((prev) => ({ ...prev, volume }));
    } else {
      setForm((prev) => ({ ...prev, volume: "" }));
    }
  }, [form.length, form.breadth, form.depth]);

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
     
        router.push({ pathname: returnTo, params: { id } });
      } else {
        router.push("/plantationform/bankDetails");
      }
    }, 50);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />

      <Text style={styles.title}>Pond Form</Text>
      <Text style={styles.subtitle}>Land Development Details</Text>

      <Text style={styles.label}>31. S.F. No. of the land to be developed</Text>
      <TextInput
        value={form.sfNumber}
        onChangeText={(text) => updateField("sfNumber", text)}
        style={styles.input}
        mode="outlined"
      />

      <Text style={styles.label}>31.a) Latitude and Longitude</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          mode="outlined"
          style={[styles.input, { flex: 1, marginRight: 5 }]}
          placeholder="Latitude"
          value={form.latitude}
          onChangeText={(text) => updateField("latitude", text)}
          keyboardType="numeric"
        />
        <TextInput
          mode="outlined"
          style={[styles.input, { flex: 1, marginLeft: 5 }]}
          placeholder="Longitude"
          value={form.longitude}
          onChangeText={(text) => updateField("longitude", text)}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.label}>32. Soil Type</Text>
      {["Red Soil", "Black Cotton", "Sandy Loam", "Laterite"].map((type) => (
        <Checkbox.Item
          key={type}
          label={type}
          status={form.soilType.includes(type) ? "checked" : "unchecked"}
          onPress={() => toggleCheckbox("soilType", type)}
        />
      ))}

      <Divider style={styles.divider} />

      <Text style={styles.label}>33. Land to benefit (ha)</Text>
      <TextInput
        value={form.landBenefit}
        onChangeText={(text) => updateField("landBenefit", text)}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>34. Field Inspection done by</Text>
      {["Associate", "Professional"].map((role) => (
        <Checkbox.Item
          key={role}
          label={role}
          status={form.inspectionBy === role ? "checked" : "unchecked"}
          onPress={() => updateField("inspectionBy", role)}
        />
      ))}

      <Text style={styles.label}>35. Site Approved by</Text>
      {["Coordinator", "Team Leader"].map((role) => (
        <Checkbox.Item
          key={role}
          label={role}
          status={form.approvedBy === role ? "checked" : "unchecked"}
          onPress={() => updateField("approvedBy", role)}
        />
      ))}

      <Text style={styles.label}>36. Date of Inspection</Text>
      <TextInput
        value={form.dateInspectionText}
        onChangeText={(text) => updateField("dateInspectionText", text)}
        style={styles.input}
        placeholder="DD/MM/YYYY"
        mode="outlined"
      />

      <Text style={styles.label}>37. Date of Approval</Text>
      <TextInput
        value={form.dateApprovalText}
        onChangeText={(text) => updateField("dateApprovalText", text)}
        style={styles.input}
        placeholder="DD/MM/YYYY"
        mode="outlined"
      />

      <Text style={styles.label}>38. Length (m)</Text>
      <TextInput
        value={form.length}
        onChangeText={(text) => updateField("length", text)}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>39. Breadth (m)</Text>
      <TextInput
        value={form.breadth}
        onChangeText={(text) => updateField("breadth", text)}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>40. Depth (m)</Text>
      <TextInput
        value={form.depth}
        onChangeText={(text) => updateField("depth", text)}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>41. Volume (m³) [Auto Calculated]</Text>
      <TextInput
        value={form.volume}
        style={styles.input}
        mode="outlined"
        editable={false}
      />

      <Text style={styles.label}>42. PRADAN Contribution (Rs)</Text>
      <TextInput
        value={form.pradanContribution}
        onChangeText={(text) => updateField("pradanContribution", text)}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>43. Farmer Contribution (Rs)</Text>
      <TextInput
        value={form.farmerContribution}
        onChangeText={(text) => updateField("farmerContribution", text)}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>44. Total Estimate (Rs)</Text>
      <TextInput
        value={form.totalEstimate}
        onChangeText={(text) => updateField("totalEstimate", text)}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Button mode="contained" onPress={handleNext} style={styles.button}>
      {fromPreview ? "Preview" : "Next"}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 30,
  },
  divider: {
    marginVertical: 10,
  },
});
