import { StyleSheet, Text, View, Button, TextInput, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  const [length, setLength] = useState(8);
  const [charset, setCharset] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
  const [useSpecialCharacters, setUseSpecialCharacters] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    let newCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (useSpecialCharacters) {
      newCharset += '!@#$%^&*()_+~|}{[]\\:;?><,./-=';
    }
    if (useNumbers) {
      newCharset += '0123456789';
    }
    setCharset(newCharset);
  }, [useSpecialCharacters, useNumbers]);

  const generatePassword = () => {
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset[Math.floor(Math.random() * charset.length)];
    }
    setPassword(newPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text style={styles.title}>Select the length of the password:</Text>
        <Picker
          selectedValue={length}
          style={styles.picker}
          onValueChange={(itemValue) => setLength(itemValue)}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="8" value={8} />
          <Picker.Item label="12" value={12} />
          <Picker.Item label="16" value={16} />
          <Picker.Item label="20" value={20} />
          <Picker.Item label="32" value={32} />
          <Picker.Item label="69" value={64} />
        </Picker>

        <Text style={styles.title}>Use special characters:</Text>
        <Switch
          value={useSpecialCharacters}
          onValueChange={setUseSpecialCharacters}
        />
        <Text style={styles.title}>Use numbers:</Text>
        <Switch
          value={useNumbers}
          onValueChange={setUseNumbers}
        />
      </View>
      <Button title="Generate Password" onPress={generatePassword} color={'green'}/>
      <View style={styles.outputData}>
        <Text style={styles.title}>Generated Password:</Text>
        <TextInput value={password} style={styles.output} />
        <Button title="Copy to clipboard" onPress={() => Clipboard.setStringAsync(password)} color={'green'}/>
        </View>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container1}>
      <Text style={styles.title}>Work on progress</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box1: {
    backgroundColor: 'darkgray',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 100,
    marginBottom: 10,
    backgroundColor: 'lightgray',
  },
  pickerItem: {
    color: 'blue',
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  output: {
    height: 70,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10, 
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  outputData: {
    alignItems: 'center',
    backgroundColor: 'darkgray',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  }
});