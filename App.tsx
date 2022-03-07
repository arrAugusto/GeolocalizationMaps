import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './src/navigator/Navigation';
import {LogBox} from 'react-native';
import {PermissionsProvider} from './src/context/PermissionContext';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const AppState = ({children}: any) => {
  return <PermissionsProvider>{children}</PermissionsProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
