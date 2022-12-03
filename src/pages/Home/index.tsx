import React,{ useEffect, useState, useContext } from 'react';
import {
  TouchableOpacity,
  PermissionsAndroid,
  View,
  Text,
  SafeAreaView,
  Modal, 
  Pressable} from 'react-native';
import base64 from 'react-native-base64';
import {BleManager, Device} from 'react-native-ble-plx';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './style';
import {LogBox} from 'react-native';
import {useOrientation} from '../useOrientation';
import Speed from '../../assets/low-speed-svgrepo-com.svg'
import Heart from '../../assets/pulse.svg';
import Glucose from '../../assets/sugar-blood-level-diabetes-svgrepo-com.svg';
import HeartTitle from '../../assets/heart-disease.svg';
import Gear from '../../assets/Gear.svg';
import Bluetooth from '../../assets/bluetooth.svg';
import Maps from '../../assets/maps.svg';
import Attitude from '../../assets/attitude.svg';
import Configurations from '../../pages/Config/index';
import Closeicon from '../../assets/close.icon.svg'
import Config from '../../assets/config.icon.svg';
import SensorDataContext from '../../Contexts/SensorDataContext';//Var global
import {MqttPubClient} from '../../../services/Mqtt/Publish';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const BLTManager = new BleManager();
const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';// Manter conexão com ESP32
const BATIMENTO_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd';// Coração
const VELOCIDADE_UUID = 'f27b53ad-c63d-49a0-8c0f-9f297e6cc520';//Velocidade
const POTENCIA_UUID ='8b49c16e-4d5f-11ed-bdc3-0242ac120002';//Potencia
const GLICOSE_UUID ='11c6c9d4-4dac-11ed-bdc3-0242ac120002';//Potencia
const ALTURA_UUID ='ebfabdba-4d5f-11ed-bdc3-0242ac120002';//Potencia

type HomeScreenProps= {
  navigation: any;
  route: any;
}  
    //ctr +k+c comenta tudo selecionado
    //ctr +k+u descomenta tudo selecionado
