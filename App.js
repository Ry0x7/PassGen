import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Picker } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [length, setLength] = useState(12);
  const [charset, setCharset] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\\:;?><,./-=');

  const generatePassword = () => {
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  return (
    <View style={styles.container}>
      <Text>Select the length of the password:</Text>
      <Picker
        selectedValue={length}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) => setLength(itemValue)}
      >
        <Picker.Item label="8" value={8} />
        <Picker.Item label="12" value={12} />
        <Picker.Item label="16" value={16} />
        <Picker.Item label="20" value={20} />
      </Picker>
      <Text>Enter the characters to include in the password:</Text>
      <TextInput
        style={styles.input}
        value={charset}
        onChangeText={(text) => setCharset(text)}
      />
      <Button title="Generate Password" onPress={() => alert(generatePassword())} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
