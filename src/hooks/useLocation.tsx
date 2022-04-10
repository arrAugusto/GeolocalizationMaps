import { useEffect, useState, useRef } from 'react';

import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';
import moment from 'moment';

export const useLocation = () => {

    const [ hasLocation, setHasLocation ] = useState(false);
    const [ routeLines, setRouteLines ] = useState<Location[]>([])

    const [ initialPosition, setInitialPosition ] = useState<Location>({
        accuracy: 0,
        altitude: 0,
        heading: 0,
        latitude: 0,
        longitude: 0,
        speed: 0,
        timeDate: null
    });

    const [ userLocation, setUserLocation] = useState<Location>({
        accuracy: 0,
        altitude: 0,
        heading: 0,
        latitude: 0,
        longitude: 0,
        speed: 0,
        timeDate: null
    });

    const watchId = useRef<number>();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, [])

    

    useEffect(() => {

        getCurrentLocation()
            .then( location => {

                if( !isMounted.current ) return;

                setInitialPosition(location);
                setUserLocation(location);
                setRouteLines( routes => [ ...routes, location ])
                setHasLocation(true);
            });

    }, []);


    const getCurrentLocation = (): Promise<Location> => {
        return new Promise( (resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords, timestamp }) => {
                    const timeFecha =  moment().format('YYYY-MM-DD hh:mm:ss');
                    resolve({
                        accuracy: coords.accuracy,
                        altitude: coords.altitude,
                        heading: coords.heading,
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        speed: coords.speed,
                        timeDate: timeFecha
                    });
    
                },
                (err) => reject({ err }), { enableHighAccuracy: true }
            );
        });
    }

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({ coords,  timestamp }) => {

                if( !isMounted.current ) return;

                const timeFecha =  moment().format('YYYY-MM-DD hh:mm:ss');
                const location: Location = {
                    accuracy: coords.accuracy,
                    altitude: coords.altitude,
                    heading: coords.heading,
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    speed: coords.speed,
                    timeDate: timeFecha
                }

                setUserLocation( location );
                setRouteLines( routes => [ ...routes, location ]);

            },
            (err) => console.log(err), { enableHighAccuracy: true, distanceFilter: 10 }
        );
    }

    const stopFollowUserLocation = () => {
        if( watchId.current )
            Geolocation.clearWatch( watchId.current );
    }


    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        stopFollowUserLocation,
        userLocation,
        routeLines
    }
}
