import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { Checkbox, Button, IconButton } from "react-native-paper";
import { useFormStore } from "../../storage/useFormStore";

export default function BasicDetails() {
  const router = useRouter();
  const { data, setData } = useFormStore();

  const [form, setForm] = useState(
    data.basicDetails || {
      name: "name",
      age: "23",
      mobile: "2934720443709",
      district: "cvosoasd",
      hamlet: "wofqwro",
      panchayat: "areorgae",
      block: "orgeiryoe",
      idCardType: "wir",
      idCardNumber: "4y5450485fh",
      gender: "fhdfi",
      fatherSpouse: "idjfhiiu",
      householdType: "vufhff",
      hhcombined:"",
      occupationCombined:"",
      adults: "0",
      children: "0",
      occupation: [],
      specialCategory: false,
      specialCategoryNumber: "2",
      caste: "",
      houseOwnership: "",
      houseType: "",
      drinkingWaterCombined:"",
      potabilityCombined:"",
      domesticWaterCombined:"",
      toiletAvailability: "",
      toiletCondition: "",
      education: "",
    }
  );

  const updateField = (field: string, value: any) => {
   
    setForm((prev) => ({ ...prev, [field]: value }));
    
  };
  //console.log(form.hhcombined);
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

  const handleNext = () => {
    setData("basicDetails", form);
    router.push("./landOwnership");
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

      <Text style={styles.title}>Land Form</Text>
      <Text style={styles.subtitle}>Basic Details</Text>

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
      {renderCheckboxGroup("idCardType", ["Aadhar", "EPIC", "Driving License"], true)}

      <Text style={styles.question}>7. ID Card Number:</Text>
      <TextInput
        value={form.idCardNumber}
        onChangeText={(text) => updateField("idCardNumber", text)}
        style={styles.input}
      />

      <Text style={styles.question}>8. Gender:</Text>
      {renderCheckboxGroup("gender", ["Male", "Female", "Transgender"], true)}

      <Text style={styles.question}>9. Father / Spouse Name:</Text>
      <TextInput
        value={form.fatherSpouse}
        onChangeText={(text) => updateField("fatherSpouse", text)}
        style={styles.input}
      />

      <Text style={styles.question}>10. Type of Household:</Text>
      {renderCheckboxGroup("householdType", ["Nuclear", "Joint"], true)}

      <Text style={styles.question}>11. Household Members:</Text>
      <TextInput
        value={form.adults}
        onChangeText={(text) => {
          
          let filteredText = text;
          const updatedAdults = filteredText;    
          const hhcombined = ${form.adults},${form.children};
          updateField("hhcombined", hhcombined);  
          updateField("adults", updatedAdults);
        }}
        style={styles.input}
        
        placeholder="Adults"
        keyboardType="numeric"
      />
      <TextInput
        value={form.children}
        onChangeText={(text) => {
          let filteredText = text;
          // Update both fields and store them in a single variable
          const updatedChildren = filteredText;
          // Combine both values and update a single field
          const hhcombined = ${form.adults},${updatedChildren};
          updateField("hhcombined", hhcombined); // Save combined value in a single field
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
    let filteredText = text;
    if (parseInt(filteredText) > 50) filteredText = '50';

    const updatedAgriculture = filteredText;
    const updatedBusiness = form.occupation.business;
    const updatedOther = form.occupation.other;

    const occupationCombinedField = ${updatedAgriculture},${updatedBusiness},${updatedOther};
    updateField("occupationCombined", occupationCombinedField); 
    setForm((prev) => ({
      ...prev,
      occupation: {
        ...prev.occupation,
        agriculture: updatedAgriculture,
        occupationCombined: occupationCombinedField,
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
<TextInput
  value={form.occupation.business}
  onChangeText={(text) => {
    let filteredText = text;
    if (parseInt(filteredText) > 50) filteredText = '50';

    const updatedBusiness = filteredText;
    const updatedAgriculture = form.occupation.agriculture;
    const updatedOther = form.occupation.other;

    const occupationCombinedField = ${updatedAgriculture},${updatedBusiness},${updatedOther};
    updateField("occupationCombined", occupationCombinedField); 
    setForm((prev) => ({
      ...prev,
      occupation: {
        ...prev.occupation,
        business: updatedBusiness,
        occupationCombined: occupationCombinedField,
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
    let filteredText = text;
    if (parseInt(filteredText) > 50) filteredText = '50';
    
    const updatedBusiness = form.occupation.business;
    const updatedAgriculture = form.occupation.agriculture;
    const updatedOther = filteredText;

    const occupationCombinedField = ${updatedAgriculture},${updatedBusiness},${updatedOther};
    updateField("occupationCombined", occupationCombinedField); 
    setForm((prev) => ({
      ...prev,
      occupation: {
        ...prev.occupation,
        other: updatedOther,
        occupationCombined: occupationCombinedField,
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

      <Text style={styles.question}>13. Special Category:</Text>
      <Checkbox.Item
        label="Disabled"
        status={form.specialCategory ? "checked" : "unchecked"}
        onPress={() => updateField("specialCategory", !form.specialCategory)}
      />
      {form.specialCategory && (
        <TextInput
          value={form.specialCategoryNumber}
          onChangeText={(text) => updateField("specialCategoryNumber", text)}
          style={styles.input}
          placeholder="Number of Disabled Persons"
          keyboardType="numeric"
        />
      )}

      <Text style={styles.question}>14. Caste:</Text>
      {renderCheckboxGroup("caste", ["OC", "OBC", "SC", "ST"], true)}

      <Text style={styles.question}>15. House Ownership:</Text>
      {renderCheckboxGroup("houseOwnership", ["Rented", "Owned"], true)}

      <Text style={styles.question}>16. Type of House:</Text>
      {renderCheckboxGroup("houseType", ["Pucca", "Kutcha"], true)}

      <Text style={styles.question}>17. Drinking Water Source:</Text>
      {renderCheckboxGroup("drinkingWaterCombined", ["Ponds", "Well & Borewells", "Trucks"])}

      <Text style={styles.question}>18. Potability:</Text>
      {renderCheckboxGroup("potabilityCombined", ["Ponds", "Tanks", "Well & Borewells"])}

      <Text style={styles.question}>19. Domestic Water Source:</Text>
      {renderCheckboxGroup("domesticWaterCombined", ["Ponds", "Tanks", "Well & Borewells"])}

      <Text style={styles.question}>20. Toilet Availability:</Text>
      {renderCheckboxGroup("toiletAvailability", ["Yes", "No"], true)}

      <Text style={styles.question}>21. Toilet Condition:</Text>
      {renderCheckboxGroup("toiletCondition", ["Working", "Not Working"], true)}

      <Text style={styles.question}>22. Education of Householder:</Text>
      {renderCheckboxGroup("education", ["Illiterate", "Primary", "Secondary", "University"], true)}

      <Button mode="contained" onPress={handleNext} style={styles.button}>
        Next
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