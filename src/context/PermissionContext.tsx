import React from 'react';
import {useEffect} from 'react';

import {createContext, useState} from 'react';
import {AppState, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  openSettings,
} from 'react-native-permissions';

export interface PermissionState {
  locationStatus: PermissionStatus;
}

export const PermissionStateInit: PermissionState = {
  locationStatus: 'unavailable',
};
type PermissionsContextProps = {
  permissions: PermissionState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};
export const PermissionContext = createContext({} as PermissionsContextProps); //exporta

export const PermissionsProvider = ({children}: any) => {
  const [permissions, setPermissions] = useState(PermissionStateInit);
  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state !== 'active') return;
      checkLocationPermission();
    });
  }, []);

  const askLocationPermission = async () => {
    let permisoStatus: PermissionStatus;
    
    if (Platform.OS === 'ios') {
      permisoStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permisoStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    if (permisoStatus === 'blocked') {
      openSettings();
    }

    setPermissions({
      ...permissions,
      locationStatus: permisoStatus,
    });
  };

  const checkLocationPermission = async () => {
    let permisoStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permisoStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permisoStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    console.log(permisoStatus);
    setPermissions({
      ...permissions,
      locationStatus: permisoStatus,
    });
  };

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        askLocationPermission,
        checkLocationPermission,
      }}>
      {children}
    </PermissionContext.Provider>
  );
};
