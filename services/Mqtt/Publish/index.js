import MQTT from 'sp-react-native-mqtt';



export const MqttPubClient = (mqttPubClientProps) => {

  const randIdCreator = () => {
    const S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    return `${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}`;
  };

  const default_ClientId = randIdCreator()
          .replace(/[^a-zA-Z0-9]+/g, '');

  const mqttPubClient = {
                          uri: mqttPubClientProps.uri,
                          user: mqttPubClientProps.user,
                          pass: mqttPubClientProps.pass,
                          auth: mqttPubClientProps.auth,
                          clientId: mqttPubClientProps.clientId,
                          keepalive: mqttPubClientProps.keepalive,
                          topic: mqttPubClientProps.topic,
                          message: mqttPubClientProps.message,
                          qos: mqttPubClientProps.qos,
                          retain: mqttPubClientProps.retain,
                        };

  if (mqttPubClient.clientId == '') {
    mqttPubClient.clientId = default_ClientId;
  }                    

MQTT.createClient({
    uri: mqttPubClient.uri, // protocol://host:port, protocol is [mqtt | mqtts]
    //host: ,// ipaddress or host name (override by uri if set)
    //port: ,// port number (override by uri if set)
    //tls: ,//true/false (override by uri if set to mqtts or wss)
    user: mqttPubClient.user,
    pass: mqttPubClient.pass,
    auth: mqttPubClient.auth,// true/false - override = true Set to true if user or pass exist
    clientId: mqttPubClient.clientId,//string client id
    keepalive: mqttPubClient.keepalive,


  }).then(function(client) {

    client.on('closed', function() {
      console.log('mqtt.event.closed');
    });

    client.on('error', function(msg) {
      console.log('mqtt.event.error', msg);
    });

    client.on('message', function(msg) {
      console.log('mqtt.event.message', msg);
    });

    client.on('connect', function() {
      console.log('connected');
      console.log();
      client.publish(mqttPubClient.topic, mqttPubClient.message, mqttPubClient.qos, mqttPubClient.retain);
    });

    client.connect();

  }).catch(function(err){
    console.log(err);
  });

};
