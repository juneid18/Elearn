import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, DevSettings } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewCourse from './ViewCource';
import Liked from './Liked';

const ProfileScreenLogic = ({ navigation }) => {
  const [userData, setUserData] = useState();

  const LogoutHandle = async () => {
    await AsyncStorage.removeItem('@user_token');
    Snackbar.show({
      text: 'LogOut Success',
      duration: Snackbar.LENGTH_SHORT,
    });
    DevSettings.reload();
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('@user_token');
        const response = await axios.post('http://10.0.2.2:3000/fetchuser', {
          token,
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data from token:', error);
      }
    };
    getUser();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
        <View style={styles.header}>
          {userData ? (
            <View>
              <Text style={styles.greeting}>{userData.name}</Text>
              <Text>{userData.email}</Text>
            </View>
          ) : (
            <Text style={styles.greeting}>Welcome</Text>
          )}
          <Image
            source={{
              uri: 'https://imgs.search.brave.com/kOQMyrptbg2EAQj11na_hJfJQcL7U2B65XbBVtHznv0/rs:fit:860:0:0:0/g:ce/aHR0cDovL3ZlY3Rp/cHMuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE5LzExL3R1/dG9yaWFsLXByZXZp/ZXctbGFyZ2UucG5n',
            }}
            style={styles.profilePic}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              <Feather name="edit-3" size={20} /> Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('liked')}>
            <Text style={styles.buttonText}>
              <Feather name="heart" size={20} /> Liked
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              <Feather name="settings" size={20} /> Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={LogoutHandle}>
            <Text style={styles.buttonText}>
              <AntDesign name="logout" size={20} /> Log Out
            </Text>
          </TouchableOpacity>
        </View>
      <Text style={{ textAlign: 'center', fontSize: 12, margin: 4 }}>Copyright © 2024 Meta Platforms, Inc.</Text>
    </View>
    </ScrollView>
  );
};

const ProfileScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="profile" component={ProfileScreenLogic} options={{headerShown:false}} />
        <Stack.Screen name="liked" component={Liked} options={{title:'You Liked'}} />
        <Stack.Screen name="ViewCourceStack" component={ViewCourse} options={{title: 'Course'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E4A7A', // Darker color for better contrast
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#5E9CEA', // Aesthetic border color
  },
  buttonContainer: {
    marginVertical: 16,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: 'none',
    padding: 6,
    marginVertical: 10,
    width: '100%',
    alignItems: 'left',
  },
  buttonText: {
    color: '#5E9CEA',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
