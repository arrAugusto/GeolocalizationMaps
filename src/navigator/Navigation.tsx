import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MapRoutes} from '../pages/MapRoutesScreen';
import {PermissionScreen} from '../pages/PermissionScreen';
import {useContext} from 'react';
import {PermissionContext} from '../context/PermissionContext';
import {LoadingScreen} from '../pages/LoadingScreen';

const Stack = createStackNavigator();

export const Navigation = () => {
  const {permissions} = useContext(PermissionContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName="PermissionScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen name="MapRoutes" component={MapRoutes} />
      ) : (
        <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
      )}
    </Stack.Navigator>
  );
};
