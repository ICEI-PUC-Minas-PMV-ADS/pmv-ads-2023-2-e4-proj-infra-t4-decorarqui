import * as React from "react";
import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

const RadioButtonGroup = ({ options, value, setValue }) => {
  return (
    <RadioButton.Group
      onValueChange={(newValue) => setValue(newValue)}
      value={value}
    >
      {options.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "flex-end",
            marginVertical: 10
          }}
        >
          <Text style={{fontSize: 18}}>{item}</Text>
          <RadioButton value={item} />
        </View>
      ))}
    </RadioButton.Group>
  );
};

export default RadioButtonGroup;
