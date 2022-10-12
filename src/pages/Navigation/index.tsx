import React,{ useContext, useEffect, useState } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home';
import SignIn from '../SignIn';
import Navegacao from '../Navegacao/index';
import File from '../Heart';
import Axies from '../Axies';
import Config from '../Config';
import SensorDataContext, {SensorDataContextProvider} from '../../Contexts/SensorDataContext';
import { orientationAngle } from 'react-native-orientation-angle';
import AsyncStorage from '@react-native-community/async-storage';
const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <SensorDataContextProvider>

          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Navegacao" component={Navegacao} />
            <Stack.Screen name="File" component={File} />
            <Stack.Screen name="Axies" component={Axies} />
            <Stack.Screen name="Config" component={Config} />
          </Stack.Navigator>

      </SensorDataContextProvider>
    </NavigationContainer>
  );
  
}

export default App;