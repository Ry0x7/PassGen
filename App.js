import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

export default function App() {
  const [length, setLength] = useState(32); // Updated password length to 32
  const [charset, setCharset] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\\:;?><,./-=');
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const generatePassword = () => {
    let password = '';
    for (let i = 0; i < length; i++) {
      password += selectedCharacters[Math.floor(Math.random() * selectedCharacters.length)];
    }
    return password;
  };

  const toggleCharacterSelection = (character) => {
    if (selectedCharacters.includes(character)) {
      setSelectedCharacters(selectedCharacters.filter((c) => c !== character));
    } else {
      setSelectedCharacters([...selectedCharacters, character]);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Select the length of the password:</Text>
      <Picker
        selectedValue={length}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue) => setLength(itemValue)}
        itemStyle={{ color: 'blue' }} // Added color style for picker items
      >
        <Picker.Item label="8" value={8} />
        <Picker.Item label="12" value={12} />
        <Picker.Item label="16" value={16} />
        <Picker.Item label="20" value={20} />
        <Picker.Item label="32" value={32} /> // Added option for password length 32
      </Picker>
      <Text>Enter the characters to include in the password:</Text>
      <TextInput
        style={styles.input}
        value={charset}
        onChangeText={(text) => setCharset(text)}
      />
      <View style={styles.characterContainer}>
        {charset.split('').map((character) => (
          <Button
            key={character}
            title={character}
            onPress={() => toggleCharacterSelection(character)}
            style={[
              styles.characterButton,
              selectedCharacters.includes(character) && styles.selectedCharacterButton,
            ]}
          />
        ))}
      </View>
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
  characterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  characterButton: {
    margin: 5,
  },
  selectedCharacterButton: {
    backgroundColor: 'blue',
    color: 'white',
  },
});

