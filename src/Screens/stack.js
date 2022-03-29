import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './search'
const Stack = createStackNavigator();
import First from './first';
import sod from '../screen/info';
function MyStack() {
  
  return (
    <Stack.Navigator initialRouteName="Home1">
    
      <Stack.Screen name="Home1" component={First} options={{headerShown: false}} />
      <Stack.Screen name="New" component={sod} options={{headerShown: false}} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default MyStack;

