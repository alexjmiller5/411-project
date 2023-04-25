import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { StyleSheet } from "react-native";

import Login from './components/Login';
import Home from './components/Home'

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login"
          component={Login} 
          options={{ title: 'Freewater' }}
          props={Stack} 
        />
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
});
