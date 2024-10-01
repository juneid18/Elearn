import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import React, { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';


const Signup = ({ navigation }) => {
  const [UserData, setUserData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleSignup = async () => {
    try {
      const responce = await axios.post('http://10.0.2.2:3000/signup', UserData);
      console.log('SignUp Success ', responce.data);
      Snackbar.show({
        text: 'Registration Successfull',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'close',
          textColor: 'green',
          onPress: () => { },
        },
      });
    } catch (error) {
      Snackbar.show({
        text: 'Something went wrong',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'close',
          textColor: 'green',
          onPress: () => { },
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#999"
        value={UserData.name}
        onChangeText={(e) => setUserData({...UserData, name: e})}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={UserData.email}
        onChangeText={(e) => setUserData({...UserData, email: e})}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={UserData.password}
        onChangeText={(e) => setUserData({...UserData, password: e})}
        secureTextEntry
      />
      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
        <Text style={styles.signupBtnText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // Set background color for the signup page
  },
  headerText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  signupBtn: {
    backgroundColor: '#5E9CEA',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
    elevation: 3,
  },
  signupBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#4A90E2',
    marginTop: 15,
    fontSize: 16,
  },
});
