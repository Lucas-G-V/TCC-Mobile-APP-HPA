/**
 * @format
 */

 import {AppRegistry} from 'react-native';
 import {name as appName} from './app.json';
 import App from './src/pages/Navigation';
 import DataExport from './src/pages/DataExport';

 //AppRegistry.registerComponent(appName, () => DataExport);
 
 AppRegistry.registerComponent(appName, () => App);
 //AppRegistry.registerComponent(appName, () => SignIn);