import { StatusBar } from 'expo-status-bar'; // Import StatusBar from expo-status-bar
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react'; // Remove duplicate import statement for Animated

export default function App() {
  const [length, setLength] = useState(32);
  const [charset, setCharset] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\\:;?><,./-=');
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset[Math.floor(Math.random() * charset.length)];
    }
    setPassword(newPassword);
  };

  return (
    <View style={styles.container}>
      <Text>Select the length of the password:</Text>
      <Picker
        selectedValue={length}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue) => setLength(itemValue)}
        itemStyle={{ color: 'blue' }}
      >
        <Picker.Item label="8" value={8} />
        <Picker.Item label="12" value={12} />
        <Picker.Item label="16" value={16} />
        <Picker.Item label="20" value={20} />
        <Picker.Item label="32" value={32} />
      </Picker>
      <Text>Enter the characters to include in the password:</Text>
      <TextInput
        style={styles.input}
        value={charset}
        onChangeText={(text) => setCharset(text)}
      />
      <Button title="Generate Password" onPress={generatePassword} style={styles.button} />
      <View style={styles.output}>
        <TextInput
          style={styles.outputText}
          value={password}
          editable={true}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
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
  output: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  outputText: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});
