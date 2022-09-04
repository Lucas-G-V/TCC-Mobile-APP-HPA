import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MQTT from 'sp-react-native-mqtt';

export const MqttSubClient = (mqttSubClientProps) => {

  const [mqttSubMessage, setMqttSubMessage] = useState({data: 'no data yet'});

  useEffect(() => {},[mqttSubMessage])

  
  const randIdCreator = () => {
    const S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    return `${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}`;
  };

  const default_ClientId = randIdCreator()
          .replace(/[^a-zA-Z0-9]+/g, '');

  const mqttSubClient = {
                          uri: mqttSubClientProps.uri,
                          user: mqttSubClientProps.user,
                          pass: mqttSubClientProps.pass,
                          auth: mqttSubClientProps.auth,
                          clientId: mqttSubClientProps.clientId,
                          keepalive: mqttSubClientProps.keepalive,
                          topic: mqttSubClientProps.topic,
                          qos: mqttSubClientProps.qos,
                          title: mqttSubClientProps.title,
                        };
  
  if (mqttSubClient.clientId == '') {
    mqttSubClient.clientId = default_ClientId;
  }       

  MQTT.createClient({
 
    uri: mqttSubClient.uri, // protocol://host:port, protocol is [mqtt | mqtts]
    //host: ,// ipaddress or host name (override by uri if set)
    //port: ,// port number (override by uri if set)
    //tls: ,//true/false (override by uri if set to mqtts or wss)
    user: mqttSubClient.user,
    pass: mqttSubClient.pass,
    auth: mqttSubClient.auth,// true/false - override = true Set to true if user or pass exist
    clientId: mqttSubClient.clientId,//string client id
    keepalive: mqttSubClient.keepalive,

  }).then(function(client) {

    client.on('closed', function() {
      console.log('mqtt.event.closed');
    });

    client.on('error', function(msg) {
      console.log('mqtt.event.error', msg);
    });

    client.on('message', function(msg) {
      console.log('mqtt.event.message', msg);
      // mqttSubMessage=msg;
      setMqttSubMessage(msg); 
    });

    client.on('connect', function() {
      console.log('connected');
      // client.subscribe('equatorial/pev/status', 0);
      client.subscribe(mqttSubClient.topic, mqttSubClient.qos);
    });

    client.connect();

  }).catch(function(err){
    console.log(err);
  });

  return (
    <View>
      <Text style={styles.mqttSubMessageInfo}>{mqttSubMessage.title}:{mqttSubMessage.data}</Text>
    </View>
  );

};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mqttSubMessageInfo: {
    color: '#FFFFFF',
    fontWeight: 'normal',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 7,
  },

});
