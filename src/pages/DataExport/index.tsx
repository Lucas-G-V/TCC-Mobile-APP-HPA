import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView
} from 'react-native';

import { styles } from './style';
import HealthBookTopBar from '../../assets/HeathBookTopBar.png';


/*
---------------------------------------------MQTT--------------------------------------------------------------------------------------------------------
export function Mqtt(){
  const [mqttMessage, setMqttMessage] = useState({
      dados:{
          temperatura:0
      },
  });

  useEffect(() => {

      const mqttSubClient = {
          uri: 'test.mosquitto.org:1883',
          user: '',
          pass: '',
          auth: false,
          clientId: 'healthbook_esp32',
          topic: "temperatura",
          qos: 0,
      };
      MQTT.createClient({

          uri: mqttSubClient.uri,
          clientId: mqttSubClient.clientId,

      }).then(function(client) {

          client.on('closed', function() {
          // console.log('mqtt.event.closed');
          });

          client.on('error', function(msg) {
          // console.log('mqtt.event.error', msg);
          });

          client.on('message', function(msg) {
              setMqttMessage(JSON.parse(msg.data));
              // console.log(value)
          });

          client.connect();
          client.subscribe(mqttSubClient.topic, 0);

      }).catch(function(err){
          // console.log(err);
      });

  }, []);

 
  //useEffect (() =>  {
  //}, [mqttMessage]);


  return (
      <View>
        <Text> Temperatura: </Text>
      </View>
  )
}
-------------------------------------------------------------------------------------------------------------------------------------------------
*/

type DataExportScreenProps = {
  navigation: any;
  route: any;
}

const DataExport = ({ navigation, route }: DataExportScreenProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView style={styles.AndroidSafeArea} />
        <View style={styles.backgroundstatusbar}>
          <Image source={HealthBookTopBar} style={styles.image} />
        </View>
      </View>
      <View style={styles.body}>
          <Text style={styles.text}> Dado Firebase:</Text>
      </View>
      
    </View>
  );
}

export default DataExport;