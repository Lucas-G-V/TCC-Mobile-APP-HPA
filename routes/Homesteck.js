import {createStackNavigator} from 'react-navigation-stack';
import { createaAppContainer } from 'react-navigation';
import Home from '../src/pages/Home';
import { SignIn } from '../src/pages/SignIn';
import { NavigationContainer } from '@react-navigation/native';

const AuthStack = createStackNavigator();

export default () =>(
    <NavigationContainer>
        <AuthStack.Navigator>
            <AuthStack.Screen name= "SignIn" component={SignIn} />
            <AuthStack.Screen name= "Home" component={Home} />
        </AuthStack.Navigator>
    </NavigationContainer>
);