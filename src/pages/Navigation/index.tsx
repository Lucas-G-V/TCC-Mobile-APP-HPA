import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../DataExport';
import SignIn from '../SignIn';
import Navegacao from '../Navegacao/index';
import File from '../Heart';
import Axies from '../Axies';



type DetailsScreenProps = {
  navigation: any;
  route: any;
}
const DetailsScreen = ({ route, navigation }: DetailsScreenProps) => {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Navegacao" component={Navegacao} />
        <Stack.Screen name="File" component={File} />
        <Stack.Screen name="Axies" component={Axies} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;