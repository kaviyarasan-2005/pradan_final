import { useRouter,useLocalSearchParams } from "expo-router";
import { useState,useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { Checkbox, Button, IconButton,RadioButton  } from "react-native-paper";
import { useFormStore } from "../../storage/useFormStore";

export default function LandOwnership() {
  const router = useRouter();
 const { id, fromPreview,returnTo,fromsubmit,returnsubmit } = useLocalSearchParams<{ id?: string; fromPreview?: string }>();
   const { data, submittedForms, setData } = useFormStore();
 

  const [form, setForm] = useState(
    data.landOwnership || {
      landOwnershipType: "",
      hasWell: "",
      areaIrrigated: "",
      irrigatedLand: {
        rainfed: "",
        tankfed: "",
        wellIrrigated: "",
      },
      pattaNumber: "",
      totalArea: "",
      taluk:"",
      firka:"",
      revenueVillage: "",
      cropSeason: "",
      cropSeasonOther: "",
      livestock: {
        goat:"",
        sheep:"",
        milchAnimals:"",
        draught_animals:"",
        poultry:"",
        others:"",
      },
      livestockCombinedField:"",
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

      const handleLivestockChange = (field, value) => {
        let filteredText = value.replace(/[^0-9]/g, '');
      
        const updatedLivestock = {
          ...form.livestock,
          [field]: filteredText,
        };
      
        // Default any empty fields to 0 for the combined string
        const goat = updatedLivestock.goat || '0';
        const sheep = updatedLivestock.sheep || '0';
        const milchAnimals = updatedLivestock.milchAnimals || '0';
        const draught_animals = updatedLivestock.draught_animals || '0';
        const poultry = updatedLivestock.poultry || '0';
        const others = updatedLivestock.others || '0';
      
        const livestockCombinedField = `${goat},${sheep},${milchAnimals},${draught_animals},${poultry},${others}`;
      
        setForm((prev) => ({
          ...prev,
          livestock: {
            ...updatedLivestock,
            livestockCombinedField: livestockCombinedField,
          },
        }));
      };
      

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  
  const updateNestedField = (parent: string, field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
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
    setData("landOwnership", form);
    if (fromPreview && returnTo) {
     
      router.push({ pathname: returnTo, params: { id,returnsubmit:returnsubmit,fromsubmit:fromsubmit} });
    } else {
      router.push("/landform/landDevelopment");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />

      <Text style={styles.title}>Land Form</Text>
      <Text style={styles.subtitle}>Land Ownership & Livestock</Text>

      <Text style={styles.question}>23. Land Ownership:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("landOwnershipType", value)}
  value={form.landOwnershipType}
>
  <RadioButton.Item label="Owner Cultivator" value="Owner Cultivator" />
  <RadioButton.Item label="Lease Holder" value="Lease Holder" />
</RadioButton.Group>


<Text style={styles.question}>24. Well for Irrigation:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("hasWell", value)}
  value={form.hasWell}
>
  <RadioButton.Item label="Yes" value="Yes" />
  <RadioButton.Item label="No" value="No" />
</RadioButton.Group>


      {form.hasWell === "Yes" && (
        <>
          <Text style={styles.question}>Area Irrigated (ha):</Text>
          <TextInput
            value={form.areaIrrigated}
            onChangeText={(text) => updateField("areaIrrigated", text)}
            style={styles.input}
            keyboardType="numeric"
          />
        </>
      )}

      <Text style={styles.question}>25. Irrigated Lands (ha):</Text>
      <Text>Rainfed:</Text>
      <TextInput
        value={form.irrigatedLand.rainfed}
        onChangeText={(text) => updateNestedField("irrigatedLand", "rainfed", text)}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text>Tankfed:</Text>
      <TextInput
        value={form.irrigatedLand.tankfed}
        onChangeText={(text) => updateNestedField("irrigatedLand", "tankfed", text)}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text>Well Irrigated:</Text>
      <TextInput
        value={form.irrigatedLand.wellIrrigated}
        onChangeText={(text) => updateNestedField("irrigatedLand", "wellIrrigated", text)}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>26. Patta Number:</Text>
      <TextInput
        value={form.pattaNumber}
        onChangeText={(text) => updateField("pattaNumber", text)}
        style={styles.input}
      />

      <Text style={styles.question}>27. Total Area (ha):</Text>
      <TextInput
        value={form.totalArea}
        onChangeText={(text) => updateField("totalArea", text)}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.question}>27-28. Taluk:</Text>
      <TextInput
        value={form.taluk}
        onChangeText={(text) => updateField("taluk", text)}
        style={styles.input}
      />
<Text style={styles.question}>27-28. Firka:</Text>
      <TextInput
        value={form.firka}
        onChangeText={(text) => updateField("firka", text)}
        style={styles.input}
      />

      <Text style={styles.question}>28. Revenue Village:</Text>
      <TextInput
        value={form.revenueVillage}
        onChangeText={(text) => updateField("revenueVillage", text)}
        style={styles.input}
      />

<Text style={styles.question}>29. Crop Season:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("cropSeason", value)}
  value={form.cropSeason}
>
  <RadioButton.Item label="Kharif" value="Kharif" />
  <RadioButton.Item label="Rabi" value="Rabi" />
  <RadioButton.Item label="Other" value="Other" />
</RadioButton.Group>

{form.cropSeason === "Other" && (
  <TextInput
    placeholder="Enter Crop Season"
    value={form.cropSeasonOther}
    onChangeText={(text) => updateField("cropSeasonOther", text)}
    style={styles.input}
  />
)}
<Text style={styles.question}>30. Livestock at Home:</Text>

<TextInput
  placeholder="Goat"
  value={form.livestock.goat}
  onChangeText={(text) => handleLivestockChange("goat", text)}
  onBlur={() => handleLivestockChange("goat", form.livestock.goat || "0")}
  keyboardType="numeric"
  style={styles.input}
/>

<TextInput
  placeholder="Sheep"
  value={form.livestock.sheep}
  onChangeText={(text) => handleLivestockChange("sheep", text)}
  onBlur={() => handleLivestockChange("sheep", form.livestock.sheep || "0")}
  keyboardType="numeric"
  style={styles.input}
/>

<TextInput
  placeholder="Milch animals"
  value={form.livestock.milchAnimals}
  onChangeText={(text) => handleLivestockChange("milchAnimals", text)}
  onBlur={() => handleLivestockChange("milchAnimals", form.livestock.milchAnimals || "0")}
  keyboardType="numeric"
  style={styles.input}
/>

<TextInput
  placeholder="Draught Animals"
  value={form.livestock.draught_animals}
  onChangeText={(text) => handleLivestockChange("draught_animals", text)}
  onBlur={() => handleLivestockChange("draught_animals", form.livestock.draught_animals || "0")}
  keyboardType="numeric"
  style={styles.input}
/>

<TextInput
  placeholder="Poultry"
  value={form.livestock.poultry}
  onChangeText={(text) => handleLivestockChange("poultry", text)}
  onBlur={() => handleLivestockChange("poultry", form.livestock.poultry || "0")}
  keyboardType="numeric"
  style={styles.input}
/>

<TextInput
  placeholder="Others"
  value={form.livestock.others}
  onChangeText={(text) => handleLivestockChange("others", text)}
  onBlur={() => handleLivestockChange("others", form.livestock.others || "0")}
  keyboardType="numeric"
  style={styles.input}
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
