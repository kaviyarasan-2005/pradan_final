import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { Button, Checkbox, IconButton, RadioButton } from "react-native-paper";

import React from "react";
import { useFormStore } from "../../storage/useFormStore";

export default function BasicDetails() {
  const router = useRouter();
  const { id, fromPreview, returnTo, returnsubmit, fromsubmit,fromland,fromplantation,frompond } = useLocalSearchParams<{
    id?: string;
    fromPreview?: string;
    returnTo?: string;
    returnsubmit?: string;
    fromsubmit?: string;
    fromland?: string;
    frompond?: string;
    fromplantation?: string;
  }>();
  const { data, submittedForms, setData } = useFormStore();

  const [form, setForm] = useState(
    data.basicDetails || {
      name: "k",//cd
      age: "12",
      mobile: "0990909090",
      district: "pdk",
      hamlet: "adk",
      panchayat: "kdk",
      block: "sdk",
      idCardType: "Aadhar",//cd
      idCardNumber: "1234567890987",//cd
      othercard:"", //no
      gender: "Male",
      fatherSpouse: "raj",//cd
      householdType: "Joint",//cd
      adults: "12",//no
      children: "23",//no
      occupation: { agriculture: "2", business: "3", other: "4" },//no
      specialCategory: false,//no
      specialCategoryNumber: "",//cd
      caste: "OC",
      houseOwnership: "Rented",//cd
      houseType: "pucca",//cd
      drinkingWater: [],//no
      potability: [],//no
      domesticWater: [],//no
      toiletAvailability: "Yes",//cd
      toiletCondition: "yes",//cd
      education: "Primary",//cd
      hhcombined:"",//cd
      occupationCombined:"",//cd
      drinkingWaterCombined:[],//cd
      potabilityCombined:[],//cd
      domesticWaterCombined:[],//cd    
      }
  );
  
  useEffect(() => {
    if (id && fromPreview === "true" || id && fromsubmit == "true") {// added from submit here
      const selected = submittedForms.find((form) => form.id === id);
      if (selected) {
        Object.entries(selected).forEach(([key, value]) => {
          setData(key as keyof typeof data, value);
        });
      }
    }
  }, [id]);
  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const updateNestedField = (parent: string, field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],[field]: value,
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

  const hand =() =>{
    updateField("specialCategoryNumber",0);
    if(form.idCardType === "Other"){
      updateField("idCardType",form.othercard);
    }
  }

  // in which id the basics updated while from submitted text
  const handleNext = () => {
    updateField("idCardType",form.othercard);
    setData("basicDetails", form);

    if (fromPreview && returnTo ){
      router.push({ pathname: returnTo, params: { id ,returnsubmit:returnsubmit,fromsubmit:fromsubmit} });
    } 
    // for  from submit check here
    else if (fromsubmit && returnsubmit){
      router.push({ pathname: returnTo, params: { id ,returnsubmit:returnsubmit,fromsubmit:fromsubmit} });
    }
    else {
        if(fromland == "true"){
          
          router.push({pathname:"/prefd/landOwnership",params:{fromland:"true", frompond :"false",fromplantation:"false"}});
        }
        else if(frompond=="true"){
          router.push({pathname:"/prefd/landOwnership",params:{fromland:"false", frompond :"true",fromplantation:"false"}});
        }
        else{
          router.push({pathname:"/prefd/landOwnership",params:{fromland:"false", frompond :"false",fromplantation:"true"}});
        }
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
      {!fromPreview && (
    <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
  )}

<Text style={styles.title}>
  {fromland === "true"
    ? "Land Form"
    : frompond === "true"
    ? "Pond Form"
    : fromplantation === "true"
    ? "Plantation Form"
    : "Form"}
</Text>
      <Text style={styles.subtitle}>Basic Details</Text>
      


      {/* Inputs */}
      <Text style={styles.question}>1. Name of Farmer:</Text>
      <TextInput
        value={form.name}
        onChangeText={(text) => {
          const filteredText = text.replace(/[^A-Za-z\s]/g, '');
          updateField("name", filteredText);
        }}
        style={styles.input}
      />
    <Text style={styles.question}>2. Age:</Text>
<TextInput
  value={form.age}
  onChangeText={(text) => {
    const filteredText = text.replace(/[^0-9]/g, '');
    updateField("age", filteredText);
  }}
  style={[
    styles.input,
    form.age !== '' && parseInt(form.age) > 150 && {
      borderColor: 'red',
      borderWidth: 1,
    },
  ]}
  keyboardType="numeric"
/>
{form.age !== '' && parseInt(form.age) > 150 && (
  <Text style={{ color: 'red', fontSize: 12 }}>Age cannot exceed 150</Text>
)}

     <Text style={styles.question}>3. Mobile Number:</Text>
     <TextInput
      value={form.mobile}
      onChangeText={(text) => {
      const filteredText = text.replace(/[^0-9]/g, '').slice(0, 10);
      updateField("mobile", filteredText);
      }}
      style={[
      styles.input,
      form.mobile.length > 0 && form.mobile.length !== 10 && { borderColor: 'red', borderWidth: 1 }
      ]}
      keyboardType="numeric"
/>

{form.mobile.length > 0 && form.mobile.length !== 10 && (
  <Text style={{ color: 'red', fontSize: 12 }}>Mobile number must be exactly 10 digits</Text>
)}

      <Text style={styles.question}>4. District:</Text>
      <TextInput
        value={form.district}
        onChangeText={(text) => {
          const filteredText = text.replace(/[^A-Za-z\s]/g, '');
          updateField("district", filteredText);
        }}
        style={styles.input}
      />
       <Text style={styles.question}>5. Block:</Text>
      <TextInput
        value={form.block}
        onChangeText={(text) => {
          const filteredText = text.replace(/[^A-Za-z\s]/g, '');
          updateField("block", filteredText);
        }}
        style={styles.input}
      />
      <Text style={styles.question}>6. Panchayat:</Text>
      <TextInput
        value={form.panchayat}
        onChangeText={(text) => {
          const filteredText = text.replace(/[^A-Za-z\s]/g, '');
          updateField("panchayat", filteredText);
        }}
        style={styles.input}
      />
      <Text style={styles.question}>7. Hamlet:</Text>
      <TextInput
        value={form.hamlet}
        onChangeText={(text) => {
          const filteredText = text.replace(/[^A-Za-z\s]/g, '');
          updateField("hamlet", filteredText);
        }}
        style={styles.input}
      />
<Text style={styles.question}>8. Identity Card:</Text>
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

<Text style={styles.question}>9. ID Card Number:</Text>
<TextInput
  value={form.idCardNumber}
  onChangeText={(text) => {
    let filteredText = text;

    if (form.idCardType === "Aadhar") {
      
      filteredText = text.replace(/[^0-9]/g, '').slice(0, 12);
    } else if (form.idCardType === "EPIC" || form.idCardType === "Driving License") {
      filteredText = text.replace(/[^a-zA-Z0-9]/g, '');
    } 
    hand();
    updateField("idCardNumber", filteredText);
  }}
  style={styles.input}
  placeholder={
    form.idCardType === "Aadhar"
      ? "Enter 12-digit Aadhar number"
      : form.idCardType === "EPIC" || form.idCardType === "Driving License"
      ? "Enter ID card number"
      : "Enter ID card number"
  }
/>


<Text style={styles.question}>10. Gender:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("gender", value)}
  value={form.gender}
>
  <RadioButton.Item label="Male" value="Male" />
  <RadioButton.Item label="Female" value="Female" />
  <RadioButton.Item label="Transgender" value="Transgender" />
</RadioButton.Group>


      <Text style={styles.question}>11. Father / Spouse Name:</Text>
      <TextInput
        value={form.fatherSpouse}
        onChangeText={(text) => updateField("fatherSpouse", text)}
         placeholder="Enter Name"
        style={styles.input}
      />

<Text style={styles.question}>12. Type of Household:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("householdType", value)}
  value={form.householdType}
>
  <RadioButton.Item label="Nuclear" value="Nuclear" />
  <RadioButton.Item label="Joint" value="Joint" />
</RadioButton.Group>
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
    const hhcombined = `${updatedAdults},${updatedChildren}`;
    updateField("hhcombined", hhcombined); // Save combined value in a single field
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
    const hhcombined = `${updatedAdults},${updatedChildren}`;
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
    updateNestedField("occupation","agriculture",text);
    const updatedAgriculture = text;
    const updatedBusiness = form.occupation.business;
    const updatedOther = form.occupation.other;
    const occupationCombined = `${updatedAgriculture},${updatedBusiness},${updatedOther}`;
    updateField("occupationCombined" , occupationCombined);
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
    updateNestedField("occupation","business",text);
    const updatedBusiness = text;
    const updatedAgriculture = form.occupation.agriculture;
    const updatedOther = form.occupation.other;

    const occupationCombined = `${updatedAgriculture},${updatedBusiness},${updatedOther}`;
    updateField("occupationCombined" , occupationCombined);
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

<TextInput
  value={form.occupation.other}
  onChangeText={(text) => {
    updateNestedField("occupation","other",text);
    const updatedOther = text;
    const updatedAgriculture = form.occupation.agriculture;
    const updatedBusiness = form.occupation.business;

    const occupationCombined = `${updatedAgriculture},${updatedBusiness},${updatedOther}`;
    updateField("occupationCombined" , occupationCombined);
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
<Text style={styles.question}>15. Special Category:</Text>
<Checkbox.Item
  label="Disabled"
  status={form.specialCategory ? "checked" : "unchecked"}
  onPress={() => updateField("specialCategory", !form.specialCategory)}
/>
{form.specialCategory && (
  <>
    <TextInput
      value={form.specialCategoryNumber}
      onChangeText={(text) => {
        let filteredText = text.replace(/[^0-9]/g, '');
        updateField("specialCategoryNumber", filteredText);
      }}
      style={[
        styles.input,
        form.specialCategoryNumber !== '' && parseInt(form.specialCategoryNumber) > 50 && {
          borderColor: 'red',
          borderWidth: 1,
        },
      ]}
      placeholder="Number of Disabled Persons"
      keyboardType="numeric"
    />
    
    {form.specialCategoryNumber !== '' && parseInt(form.specialCategoryNumber) > 50 && (
      <Text style={{ color: 'red', fontSize: 12 }}>
        Number of disabled persons cannot exceed 50
      </Text>
    )}
  </>
)}


<Text style={styles.question}>16. Caste:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("caste", value)}
  value={form.caste}
>
  <RadioButton.Item label="OC" value="OC" />
  <RadioButton.Item label="OBC" value="OBC" />
  <RadioButton.Item label="SC" value="SC" />
  <RadioButton.Item label="ST" value="ST" />
</RadioButton.Group>


<Text style={styles.question}>17. House Ownership:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("houseOwnership", value)}
  value={form.houseOwnership}
>
  <RadioButton.Item label="Rented" value="Rented" />
  <RadioButton.Item label="Owned" value="Owned" />
</RadioButton.Group>

<Text style={styles.question}>18. Type of House:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("houseType", value)}
  value={form.houseType}
