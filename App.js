import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { StyleSheet } from "react-native";

import Login_Oath from './components/Login';
import CreateAccount from './components/CreateAccount';
import Home from './components/Home'
import WaterMap from './components/WaterMap';
import Nearest from './components/Nearest';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login_Oath} 
          options={{ title: 'Freewater' }}
          props={Stack}
        />
        <Stack.Screen 
          name="CreateAccount"
          component={CreateAccount} 
          options={{ title: 'Create Account' }}
          props={Stack}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}          
          options={{ title: 'Freewater Home' }}
          props={Stack}
        />
        <Stack.Screen name="WaterMap" component={WaterMap}/>
        <Stack.Screen 
          name="Nearest" 
          component={Nearest}          
          options={{ title: 'Nearest Water Fountain'}}
          props={Stack}
        />
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
