import { useRouter,useLocalSearchParams } from "expo-router";
import { useState,useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { Checkbox, Button, IconButton,RadioButton} from "react-native-paper";

import { useFormStore } from "../../storage/useFormStore";

export default function BasicDetails() {
  const router = useRouter();
  const { id, fromPreview,returnTo } = useLocalSearchParams<{ id?: string; fromPreview?: string }>();
  const { data, submittedForms, setData } = useFormStore();

  const [form, setForm] = useState(
    data.basicDetails || {
      date:"",
      name: "",
      age: "",
      mobile: "",
      district: "",
      hamlet: "",
      panchayat: "",
      block: "",
      idCardType: "",
      idCardNumber: "",
      othercard:"",
      gender: "",
      fatherSpouse: "",
      householdType: "",
      hhcombinedfiled:"",
      adults: "",
      children: "",
      occupation: { agriculture: "", business: "", other: "" },
      specialCategory: false,
      specialCategoryNumber: "",
      caste: "",
      houseOwnership: "",
      houseType: "",
      occupationCombinedField:"",
      drinkingWater: [],
      potability: [],
      domesticWater: [],
      toiletAvailability: "",
      toiletCondition: "",
      education: "",
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

  const handleNext = () => {
    setData("basicDetails", form);
    if (fromPreview && returnTo) {
     
      router.push({ pathname: returnTo, params: { id } });
    } else {
      router.push("/landform/landOwnership");
    }
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />

      <Text style={styles.title}>Plantation Form</Text>
      <Text style={styles.subtitle}>Basic Details</Text>
      <Text style={styles.question}>Date:</Text>
<TextInput
  value={form.date}
  onChangeText={(text) => {
    // Remove anything that's not a number
    let filteredText = text.replace(/[^0-9]/g, '');

    // Format as DD/MM/YYYY
    if (filteredText.length > 2 && filteredText.length <= 4) {
      filteredText = filteredText.slice(0, 2) + '/' + filteredText.slice(2);
    } else if (filteredText.length > 4) {
      filteredText = filteredText.slice(0, 2) + '/' + filteredText.slice(2, 4) + '/' + filteredText.slice(4, 8);
    }

    updateField("date", filteredText);
  }}
  style={styles.input}
  placeholder="DD/MM/YYYY"
  keyboardType="numeric"
/>


      {/* Inputs */}
      <Text style={styles.question}>1. Name of Farmer:</Text>
      <TextInput
        value={form.name}
        onChangeText={(text) => updateField("name", text)}
        style={styles.input}
      />
     <Text style={styles.question}>1-2. Age:</Text>
      <TextInput
        value={form.age}
        onChangeText={(text) => updateField("age", text)}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.question}>2. Mobile Number:</Text>
      <TextInput
        value={form.mobile}
        onChangeText={(text) => updateField("mobile", text)}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.question}>2-3. District:</Text>
      <TextInput
        value={form.district}
        onChangeText={(text) => updateField("district", text)}
        style={styles.input}
      />
       <Text style={styles.question}>3. Block:</Text>
      <TextInput
        value={form.block}
        onChangeText={(text) => updateField("block", text)}
        style={styles.input}
      />
      <Text style={styles.question}>4. Panchayat:</Text>
      <TextInput
        value={form.panchayat}
        onChangeText={(text) => updateField("panchayat", text)}
        style={styles.input}
      />
      <Text style={styles.question}>5. Hamlet:</Text>
      <TextInput
        value={form.hamlet}
        onChangeText={(text) => updateField("hamlet", text)}
        style={styles.input}
      />
     <Text style={styles.question}>6. Identity Card:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("idCardType", value)}
  value={form.idCardType}
>
  <RadioButton.Item label="Aadhar" value="Aadhar" />
  <RadioButton.Item label="EPIC" value="EPIC" />
  <RadioButton.Item label="Driving License" value="Driving License" />
  <RadioButton.Item label="Other" value="Other" />
</RadioButton.Group>
{form.idCardType === "Other" && (
  <TextInput
    value={form.othercard}
    onChangeText={(text) => updateField("othercard", text)}
    style={styles.input}
    placeholder="Specify Identity Card"
  />
)}


      <Text style={styles.question}>7. ID Card Number:</Text>
      <TextInput
        value={form.idCardNumber}
        onChangeText={(text) => updateField("idCardNumber", text)}
        style={styles.input}
      />

<Text style={styles.question}>8. Gender:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("gender", value)}
  value={form.gender}
>
  <RadioButton.Item label="Male" value="Male" />
  <RadioButton.Item label="Female" value="Female" />
  <RadioButton.Item label="Transgender" value="Transgender" />
</RadioButton.Group>


      <Text style={styles.question}>9. Father / Spouse Name:</Text>
      <TextInput
        value={form.fatherSpouse}
        onChangeText={(text) => updateField("fatherSpouse", text)}
        style={styles.input}
      />

<Text style={styles.question}>10. Type of Household:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("householdType", value)}
  value={form.householdType}
