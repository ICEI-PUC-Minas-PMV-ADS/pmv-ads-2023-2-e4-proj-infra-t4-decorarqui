import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const CadastroFormInput = ({ value, setValue, formTitle, error = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  const formField = StyleSheet.compose(
    styles.formField,
    (value || isFocused) && styles.formFieldFocus,
  );

  const formFieldStyles = StyleSheet.compose(
    formField,
    error && styles.formFieldErrorState,
  );

  const formInputStyles = StyleSheet.compose(
    styles.formFieldText,
    styles.formFieldInput
  );

  return (
    <View style={formFieldStyles}>
      <Text style={styles.formFieldText}>{formTitle}:</Text>
      <TextInput
        style={formInputStyles}
        onChangeText={setValue}
        value={value}
        keyboardType="default"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formField: {
    backgroundColor: "rgba(47, 103, 141, 0.35)",
    marginHorizontal: "5px",
    marginVertical: "1%",
    height: "60px",
    justifyContent: "center",
    borderRadius: "100px",
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px',
  },
  formFieldFocus: {
    backgroundColor: "rgba(47, 103, 141, 1)",
  },
  formFieldText: {
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "19px",
    color: "white",
    whiteSpace: "nowrap"
  },
  formFieldInput: {
    width: "100%",
    marginHorizontal: "10px",
  },
  formFieldErrorState: {
    borderWidth: "2px",
    borderColor: "rgba(255,0,0,0.6)",
  },
});

export default CadastroFormInput;