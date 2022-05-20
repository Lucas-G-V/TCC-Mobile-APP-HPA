import React, { useState } from "react";
import { StyleSheet, Text, View, PermissionsAndroid, Button, Platform } from "react-native";
import Geolocation from '@react-native-community/geolocation';


export default function Localizacao(){
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
              console.log('Text');
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

return (
    <View style={styles.container}>
    <Text style={styles.text}>
      Latitude: {currentLatitude}
    </Text>
    <Text style={styles.text}>
      Longitude: {currentLongitude}
    </Text>
    <Text style={styles.text}>
     Altitude: {currentAltitude}
    </Text>
    <View style={styles.button}>
      <Button title="Get Location" onPress={callLocation} />
    </View>
    <View style={styles.button}>
      <Button title="Stop Tracking" onPress={clearLocation} />
    </View>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
      marginBottom: 50,
      marginRight: 20,
      marginLeft: 20,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      elevation: 3,
      flex: 1,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
    },
    mapContainer: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      flex: 1,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });