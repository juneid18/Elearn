import { StyleSheet, TextInput, TouchableOpacity, Text, View, DevSettings } from 'react-native';
import React, { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [UserData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const responce = await axios.post('http://10.0.2.2:3000/login' , UserData);
      const token = responce.data.token;
      const success = responce.data.success;
      if (success === true && token) {
        await AsyncStorage.setItem('@user_token',token);
        Snackbar.show({
          text: 'Login Success',
          duration: Snackbar.LENGTH_SHORT,
        });
        DevSettings.reload();
      }


    } catch (error) {
      Snackbar.show({
        text: 'Something went wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
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
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // Set background color for the login page
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
  loginBtn: {
    backgroundColor: '#5E9CEA',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
    elevation: 3,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#4A90E2',
    marginTop: 15,
    fontSize: 16,
  },
});
