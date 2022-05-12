/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Home from './src/pages/Home';
import {name as appName} from './app.json';
import { SignIn } from './src/pages/SignIn';
import { DataExport } from './src/pages/DataExport';

AppRegistry.registerComponent(appName, () => DataExport);
//AppRegistry.registerComponent(appName, () => SignIn);
