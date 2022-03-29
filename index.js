/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Front from './src/navigator/stack';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Front);
