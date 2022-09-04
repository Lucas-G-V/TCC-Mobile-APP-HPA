import React, { useState, useEffect, useContext } from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import { orientationAngle } from 'react-native-orientation-angle'
import {styles} from './style';
import AsyncStorage from '@react-native-community/async-storage';




let exportAxies: any;

  const Configurations = () =>{
;
  const [interval, setInterval] = useState(0)
  const [result, setResult] = useState({ pitch: 0, roll: 0, yaw: 0 })

  useEffect(() => {
    orientationAngle.getUpdateInterval((value) => {
      setInterval(10)
    })
  }, [])
  
  useState(() => {
    orientationAngle.unsubscribe()
    orientationAngle.subscribe(setResult)
  })
  
  const renderValue = (label: string, value: string) => (
    <View style={styles.box}>
      <Text style={styles.renderText}>{label}: </Text>
      <Text style={styles.renderText}>{value} </Text>
    </View>
  )


  let STORAGE_KEY = '@configAxies';
  const saveData = async (results:any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(results))
      
    } catch (e) {
      
    }
  }

  async function saveAxies()
  {
    
    saveData(result);
    
    orientationAngle.unsubscribe()

  }
  async function saveAxiesDefault()
  {

    saveData({ pitch: 0, roll: 0, yaw: 0 });
    setResult({ pitch: 0, roll: 0, yaw: 0 });

    orientationAngle.unsubscribe()


  }

  return (
    <View style={styles.container}>
        <Text style={styles.titleText}> Configurações de posição inicial </Text>
          <View style={styles.box}>
            {renderValue('Pitch', result.pitch.toFixed(2))}
            {renderValue('Roll', result.roll.toFixed(2))}
            {renderValue('Yaw', result.yaw.toFixed(2))}
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