const Home = ({ navigation, route }: HomeScreenProps) => {
  //Como alterar os dados do objeto da variavel global
  const [sensorData, setSensorData]=useContext(SensorDataContext);//Var lendo Variavel global
  const [input, setInput] = useState('');
  const [isLoading, setLoading] = useState(true);
  //Is a device connected?
  const [isConnected, setIsConnected] = useState(false);
  //What device is connected?
  const [connectedDevice, setConnectedDevice] = useState<Device>();
  //Mensagens chegando via bluetooth
  const [message, setMessage] = useState('');//value heart  
  const [potenciavalue, setPotenciaValue] = useState(''); 
  const [glicosevalue, setGlicoseValue] = useState('');
  const [alturavalue, setAlturaValue] = useState(''); 
  const [speedvalue, setSpeedValue]=useState('');
  //Modal code for visualization- Lucas
  const [modalVisible, setModalVisible] = useState(false);
  //Mudando a cor do corção quando conectado
  const [heartcolor, setheartcolor] = useState("#000000");

  function colorHeart(isConnected: boolean){
  if (isConnected==true) {
    setheartcolor("#38B6FF");
    
  }
  else{
    setheartcolor("#000000");
  }
}

  useEffect(() => {console.log(isConnected);colorHeart(isConnected);
    },[isConnected] );
  // Scans availbale BLT Devices and then call connectDevice
  async function scanDevices() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permission Localisation Bluetooth',
        message: 'Requirement for Bluetooth',
        buttonNeutral: 'Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    ).then(answere => {
      console.log('scanning');
      // display the Activityindicator
      BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
        if (error) {
          console.warn(error);
        }
        if (scannedDevice && scannedDevice.name == 'Esp_Heart') {
          BLTManager.stopDeviceScan();
          connectDevice(scannedDevice);
        }
      });
      // stop scanning devices after 5 seconds
      setTimeout(() => {
        BLTManager.stopDeviceScan();
      }, 10000);
    });
  }
  // handle the device disconnection (poorly)
  async function disconnectDevice() 
  {
    console.log('Disconnecting start');
    if (connectedDevice != null) 
    {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) 
      {
        BLTManager.cancelTransaction('messagetransaction');
        BLTManager.cancelTransaction('nightmodetransaction');
        BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
        console.log('DC completed'),
        );
      }
      const connectionStatus = await connectedDevice.isConnected();
      if (!connectionStatus) 
      {
        setIsConnected(false);
      }
    }
  }

  //Connect the device and start monitoring characteristics
  async function connectDevice(device: Device) {
    console.log('connecting to Device:', device.name);
    device
      .connect()
      .then(device => {
        setConnectedDevice(device);
        setIsConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then(device => {
        //  Set what to do when DC is detected
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log('Device DC');
          setIsConnected(false);
        });
        //Read inital values

        //Adicionar novos Devices...............................................
        device
          .readCharacteristicForService(SERVICE_UUID, BATIMENTO_UUID)
          .then(valenc => {
            setMessage(base64.decode(valenc?.value));
          });
        //SpeedValue
        device
          .readCharacteristicForService(SERVICE_UUID, VELOCIDADE_UUID)
          .then(valenc => {
            setSpeedValue(base64.decode(characteristic?.value));
          });
        //Potencia
        device
        .readCharacteristicForService(SERVICE_UUID, POTENCIA_UUID)
        .then(valenc => {
          setPotenciaValue((base64.decode(valenc?.value)));
        });
        //Glicose
        device
        .readCharacteristicForService(SERVICE_UUID, GLICOSE_UUID)
        .then(valenc => {
          setGlicoseValue((base64.decode(valenc?.value)));
        });
        //Glicose
        device
        .readCharacteristicForService(SERVICE_UUID, ALTURA_UUID)
        .then(valenc => {
          setAlturaValue((base64.decode(valenc?.value)));
        });
        //.......................................................................
        //monitor values and tell what to do when receiving an update
        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          BATIMENTO_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setMessage(base64.decode(characteristic?.value))
              console.log(
                'Message update received: ',
                base64.decode(characteristic?.value),
              )
            }
          },
          'messagetransaction',
        );
        //............................................................
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          VELOCIDADE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setSpeedValue(base64.decode(characteristic?.value));//Ygor e Lucas
              console.log(
                'Speed Value update received: ',
                base64.decode(characteristic?.value),
              );
            }
          },
          'speedtransaction',
        );
        //............................................................
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          POTENCIA_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setPotenciaValue(base64.decode(characteristic?.value))
              console.log(
                'Potencia update received: ',
                base64.decode(characteristic?.value),
              )
            }
          },
          'potenciatransaction',
        );
        //................................................................
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          GLICOSE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setGlicoseValue(base64.decode(characteristic?.value))
              console.log(
                'glicose update received: ',
                base64.decode(characteristic?.value),
              )
            }
          },
          'glicosetransaction',
        );
        //.................................................................
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          ALTURA_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setAlturaValue(base64.decode(characteristic?.value))
              console.log(
                'Altura update received: ',
                base64.decode(characteristic?.value),
              )
            }
          },
          'alturasetransaction',
        );
        console.log('Connection established');
      });
  }
// Atualizando o Context com as variasveis enviadas via bluetooth
  useEffect(()=>{
    if(message != 'Nothing Yet'){
      setSensorData({...sensorData,  batimentoCardiaco: Number(message),
        potencia: Number(potenciavalue), 
        altura: Number(alturavalue), 
        velocidade: Number(speedvalue), 
        glicose: Number(glicosevalue)});
    }
  },[message]);

//...........................................................................
 
