import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { Button, Checkbox, IconButton } from "react-native-paper";
import { useFormStore } from "../../storage/useFormStore";

export default function LandOwnership() {
  const router = useRouter();
  const { data, setData } = useFormStore();

  const [form, setForm] = useState(
    data.landOwnership || {
      landOwnershipType: "",
      hasWell: "",
      areaIrrigated: "221",
      irrigatedLand: {
        rainfed: "12",
        tankfed: "13",
        wellIrrigated: "12",
      },
      pattaNumber: "21/12",
      totalArea: "121",
      
      taluk:"wfwef",
      firka:"wefwrf",
      revenueVillage: "vwrgvrgv",
      irrigatedLandCombined:"",
      cropSeasonCombined: "",
      livestockCombined:"",
      livestock: {
        goat:"12",
        sheep:"11",
        milchAnimals:"1",
        draught_animals:"1",
        poultry:"1",
        others:"1",
      },
    }
  );

  const updateField = (field: string, value: any) => {
    // Filter out non-numeric characters from the value
    setForm((prev) => ({ ...prev, [field]: value }));
  };
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
    updateField("livestockCombined", livestockCombinedField);
     setForm((prev) => ({
       ...prev,
       livestock: {
         ...updatedLivestock,
         livestockCombinedField: livestockCombinedField,
       },
     }));
     
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
    setForm((prev) => {
      const currentValue = typeof prev[field] === "string" ? prev[field] : "";
      const current = currentValue.split(",").filter(Boolean); // removes empty strings
  
      let updated;
      if (current.includes(value)) {
        updated = current.filter((item) => item !== value);
      } else {
        updated = [...current, value];
      }
  
      return {
        ...prev,
        [field]: updated.join(","),
      };
    });
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
    router.push("./landDevelopment");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />

      <Text style={styles.title}>Land Form</Text>
      <Text style={styles.subtitle}>Land Ownership & Livestock</Text>

      <Text style={styles.question}>23. Land Ownership:</Text>
      {renderCheckboxGroup("landOwnershipType", ["Owner Cultivator", "Lease Holder"], true)}

      <Text style={styles.question}>24. Well for Irrigation:</Text>
      {renderCheckboxGroup("hasWell", ["Yes", "No"], true)}

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
        onChangeText={(text) => {
          const rainfed = form.irrigatedLand.rainfed || "0";
          updateNestedField("irrigatedLand", "rainfed", text)}}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text>Tankfed:</Text>
      <TextInput
        value={form.irrigatedLand.tankfed}
        onChangeText={(text) => {
          const tankfed = form.irrigatedLand.tankfed || "0";
          updateNestedField("irrigatedLand", "tankfed", text)}}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text>Well Irrigated:</Text>
      <TextInput
        value={form.irrigatedLand.wellIrrigated}
        onChangeText={(text) => {
          const well = form.irrigatedLand.wellIrrigated || "0";
          const irrigatedLandcombined = `${form.irrigatedLand.rainfed},${form.irrigatedLand.tankfed},${well}`;
          
          updateField("irrigatedLandCombined", irrigatedLandcombined);
          updateNestedField("irrigatedLand", "wellIrrigated", text)
         
        }}
            
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
      {renderCheckboxGroup("cropSeasonCombined", ["Kharif", "Rabi", "Other"])}
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
        Next
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