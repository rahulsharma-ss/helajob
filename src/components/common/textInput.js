//Commonly used text input component
import React from "react";
import { TextInput, View, Text } from "react-native";
import { StyleSheet } from "react-native";

const TextInputComponent = props => {
  return (
    <View>
      <TextInput
        style={props.style}
        underlineColorAndroid={props.underlineColorAndroid || "rgba(0,0,0,0)"}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        selectionColor={props.selectionColor || "#fff"}
        keyboardType={props.keyboardType}
        onSubmitEditing={props.onSubmitEditing}
        placeholderTextColor={props.placeholderTextColor || "#ffffff"}
        ref={input => (props.ref = input)}
        value={props.value}
        onChangeText={props.onChangeText}
        autoCapitalize={props.autoCapitalize || "none"}
        editable={props.editable || true}
        autoFocus={props.autoFocus || false}
        onBlur={props.onBlur}
        onEndEditing={props.onEndEditing}
        onKeyPress={props.onKeyPress}
      />
      <Text style={props.errorStyles || styles.errorText}>
        {props.errorMessage || ""}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: "rgba(255, 255,255,0.2)",
    paddingVertical: 10,
    paddingHorizontal: 13,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10
  },
  errorText: { color: "red" }
});

export default TextInputComponent;
