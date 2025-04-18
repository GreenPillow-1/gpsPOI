// /navigation/AuthStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'poi-finder/screens/LoginScreen';
import RegisterScreen from 'poi-finder/screens/RegisterScreen';
import HomeScreen from 'poi-finder/screens/HomeScreen';
import AddPOIScreen from '../screens/AddPOIScreen';

<Stack.Screen name="AddPOI" component={AddPOIScreen} />
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
