import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, 
  View, 
  PermissionsAndroid,
  ToastAndroid,
  Platform, 
  ScrollView, 
  Button,
  SafeAreaView,
  TouchableOpacity} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';

import appConfig from '../../../app.json';
import { styles } from './style';
import { MapView } from '../../components/MapView'
import Arrow from '../../assets/left-arrow-svgrepo-com.svg';
import HeartTitle from '../../assets/heart-disease.svg';


interface TrackpointProps {
  Time: string;
  Position: {
    LatitudeDegrees: number;
    LongitudeDegrees: number;
  };
}

type NavegacaoScreenProps = {
  navigation: any;
  route: any;
}
export const Navegacao = ({ navigation, route }: NavegacaoScreenProps) => {
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);
  const [observing, setObserving] = useState(false);
  const [foregroundService, setForegroundService] = useState(false);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const trackpoint = useRef([{}]); // Trackpoints 

  const watchId: any = useRef(null);


  // Has Permission
  const hasLocationPermission = async () => {

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };


  // update location after permissions
  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    if (Platform.OS === 'android' && foregroundService) {
      await startForegroundService();
    }

    setObserving(true);

    watchId.current = Geolocation.watchPosition(
      (position: any) => {
        setLocation(position);
        //console.log(position);
        handleTrackpoint(position);

      },
      (error) => {
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
        useSignificantChanges: significantChanges,
      },
    );
  };



  const startForegroundService = async () => {
    if (Platform.Version >= 26) {
      await VIForegroundService.createNotificationChannel({
        id: 'locationChannel',
        name: 'Location Tracking Channel',
        description: 'Tracks location of user',
        enableVibration: false,
      });
    }

    return VIForegroundService.startService({
      channelId: 'locationChannel',
      id: 420,
      title: appConfig.displayName,
      text: 'Tracking location updates',
      icon: 'ic_launcher',
    });
  };

  const stopForegroundService = useCallback(() => {
    VIForegroundService.getInstance().stopService().catch((err: any) => err);
  }, []);

  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      stopForegroundService();
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setObserving(false);
    }
  }, [stopForegroundService]);

  useEffect(() => {
    return () => {
      removeLocationUpdates();
    };
  }, []);
 

    // Function to create new trackpoints 
    function handleTrackpoint(position:any) {
      const randomId = Math.floor(Math.random() * 10000); // Refactored after the Official Response
      trackpoint.current = [...trackpoint.current, {
        Time: randomId.toString(),
        Position: {
          LatitudeDegrees: position.coords?.latitude,
          LongitudeDegrees: position.coords?.longitude,
        }
      }]
      //console.log(`trackpoint: ${JSON.stringify(trackpoint)}`)
    };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <SafeAreaView style={styles.AndroidSafeArea} />
        <View style={styles.backgroundstatusbar}>
        <TouchableOpacity onPress={() => {
            navigation.navigate('Home', {
            }); }}>
            <Arrow style={styles.arrow} fill={"#38B6FF"}></Arrow>
            </TouchableOpacity>
            <Text style={styles.title}>NAVEGAÇÃO</Text>
            <HeartTitle style={styles.icon} fill={"#38B6FF"}></HeartTitle>
        </View>
        </View>

      <View  style={styles.mapContainer}>
      <MapView
          coords={location?.coords || null}
        />
      </View>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >


        <View style={styles.buttonContainer}>

          <View style={styles.buttons}>
            <Button
              title="Start Observing"
              onPress={getLocationUpdates}
              disabled={observing}
            />
            <Button
              title="Stop Observing"
              onPress={removeLocationUpdates}
              disabled={!observing}
            />
          </View>
        </View>


        <View style={styles.result}>
          <Text style={styles.titleText}>Latitude: {location?.coords?.latitude || ''}</Text>
          <Text style={styles.titleText}>Longitude: {location?.coords?.longitude || ''}</Text>
          <Text style={styles.titleText}>Altitude: {location?.coords?.altitude}</Text>
        </View>

      </ScrollView>
    </View>
  );
};
export default Navegacao;