import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {useLocation} from '../context/useLocation';
import {LoadingScreen} from '../pages/LoadingScreen';
import {Fab} from './Fab';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export const Map = () => {
  const {
    haslocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowLocation,
    routeLines,
  } = useLocation();

  const [showPolyline, setShowPolyline] = useState(true);

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);
  useEffect(() => {
    if (following.current) return;
    const {latitude, longitude} = userLocation;
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  }, [userLocation]);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowLocation;
    };
  }, []);

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();
    following.current = true;
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  };

  if (!haslocation) {
    return <LoadingScreen />;
  } else {
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
        }}
        onTouchStart={() => (following.current = false)}>
        {showPolyline && (
          <Polyline
            coordinates={routeLines}
            strokeColor="black"
            strokeWidth={5}
          />
        )}

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
      <Fab
        iconName="brush-outline"
        onPress={()=> setShowPolyline(value=>!value)}
        style={{
          position: 'absolute',
          bottom: 80,
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
