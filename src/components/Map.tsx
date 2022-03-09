import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export const Map = () => {
  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        showsUserLocation
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
    {/* <Marker
          image={require('../assets/markerTruck.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="is title"
          description="is des"
        />
     */}
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
