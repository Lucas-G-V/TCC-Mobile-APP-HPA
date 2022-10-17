
import React,{createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useRef, useState} from 'react';
import { PermissionsAndroid, Platform, ToastAndroid } from 'react-native';
import { orientationAngle } from 'react-native-orientation-angle';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import Geolocation from 'react-native-geolocation-service';
import appConfig from '../../app.json';


    const SensorDataContext = createContext({});
    export const SensorDataContextProvider: React.FC = ({children}) =>{;
    

      //{"coords": {"accuracy": 12.034000396728516, "altitude": 772.4000244140625, "altitudeAccuracy": 5.367607116699219, "heading": 128.8655548095703, 
      //"latitude": -23.6521228, "longitude": -46.576863, "speed": 0.000013750048310612328}, "mocked": false, "provider": "fused", "timestamp": 1665599568773}

    //.............................NAVEGAÇÂO....PITCH..ROLL..YAW.....
    const [result, setResult] = useState({ pitch: 0, roll: 0, yaw: 0 })
    const [posicao, setPosicao]= useState({altitude:0,latitude:0,longitude:0})
    const [sensorData,setSensorData]=useState({
        timestamp:0,
        batimentoCardiaco:0,
        potencia:0,
        velocidade:0,
        glicose:0,
        altura:0,
        position:posicao,
        axies:result,
    });

    useEffect(() => {
        orientationAngle.getUpdateInterval((value) => {
        }),
        setSensorData({...sensorData, axies:result})
        //console.log(sensorData.axies)

        ;
    }, [result])

    var [AxiesOrigin,SetAxiesOrigin]=useState({pitch: 0, roll: 0, yaw: 0 });
  
    useState(() => {
        orientationAngle.unsubscribe()
        orientationAngle.subscribe(setResult)
    })


  //............................Lat..Long........................................................
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);
  const [observing, setObserving] = useState(false);
  const [foregroundService, setForegroundService] = useState(false);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [location, setLocation] = useState<any>();
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

  useEffect(() => {
            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes
            var sec = new Date().getSeconds(); //Current Seconds

          setObserving(true);
           Geolocation.watchPosition(
              (position: any) => {
              setSensorData({...sensorData, position:{altitude:position.coords.altitude, latitude:position.coords.latitude, longitude:position.coords.longitude}});
              var date = new Date().getDate()
              },
              (error) => {
              },
              { 
                enableHighAccuracy: highAccuracy,
                distanceFilter: 0,
                interval: 5*60000,
                fastestInterval: 5*60000,
                forceRequestLocation: forceLocation,
                forceLocationManager: useLocationManager,
                showLocationDialog: locationDialog,
                useSignificantChanges: significantChanges,}
            );

            console.log(sensorData);
            console.log('.....'+ date + '/' + month + '/' + year 
            + ' ' + hours + ':' + min + ':' + sec)
  }, [sensorData.position.latitude]);
  

 //.........................................................................



    return <SensorDataContext.Provider value={[sensorData,setSensorData]}>
        {children}
    </SensorDataContext.Provider>;
};
export default SensorDataContext;