//Envio do MQTT
const [mqtt, setMqtt]= useState(0)
  useEffect(() => {
      const interval = setInterval(() => {
      setMqtt(Math.random())
    },500);
     return () => clearInterval(interval);
  },[])

  useEffect(() => {
      var data=sensorData
      data.timestamp= Date.now()
      setSensorData({...sensorData,  timestamp:  Date.now()});
       MqttPubClient({
         uri: 'mqtt://smartcampus.maua.br:1883',
         user: 'PUBLIC',
         pass: 'public',
         auth: true,
         clientId: '',
         keepalive: 10,
         topic: 'IMT/TCCHPA',
         message: JSON.stringify(data),
         qos: 0,
         retain: false,
         });
}, [mqtt]);
//.............................................


  const orientation = useOrientation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView style={styles.AndroidSafeArea} />
        <View style={styles.backgroundstatusbar}>
          <TouchableOpacity style={{width: 120}}>
                    {!isConnected ? (
                      <Bluetooth style={styles.bluetooth} fill={heartcolor} 
                        title="Connect"
                        onPress={() => {
                          scanDevices();
                        }}
                        disabled={false}
                      />
                    ) : (
                      <Bluetooth style={styles.bluetooth} fill={heartcolor}
                        title="Disonnect"
                        onPress={() => {
                          disconnectDevice();
                        }}
                        disabled={false}
                      />
                    )}
            </TouchableOpacity>
          <Text style={styles.StatusBar}>HEALTH BOOK</Text>
          <HeartTitle style={styles.icon} fill={"#38B6FF"}></HeartTitle>
        </View>
      </View>
      <View style={styles.body}>
            <View style={orientation === 'PORTRAIT' ? styles.articletitle: styles.articletitleLand}>
              <Text style={orientation === 'PORTRAIT' ? styles.titleh1: styles.titleh1Land}>HPA</Text>
              <Text style={orientation === 'PORTRAIT' ? styles.ph1: styles.ph1Land}>Telemetria</Text>
            </View>

          
            <View style={orientation === 'PORTRAIT' ? styles.none: styles.sectionLand}>

              <View style={styles.section}>
                <View style={styles.component}>
                  <TouchableOpacity onPress={() => {
                navigation.navigate('File', {
                }); }}>
                  <Heart style={styles.icon} fill={message !== null ? heartcolor : '#000'}></Heart>
                  </TouchableOpacity>

                    <View style={styles.textview}>
                      <Text style={styles.titleh2}>{message}</Text>
                      <Text style={styles.titleh2}>bpm</Text>
                    </View>
                </View>
                <View style={styles.component}>
                    <TouchableOpacity onPress={() => {
                    navigation.navigate('File', {
                    }); }}>
                    <Glucose style={styles.icon} fill={glicosevalue !== null ? heartcolor : '#000'}></Glucose>
                    </TouchableOpacity>
                    <View style={styles.textview}>
                      <Text style={styles.titleh2}>{glicosevalue}</Text>
                      <Text style={styles.titleh2}>mg/dL</Text>
                    </View>
                </View>
              </View>


              <View style={styles.section}>
                <View style={styles.component}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('File', {
                    }); }}>
                  <Gear style={styles.gear} fill={glicosevalue !== null ? heartcolor : '#000'}></Gear>
                  </TouchableOpacity>
                  <View style={styles.textview}>
                        <Text style={styles.titleh2}>{potenciavalue}</Text>
                        <Text style={styles.titleh2}>W</Text>
                  </View>
                </View>
                <View style={styles.component}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('File', {
                    }); }}>
                  <Speed style={styles.icon} fill={speedvalue !== null ? heartcolor : '#000'}></Speed>
                </TouchableOpacity>
                  <View style={styles.textview}>
                    <Text style={styles.titleh2}>{speedvalue}</Text>
                    <Text style={styles.titleh2}>m/s</Text>
                  </View>
                </View>
              </View>        

              </View>

            <View style={orientation === 'PORTRAIT' ? styles.none: styles.sectionFooterLand}>

            <View style={orientation === 'PORTRAIT' ? styles.section: styles.sectionfooterIconLand}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Navegacao', {
                }); }}>
                <Maps style={styles.maps} fill={"#000000"}></Maps>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                navigation.navigate('Axies', {
                }); }}>
                <Attitude style={styles.attitude} fill={"#000000"}></Attitude>
                </TouchableOpacity>  
              </View>
 
                <View style={orientation === 'PORTRAIT' ? styles.footer: styles.footerLand}>
                <Pressable
                    onPress={() => {setModalVisible(true);}}
                  >
                    <Config style={styles.icon} fill={"#737574"}></Config>
                </Pressable>
                </View>

            </View>

            <View style={orientation === 'PORTRAIT' ? styles.centeredView: styles.centeredViewLand}>
              <Modal
              animationType="fade"
                  transparent={true}
                  visible={modalVisible} 
                  onRequestClose={() => {
                  setModalVisible(!modalVisible);}}
              >
                <View style={orientation === 'PORTRAIT' ? styles.centeredView: styles.centeredViewLand}>
                  <View style={styles.modalView}>
                    <Configurations></Configurations>
                    <Pressable
                      style={[styles.button]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Closeicon style={styles.save} fill={"#000000"}>
                      </Closeicon>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
      </View>
    </View>
  );

  
}
export default Home;