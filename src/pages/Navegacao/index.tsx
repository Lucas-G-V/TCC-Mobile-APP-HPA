import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, 
  View, 
  Alert, 
  Linking, 
  PermissionsAndroid,
  ToastAndroid,
  Platform, 
  ScrollView, 
  Switch, 
  Button,
  SafeAreaView,
  TouchableHighlight} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';

import appConfig from '../../../app.json';
import { styles } from './style';
import { MapView } from '../../../src/components/MapView'
import Arrow from '../../assets/left-arrow-svgrepo-com.svg';
import HeartTitle from '../../assets/heart-disease.svg';


type NavegacaoScreenProps = {
  navigation: any;
  route: any;
}
export const Navegacao = ({ navigation, route }: NavegacaoScreenProps) => {
  // const [region, setRegion] = useState<Region>();
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);
  const [observing, setObserving] = useState(false);
  const [foregroundService, setForegroundService] = useState(false);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [location, setLocation] = useState<any>(null);

  const watchId: any = useRef(null);

  // Has Permission on iOS
  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow GeoLoc to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => { } },
        ],
      );
    }

    return false;
  };

  // Has Permission
  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

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

  // Get location after permissions
  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position: any) => {
        setLocation(position);
        console.log(position);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
      },
    );
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
        console.log(position);
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
    VIForegroundService.stopService().catch((err: any) => err);
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
  }, [removeLocationUpdates]);


  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <SafeAreaView style={styles.AndroidSafeArea} />
        <View style={styles.backgroundstatusbar}>
        <TouchableHighlight onPress={() => {
            navigation.navigate('Home', {
            }); }}>
            <Arrow style={styles.arrow} fill={"#38B6FF"}></Arrow>
            </TouchableHighlight>
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
        <View>
          <View style={styles.option}> 
            <Text style={styles.titleText}>Enable High Accuracy</Text>
            <Switch onValueChange={setHighAccuracy} value={highAccuracy} />
          </View>

          {Platform.OS === 'android' && (
            <>
              <View style={styles.option}>
                <Text style={styles.titleText}>Show Location Dialog</Text>
                <Switch
                  onValueChange={setLocationDialog}
                  value={locationDialog}
                />
              </View>
              <View style={styles.option}>
                <Text style={styles.titleText}>Force Location Request</Text>
                <Switch
                  onValueChange={setForceLocation}
                  value={forceLocation}
                />
              </View>
              <View style={styles.option}>
                <Text style={styles.titleText}>Use Location Manager</Text>
                <Switch
                  onValueChange={setUseLocationManager}
                  value={useLocationManager}
                />
              </View>
              <View style={styles.option}>
                <Text style={styles.titleText}>Enable Foreground Service</Text>
                <Switch
                  onValueChange={setForegroundService}
                  value={foregroundService}
                />
              </View>
            </>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Get Location" onPress={getLocation} />
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
          <Text style={styles.titleText}>Heading: {location?.coords?.heading}</Text>
          <Text style={styles.titleText}>Accuracy: {location?.coords?.accuracy}</Text>
          <Text style={styles.titleText}>Altitude: {location?.coords?.altitude}</Text>
          <Text style={styles.titleText}>Altitude Accuracy: {location?.coords?.altitudeAccuracy}</Text>
          <Text style={styles.titleText}>Speed: {location?.coords?.speed}</Text>
          <Text style={styles.titleText}>Provider: {location?.provider || ''}</Text>
          <Text style={styles.titleText}>
            Timestamp:{' '}
            {location?.timestamp
              ? new Date(location.timestamp).toLocaleString()
              : ''}
          </Text>
        </View>

      </ScrollView>
    </View>
  );
};
export default Navegacao;
