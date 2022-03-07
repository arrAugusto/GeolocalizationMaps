import React from 'react';
import {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {BlackBtn} from '../components/BlackBtn';
import {PermissionContext} from '../context/PermissionContext';

export const PermissionScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionContext);

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>
        Es necesario el uso del GPS para utilizar esta aplicación
      </Text>
      <BlackBtn title="Permiso" onPress={askLocationPermission} />
      <Text style={{marginTop: 20}}>
        {JSON.stringify(permissions, null, 5)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    width: 300,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