>
  <RadioButton.Item label="Nuclear" value="Nuclear" />
  <RadioButton.Item label="Joint" value="Joint" />
</RadioButton.Group>
<Text style={styles.question}>11. Household Members:</Text>
      <TextInput
        value={form.adults}
        onChangeText={(text) => updateField("adults", text)}
        style={styles.input}
        placeholder="Adults"
        keyboardType="numeric"
      />
      <TextInput
        value={form.children}
        onChangeText={(text) => updateField("children", text)}
        style={styles.input}
        placeholder="Children"
        keyboardType="numeric"
      />
<Text style={styles.question}>13. Household Members:</Text>

<TextInput
  value={form.adults}
  onChangeText={(text) => {
    // Allow only numbers, less than 50
    let filteredText = text.replace(/[^0-9]/g, '');
    if (parseInt(filteredText) > 50) filteredText = '50';
    
    // Update both fields and store them in a single variable
    const updatedAdults = filteredText;
    const updatedChildren = form.children; // or get children value here
    
    // Combine both values and update a single field
    const hhcombinedfiled = `${updatedAdults},${updatedChildren}`;
    updateField("hhcombinedfiled", hhcombinedfiled); // Save combined value in a single field
    updateField("adults", updatedAdults); // Optionally, keep adults separate
  }}
  style={styles.input}
  placeholder="Adults"
  keyboardType="numeric"
/>

<TextInput
  value={form.children}
  onChangeText={(text) => {
    let filteredText = text.replace(/[^0-9]/g, '');
    if (parseInt(filteredText) > 50) filteredText = '50';
    
    // Update both fields and store them in a single variable
    const updatedChildren = filteredText;
    const updatedAdults = form.adults; // or get adults value here
    
    // Combine both values and update a single field
    const hhcombinedfiled = `${updatedAdults},${updatedChildren}`;
    updateField("hhcombinedfiled", hhcombinedfiled); // Save combined value in a single field
    updateField("children", updatedChildren); // Optionally, keep children separate
  }}
  style={styles.input}
  placeholder="Children"
  keyboardType="numeric"
/>


<Text style={styles.question}>14. Occupation of Household Members (No. of persons):</Text>

<TextInput
  value={form.occupation.agriculture}
  onChangeText={(text) => {
    let filteredText = text.replace(/[^0-9]/g, '');
    if (parseInt(filteredText) > 50) filteredText = '50';

    const updatedAgriculture = filteredText;
    const updatedBusiness = form.occupation.business;
    const updatedOther = form.occupation.other;

    const occupationCombinedField = `${updatedAgriculture},${updatedBusiness},${updatedOther}`;

    setForm((prev) => ({
      ...prev,
      occupation: {
        ...prev.occupation,
        agriculture: updatedAgriculture,
        occupationCombinedField: occupationCombinedField,
      },
    }));
  }}
  style={[
    styles.input,
    form.occupation.agriculture !== '' && parseInt(form.occupation.agriculture) > 50 && {
      borderColor: 'red',
      borderWidth: 1,
    },
  ]}
  placeholder="Agriculture"
  keyboardType="numeric"
/>
{form.occupation.agriculture !== '' && parseInt(form.occupation.agriculture) > 50 && (
  <Text style={{ color: 'red', fontSize: 12 }}>Cannot exceed 50</Text>
)}

