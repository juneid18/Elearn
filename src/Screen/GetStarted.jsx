import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import GetStartedBanner from '../Images/getStartedBanner.png';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Signup from './Signup';

const GetStartedLogic = props => {
  return (
    <LinearGradient colors={['#fff', '#ccc']} style={styles.container}>
      <Text style={styles.headerText}>Get Started</Text>
      <Image
        source={GetStartedBanner}
        style={styles.bannerImage}
        resizeMode="cover"
        required
      />
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={styles.startedBtn}
          onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.startedBtnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
const GetStarted = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="GetStarted" component={GetStartedLogic} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    position: 'absolute',
    top: 40,
    fontSize: 34, // Larger font size for the header
    fontWeight: 'bold',
    color: '#4A90E2', // Darker color for better contrast
    marginBottom: 20, // Space below the header
  },
  bannerImage: {
    width: '100%', // Responsive width
    height: 300,
    borderRadius: 20, // Rounded corners for the image
    marginBottom: 40, // Spacing between image and button
    shadowColor: '#000', // Adding shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  startedBtn: {
    flex: 1, // Make the buttons take equal space
    backgroundColor: '#5E9CEA',
    paddingVertical: 12,
    borderRadius: 25, // More rounded button for a modern look
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4A90E2',
    marginHorizontal: 10, // Space between buttons
    elevation: 3, // Adding a slight elevation for depth
    shadowColor: '#000', // Shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  startedBtnText: {
    color: '#fff',
    fontSize: 18, // Larger font for better readability
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space out the buttons evenly
    marginTop: 20, // Add some top margin to separate from image
    width: '100%', // Make wrapper full width
  },
});
