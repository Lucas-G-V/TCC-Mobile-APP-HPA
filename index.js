/**
 * @format
 */

 import {AppRegistry} from 'react-native';
 import {name as appName} from './app.json';
 //import App from './src/pages/Navigation';
 import { Test } from './src/pages/DataExport';
 import App from './APP';


 // AppRegistry.registerComponent(appName, () => MQTT);
AppRegistry.registerComponent(appName, () => App);
 //AppRegistry.registerComponent(appName, () => SignIn);


 