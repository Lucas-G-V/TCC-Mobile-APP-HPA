import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  Button,
  TouchableHighlight,
  PermissionsAndroid,
  Platform
} from 'react-native';

import { styles } from './style';
import Arrow from '../../assets/left-arrow-svgrepo-com.svg';
import HeartTitle from '../../assets/heart-disease.svg';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';

type NavegacaoScreenProps = {
  navigation: any;
  route: any;
}

const Navegacao = ({ navigation, route }: NavegacaoScreenProps) => {
  //Geo
  const [currentLatitude, setCurrentLatitude]= useState('');
  const [currentLongitude, setCurrentLongitude]= useState('');
  const [watchID, setWatchID]= useState(0);
  const [currentAltitude, setCurrentAltitude] = useState('');
  const callLocation = () => {
      if (Platform.OS === 'ios') {
        getLocation();
      } else {
          console.log('Text');
        const requestLocationPermission = async () => {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Permit Location Access",
              message: "The App needs to access your location.",
              buttonNeutral: "Ask me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            alert('Location Permition Denied');
          }
        };
        requestLocationPermission()
      }
    } 

  const getLocation=() =>{
      Geolocation.getCurrentPosition(
        (position) => { 
          const currentLatitude = JSON.stringify(position.coords.latitude);
          const currentLongitude = JSON.stringify(position.coords.longitude);
          const currentAltitude = JSON.stringify(position.coords.altitude);
          setCurrentLatitude(currentLatitude);
          setCurrentLongitude(currentLongitude);
          setCurrentAltitude(currentAltitude);
        },
        (error) => alert(error.message), //Error callback function
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      const watchID = Geolocation.watchPosition((position) => {
        const currentLatitude = JSON.stringify(position.coords.latitude);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentAltitude = JSON.stringify(position.coords.altitude);
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
        setCurrentAltitude(currentAltitude);
      });
      setWatchID(watchID);
    }
    const clearLocation = () => {
      Geolocation.clearWatch(watchID);
    }

  return(
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
    <View style={styles.body}>
     
        
      <Text style={styles.text}>
        Latitude: {currentLatitude}
      </Text>
      <Text style={styles.text}>
        Longitude: {currentLongitude}
      </Text>
      <Text style={styles.text}>
      Altitude: {currentAltitude}
      </Text>
      <View style={styles.play}>
        <Button title="Get Location" onPress={callLocation} />
        <Button title="Stop Tracking" onPress={clearLocation} />
      </View>
    </View>

    </View>
  )
}

export default Navegacao;
