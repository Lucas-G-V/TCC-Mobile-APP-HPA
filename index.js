/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Home from './src/pages/Home';
import {name as appName} from './app.json';
import { SignIn } from './src/pages/SignIn';

AppRegistry.registerComponent(appName, () => Home);
//AppRegistry.registerComponent(appName, () => SignIn);
