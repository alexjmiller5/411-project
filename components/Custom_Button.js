import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Custom_Button = ({ onPress, title, big, color }) => {
  if (color === 'red') {
    return (
        <TouchableOpacity style={styles.buttonRed} onPress={onPress}>
            <Text style={styles.buttonTextRed}>{title}</Text>
        </TouchableOpacity>
    );
  }
  return (
    <View>
    {big === true ? (
    <TouchableOpacity style={styles.big_button} onPress={onPress}>
      <Text style={styles.big_text}>{title}</Text>
    </TouchableOpacity>
    ) : (
        <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    )} 
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRed: {
    backgroundColor: '#ff0000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 20,
    padding: 30,
    width: '100%'
  }, 
  buttonTextRed: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },  
  button: {
    backgroundColor: '#3366ff',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 4,
    marginBottom: 16,
    padding: 20,
    width: '100%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },  
  big_button: {
    backgroundColor: '#3366ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 20,
    padding: 30,
    width: '100%'
  },
  big_text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Custom_Button;
