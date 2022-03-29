import { createStackNavigator } from '@react-navigation/stack';
import First from '../screen/first';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={First} headerShown={false} />
      
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;