>
  <RadioButton.Item label="Pucca" value="pucca" />
  <RadioButton.Item label="Kutcha" value="kutcha" />
</RadioButton.Group>

      <Text style={styles.question}>19. Drinking Water Source:</Text>
      {renderCheckboxGroup("drinkingWaterCombined", ["Ponds", "Well & Borewells", "Trucks"])}

      <Text style={styles.question}>20. Potability:</Text>
      {renderCheckboxGroup("potabilityCombined", ["Ponds", "Tanks", "Well & Borewells"])}

      <Text style={styles.question}>21. Domestic Water Source:</Text>
      {renderCheckboxGroup("domesticWaterCombined", ["Ponds", "Tanks", "Well & Borewells"])}

      <Text style={styles.question}>22. Toilet Availability:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("toiletAvailability", value)}
  value={form.toiletAvailability}
>
  <RadioButton.Item label="Yes" value="Yes" />
  <RadioButton.Item label="No" value="No" />
</RadioButton.Group>
      
<Text style={styles.question}>23. Toilet Condition:</Text>
<RadioButton.Group
  onValueChange={(value) => updateField("toiletCondition", value)}
  value={form.toiletCondition}
>
  <RadioButton.Item label="Yes" value="yes" />
  <RadioButton.Item label="No" value="no" />
</RadioButton.Group>
      <Text style={styles.question}>24. Education of Householder:</Text>
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