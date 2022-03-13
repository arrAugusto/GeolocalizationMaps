import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useLocation} from '../context/useLocation';
import {LoadingScreen} from '../pages/LoadingScreen';
import {Fab} from './Fab';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export const Map = () => {
  const {haslocation, initialPosition, getCurrentLocation, followUserLocation} =
    useLocation();

  const mapViewRef = useRef<MapView>();

  useEffect(() => {
    followUserLocation();
    return () =>{
      
    }
  }, [])
  

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  };


  if (!haslocation) {
    return <LoadingScreen />;
  }else{
    followUserLocation();
  }
  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        showsUserLocation
        style={styles.map}
        region={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {/*<Marker
          image={require('../assets/markerTruck.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="is title"
          description="is des"
        />*/}
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
