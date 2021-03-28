/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { configureNotifications } from './src/providers/notifications-provider';

configureNotifications();
AppRegistry.registerComponent(appName, () => App);
