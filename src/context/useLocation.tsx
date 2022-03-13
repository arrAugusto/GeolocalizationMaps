import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {Location} from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [haslocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getCurrentLocation().then(location => {
      setInitialPosition(location);
      setUserLocation(location);
      setHasLocation(true);
    });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => reject({err}),
        {enableHighAccuracy: true},
      );
    });
  };

  const followUserLocation = () => {
    Geolocation.watchPosition(
      ({coords}) => {
        console.log({coords});
        setUserLocation({
          latitude: coords.latitude,
          longitude: coords.longitude
        })

      },
      (err) => console.log({err}),
      {enableHighAccuracy: true, distanceFilter: 5}
    );
    
  };

  return {
    haslocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
  };
};
