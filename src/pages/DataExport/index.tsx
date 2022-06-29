import React,{ useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableHighlight
} from 'react-native';
import { options } from './style';
import base64 from 'react-native-base64';
//import CheckBox from '@react-native-community/checkbox';
import {BleManager, Device} from 'react-native-ble-plx';
import AsyncStorage from '@react-native-community/async-storage';

import {styles} from '../DataExport/style';
import {LogBox} from 'react-native';

import Speed from '../../assets/low-speed-svgrepo-com.svg'
import Heart from '../../assets/pulse.svg';
import Glucose from '../../assets/sugar-blood-level-diabetes-svgrepo-com.svg';
import Arrow from '../../assets/left-arrow-svgrepo-com.svg';
import HeartTitle from '../../assets/heart-disease.svg';
import Gear from '../../assets/Gear.svg';

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

type TerlemetriaScreenProps = {
  navigation: any;
  route: any;
}

  
const App = ({ navigation, route }: TerlemetriaScreenProps) => {
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
      console.log("teste");
      console.log(value);
  
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

  const [message, setMessage] = useState('');
  const [datasaveHeart, setDataSaveHeart] = useState('');
  const [boxvalue, setBoxValue] = useState(false);



  const [heartcolor, setheartcolor] = useState("#000000");
  function colorHeart(isConnected: boolean){

  if (isConnected==true) {
    setheartcolor("#8F0000");
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
  async function disconnectDevice() {
    console.log('Disconnecting start');
    if (connectedDevice != null) {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) {
        BLTManager.cancelTransaction('messagetransaction');
        BLTManager.cancelTransaction('nightmodetransaction');

        BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
          console.log('DC completed'),
        );
      }
      const connectionStatus = await connectedDevice.isConnected();
      if (!connectionStatus) {
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
        
        //BoxValue
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          BOX_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setBoxValue(StringToBool(base64.decode(characteristic?.value)));
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
      //////////////////
      
      
      
  }
  useEffect(()=>{
    if(message != 'Nothing Yet'){
      setDataSaveHeart(datasaveHeart+message+', ');
      console.log(datasaveHeart);
      
    }
    

  },[message]);



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
          <Text style={styles.title}>TELEMETRIA</Text>
          <HeartTitle style={styles.icon} fill={"#38B6FF"}></HeartTitle>
        </View>
      </View>
      <View style={styles.body}>
            <View style={styles.article}>
              <Text style={styles.titleh1}>{DistanciaPercorrida}</Text>
              <Text style={styles.ph1}>Quilômetros</Text>
            </View>
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
                  <Text style={styles.titleh2}>{velocidade}</Text>
                  <Text style={styles.titleh2}>km/s</Text>
                </View>
              </View>
            </View>
              <View style={styles.play}>
                  <Text style={styles.titleText}>ESP32-Bluetooth</Text>
                <TouchableOpacity style={{width: 120}}>
                  {!isConnected ? (
                    <Button
                      title="Connect"
                      onPress={() => {
                        scanDevices();
                      }}
                      disabled={false}
                    />
                  ) : (
                    <Button
                      title="Disonnect"
                      onPress={() => {
                        disconnectDevice();
                        
                      }}
                      disabled={false}
                    />
                  )}
                </TouchableOpacity>
                
              </View>
              
      </View>
    </View>
  );

}
export default App;