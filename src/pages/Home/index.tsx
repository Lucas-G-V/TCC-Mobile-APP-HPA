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
import MQTT from 'sp-react-native-mqtt';

import {MqttPubClient} from '../../../services/Mqtt/Publish';




LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const BLTManager = new BleManager();
const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const MESSAGE_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd';
const BOX_UUID = 'f27b53ad-c63d-49a0-8c0f-9f297e6cc520';

function StringToBool(input: String) {
  if (input == '1') {
    return true;
  } else {
    return false;
  }
}
function BoolToString(input: boolean) {
  if (input == true) {
    return '1';
  } else {
    return '0';
  }
}

type HomeScreenProps= {
  navigation: any;
  route: any;
}

  
const Home = ({ navigation, route }: HomeScreenProps) => {

  //Como alterar os dados do objeto da variavel global
   const [sensorData, setSensorData]=useContext(SensorDataContext);//Var lendo Variavel global
    function aumentaBatimento(){;
      setSensorData({...sensorData,  batimentoCardiaco: Math.random()});
    };


    //ctr +k+c comenta tudo selecionado
    //ctr +k+u descomenta tudo selecionado

useEffect(() => {
      console.log(sensorData)
      const interval = setInterval(() => {
        MqttPubClient({
          uri: 'mqtt://smartcampus.maua.br:1883',
          user: 'PUBLIC',
          pass: 'public',
          auth: true,
          clientId: '',
          keepalive: 10,
          topic: 'IMT/TCCHPA',
          message: JSON.stringify(sensorData),
          qos: 0,
          retain: false,
          });
          console.log(sensorData)
      }, 5000);
      return () => clearInterval(interval);
}, [sensorData]);
  





  let Glicose = '';
  let Duracao = '';
  let velocidade = '';
  let DistanciaPercorrida = 10;
  const [input, setInput] = useState('');

  let STORAGE_KEY = '@Heart';
  const saveData = async (results:any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, results)
      
    } catch (e) {
      
    }
  }
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setInput(value);
      }
    } catch (e) {
      
    }
  };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //Is a device connected?
  const [isConnected, setIsConnected] = useState(false);
  //What device is connected?
  const [connectedDevice, setConnectedDevice] = useState<Device>();
  //Mensagens chegando via bluetooth
  const [message, setMessage] = useState('');
  const [boxvalue, setBoxValue] = useState(false);  
  const [datasaveHeart, setDataSaveHeart] = useState('');
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
        if (scannedDevice && scannedDevice.name == 'BLEExample') {
          BLTManager.stopDeviceScan();
          connectDevice(scannedDevice);
        }
      });
      // stop scanning devices after 5 seconds
      setTimeout(() => {
        BLTManager.stopDeviceScan();
      }, 5000);
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
    saveData(datasaveHeart);
  }
  //Function to send data to ESP32
  async function sendBoxValue(value: boolean) {
    BLTManager.writeCharacteristicWithResponseForDevice(
      connectedDevice?.id,
      SERVICE_UUID,
      BOX_UUID,
      base64.encode(value.toString()),
    ).then(characteristic => {
      console.log('Boxvalue changed to :', base64.decode(characteristic.value));
      //setSpeedValue(characteristic.value);//Ygor e Lucas
    });
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
        //Message
        device
          .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
          .then(valenc => {
            setMessage(base64.decode(valenc?.value));
            
          });
          

        //BoxValue
        device
          .readCharacteristicForService(SERVICE_UUID, BOX_UUID)
          .then(valenc => {
            setBoxValue(StringToBool(base64.decode(valenc?.value)));
            
          });
        //monitor values and tell what to do when receiving an update
        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
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
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          BOX_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setBoxValue(StringToBool(base64.decode(characteristic?.value)));
              setSpeedValue(base64.decode(characteristic?.value));//Ygor e Lucas
              console.log(
                'Box Value update received: ',
                base64.decode(characteristic?.value),
              );
            }
          },
          'boxtransaction',
        );
        console.log('Connection established');
      });

  }
  useEffect(()=>{
    if(message != 'Nothing Yet'){
      setDataSaveHeart(datasaveHeart+message+', ');

    }
  },[message]);

 

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
                  <Heart style={styles.icon} fill={heartcolor}></Heart>
                  </TouchableOpacity>

                    <View style={styles.textview}>
                      <Text style={styles.titleh2}>{message}</Text>
                      <Text style={styles.titleh2}>bpm</Text>
                    </View>
                </View>
                <View style={styles.component}>
                    <Glucose style={styles.icon} fill={"#000000"}></Glucose>
                    <View style={styles.textview}>
                      <Text style={styles.titleh2}>{Glicose}</Text>
                      <Text style={styles.titleh2}>mg/dL</Text>
                    </View>
                </View>
              </View>


              <View style={styles.section}>
                <View style={styles.component}>
                  <Gear style={styles.gear} fill={"#000000"}></Gear>
                  <View style={styles.textview}>
                        <Text style={styles.titleh2}>{velocidade}</Text>
                        <Text style={styles.titleh2}>W</Text>
                  </View>
                </View>
                <View style={styles.component}>
                  <Speed style={styles.icon} fill={"#000000"}></Speed>
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