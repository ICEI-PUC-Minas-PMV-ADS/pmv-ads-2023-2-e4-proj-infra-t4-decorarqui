import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, DefaultTheme } from "react-native-paper";

const InputSearchBar = ({ placeholder, search, setSearch }) => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "transparent",
      disabled: "transparent",
    },
  };
  return (
    <View style={styles.textInputContainer}>
      <Feather name="search" size={24} color="gray" />
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          theme={theme}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    width: "85%",
    paddingLeft: 10,
    paddingRight: 12,
    paddingVertical: 2,
  },
  textInput: {
    backgroundColor: "white",
    color: "black",
    placeholderTextColor: "gray",
    height: 30,
    fontSize: 14,
    width: "100%",
  },
});

export default InputSearchBar;
