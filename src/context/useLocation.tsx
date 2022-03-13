import Geolocation from '@react-native-community/geolocation';
import {useEffect, useRef, useState} from 'react';
import {Location} from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [haslocation, setHasLocation] = useState(false);
  
  const [routeLines, setRouteLines] = useState<Location[]>([]);

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
      setRouteLines(routes=>[...routeLines, location]);
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
    watchID.current = Geolocation.watchPosition(
      ({coords}) => {
        const location:Location = {
          latitude: coords.latitude,
          longitude: coords.longitude
        }
        setUserLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setRouteLines(routes=>[...routeLines, location]);
      },
      err => console.log({err}),
      {enableHighAccuracy: true, distanceFilter: 2},
    );
  };
  const watchID = useRef<number>();
  const stopFollowLocation = () => {
    if (watchID.current) Geolocation.clearWatch(watchID.current!);
  };

  return {
    haslocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowLocation,
    routeLines
  };
};
