import React, { useState, useEffect, useContext } from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import { orientationAngle } from 'react-native-orientation-angle'
import {styles} from './style';
import AsyncStorage from '@react-native-community/async-storage';
import SensorDataContext from '../../Contexts/SensorDataContext';

let exportAxies: any;

  const Configurations = () =>{

  const [interval, setInterval] = useState(0)
  const [result, setResult] = useState({ pitch: 0, roll: 0, yaw: 0 })
  const [sensorData, setSensorData]=useContext(SensorDataContext);
  const [selo, setSelo] =useState(0)
  var resetvalue={ pitch: 0, roll: 0, yaw: 0 };
  

  let STORAGE_KEY = '@configAxies';
  const saveData = async (results:any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(results))
      
    } catch (e) {
      
    }
  }

  async function saveAxies()
  {
    saveData(sensorData.axies);
    setSelo(0)
  }

  async function saveAxiesDefault()
  {
    saveData({ pitch: 0, roll: 0, yaw: 0 });
    setSelo(1)
  }

  return (
    <View style={styles.container}>
        <Text style={styles.titleText}> Configurações de posição inicial </Text>
          <View style={styles.box}>
          <Text style={styles.renderText}>{selo === 0 ? ('Pitch: '+ (sensorData.axies.pitch).toFixed(1)) :('Pitch: '+ (resetvalue.pitch).toFixed(1))}</Text>
          <Text style={styles.renderText}>{selo === 0 ? (' Roll: '+ (sensorData.axies.roll).toFixed(1)) :(' Roll: '+ (resetvalue.roll).toFixed(1))}</Text>
          <Text style={styles.renderText}>{selo === 0 ? (' Yaw: '+ (sensorData.axies.yaw).toFixed(1)) :(' Yaw: ' + (resetvalue.yaw).toFixed(1))}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => {saveAxiesDefault();}}>
              <Text style={styles.buttonText}>Resetar Posição</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {saveAxies();}}>
              <Text style={styles.buttonText}>Salvar Posição Atual</Text>
          </TouchableOpacity>

    </View>
  )
}
export default Configurations;