<TextInput
  value={form.occupation.business}
  onChangeText={(text) => {
    let filteredText = text.replace(/[^0-9]/g, '');
    if (parseInt(filteredText) > 50) filteredText = '50';

    const updatedBusiness = filteredText;
    const updatedAgriculture = form.occupation.agriculture;
    const updatedOther = form.occupation.other;

    const occupationCombinedField = `${updatedAgriculture},${updatedBusiness},${updatedOther}`;

    setForm((prev) => ({
      ...prev,
      occupation: {
        ...prev.occupation,
        business: updatedBusiness,
        occupationCombinedField: occupationCombinedField,
      },
    }));
  }}
  style={[
    styles.input,
    form.occupation.business !== '' && parseInt(form.occupation.business) > 50 && {
      borderColor: 'red',
      borderWidth: 1,
    },
  ]}
  placeholder="Business"
  keyboardType="numeric"
/>
{form.occupation.business !== '' && parseInt(form.occupation.business) > 50 && (
  <Text style={{ color: 'red', fontSize: 12 }}>Cannot exceed 50</Text>
)}

<TextInput
  value={form.occupation.other}
  onChangeText={(text) => {
    let filteredText = text.replace(/[^0-9]/g, '');
    if (parseInt(filteredText) > 50) filteredText = '50';

    const updatedOther = filteredText;
    const updatedAgriculture = form.occupation.agriculture;
    const updatedBusiness = form.occupation.business;

    const occupationCombinedField = `${updatedAgriculture},${updatedBusiness},${updatedOther}`;

    setForm((prev) => ({
      ...prev,
      occupation: {
        ...prev.occupation,
        other: updatedOther,
        occupationCombinedField: occupationCombinedField,
      },
    }));
  }}
  style={[
    styles.input,
    form.occupation.other !== '' && parseInt(form.occupation.other) > 50 && {
      borderColor: 'red',
      borderWidth: 1,
    },
  ]}
  placeholder="Other"
  keyboardType="numeric"
/>
{form.occupation.other !== '' && parseInt(form.occupation.other) > 50 && (
  <Text style={{ color: 'red', fontSize: 12 }}>Cannot exceed 50</Text>
)}


<Text style={styles.question}>14. Caste:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("caste", value)}
  value={form.caste}
>
  <RadioButton.Item label="OC" value="OC" />
  <RadioButton.Item label="OBC" value="OBC" />
  <RadioButton.Item label="SC" value="SC" />
  <RadioButton.Item label="ST" value="ST" />
</RadioButton.Group>


<Text style={styles.question}>15. House Ownership:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("houseOwnership", value)}
  value={form.houseOwnership}
>
  <RadioButton.Item label="Rented" value="Rented" />
  <RadioButton.Item label="Owned" value="Owned" />
</RadioButton.Group>

<Text style={styles.question}>16. Type of House:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("houseType", value)}
  value={form.houseType}
>
  <RadioButton.Item label="Pucca" value="pucca" />
  <RadioButton.Item label="Kutcha" value="kutcha" />
</RadioButton.Group>

      <Text style={styles.question}>17. Drinking Water Source:</Text>
      {renderCheckboxGroup("drinkingWater", ["Ponds", "Well & Borewells", "Trucks"])}

      <Text style={styles.question}>18. Potability:</Text>
      {renderCheckboxGroup("potability", ["Ponds", "Tanks", "Well & Borewells"])}

      <Text style={styles.question}>19. Domestic Water Source:</Text>
      {renderCheckboxGroup("domesticWater", ["Ponds", "Tanks", "Well & Borewells"])}

      <Text style={styles.question}>20. Toilet Availability:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("toiletAvailability", value)}
  value={form.toiletAvailability}
>
  <RadioButton.Item label="Yes" value="Yes" />
  <RadioButton.Item label="No" value="No" />
</RadioButton.Group>
      
<Text style={styles.question}>21. Toilet Condition:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("toiletCondition", value)}
  value={form.toiletCondition}
>
  <RadioButton.Item label="Yes" value="yes" />
  <RadioButton.Item label="No" value="no" />
</RadioButton.Group>

      <Text style={styles.question}>22. Education of Householder:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("education", value)}
  value={form.education}
>
  <RadioButton.Item label="Illiterate" value="Illiterate" />
  <RadioButton.Item label="Primary" value="Primary" />
  <RadioButton.Item label="Secondary" value="Secondary" />
  <RadioButton.Item label="University" value="University" />
</RadioButton.Group>


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
  question: {
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
});
