import React, {useState} from 'react';
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
import base64 from 'react-native-base64';
import {BleManager, Device} from 'react-native-ble-plx';
import {styles} from './style';
import {LogBox} from 'react-native';

import Speed from '../../assets/low-speed-svgrepo-com.svg'
import Heart from '../../assets/pulse.svg';
import Clock from '../../assets/clock-svgrepo-com.svg';
import Glucose from '../../assets/sugar-blood-level-diabetes-svgrepo-com.svg';
import Arrow from '../../assets/left-arrow-svgrepo-com.svg';
import HeartTitle from '../../assets/heart-disease.svg';

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

export default function App({ navigation, route }: TerlemetriaScreenProps) {
  
  let Glicose = 100;
  let Duracao = 100;
  let velocidade = 10;
  let DistanciaPercorrida = 10;

  //Is a device connected?
  const [isConnected, setIsConnected] = useState(false);

  //What device is connected?
  const [connectedDevice, setConnectedDevice] = useState<Device>();

  const [message, setMessage] = useState('Nothing Yet');
  const [boxvalue, setBoxValue] = useState(false);

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
              setMessage(base64.decode(characteristic?.value));
              console.log(
                'Message update received: ',
                base64.decode(characteristic?.value),
              );
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
  }
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
                  <Heart style={styles.icon} fill={"#000000"}></Heart>
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
                <Clock style={styles.icon} fill={"#000000"}></Clock>
                <View style={styles.textview}>
                      <Text style={styles.titleh2}>{Duracao}</Text>
                      <Text style={styles.titleh2}>min</Text>
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