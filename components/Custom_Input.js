import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Custom_Input = ({ label, value, placeholder, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.inputContainer}>
        <Text style={styles.input_text}> {label} </Text>
        <TextInput
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            style={styles.input}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    marginVertical: 10,
  },
  input: {
    backgroundColor: "white",
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
}, 
input_text: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
  },
});

export default Custom_Input;
