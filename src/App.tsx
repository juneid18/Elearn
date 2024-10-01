import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Screen/Home';
import Profile from './Screen/Profile';
import Cource from './Screen/Cource';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import GetStarted from './Screen/GetStarted';
import {useState, useEffect} from 'react';
import ViewCource from './Screen/ViewCource';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStack" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="ViewCourceStack" component={ViewCource} options={{ title: 'Course Video' }} />
    </Stack.Navigator>
  );
};

const CourceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CourceStack" component={Cource} options={{ headerShown: false }} />
      <Stack.Screen name="ViewCourceStack" component={ViewCource} options={{ title: 'Course Video' }} />
    </Stack.Navigator>
  );
};

const RenderHomeComponent = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Cource') {
              iconName = 'book';
            } else if (route.name === 'Profile') {
              iconName = 'user';
            }
            return <Entypo name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Cource" component={CourceStack} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await AsyncStorage.getItem('@user_token');
      if (fetchedToken !== null) {
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    };

    fetchToken();
  }, []);

  return <>{IsLoggedIn ? <RenderHomeComponent /> : <GetStarted />}</>;
};

export default App;
