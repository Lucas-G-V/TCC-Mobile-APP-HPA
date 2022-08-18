import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, TouchableOpacity,  SafeAreaView,
TouchableHighlight, Animated, Image, ScrollView, Modal, Alert, Pressable} from 'react-native';
import {useOrientation} from '../useOrientation';
import { orientationAngle } from 'react-native-orientation-angle'
import {styles} from './style';


const intervalList = [100, 500, 1000]

export const Configurations = () =>{

  const [interval, setInterval] = useState(0)
  const [result, setResult] = useState({ pitch: 0, roll: 0, yaw: 0 })

  useEffect(() => {
    orientationAngle.getUpdateInterval((value) => {
      setInterval(10)
    })
  }, [])

  const changeInterval = (value: number) => {
    orientationAngle.setUpdateInterval(value)
    setInterval(value)
  }

  const subscribe = () => {
    orientationAngle.subscribe(setResult)
  }

  const unsubscribe = () => {
    orientationAngle.unsubscribe()
  }


  const orientation = useOrientation();

  const renderValue = (label: string, value: string) => (
    <View style={styles.box}>
      <Text style={styles.titleText}>{label}:</Text>
      <Text style={styles.titleText}>{value}</Text>
    </View>
  )

  return (

    <View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={subscribe}>
              <Text style={styles.titleButton}>Subscribe</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={unsubscribe}>
              <Text style={styles.titleButton}>Unsubscribe</Text>
            </TouchableOpacity>
          </View>

        <Text style={styles.titleText}>Update Interval: {interval}ms</Text>
            {renderValue('pitch', result.pitch.toFixed(2))}
            {renderValue('roll', result.roll.toFixed(2))}
            {renderValue('yaw', result.yaw.toFixed(2))}

        <View style={styles.buttonWrapper}>
          {intervalList.map((value) => (
            <TouchableOpacity key={value} style={styles.button} onPress={() => changeInterval(value)}>
              <Text style={styles.titleText}>{value}ms</Text>
            </TouchableOpacity>
          ))}
        </View> 

    </View>
    
    
  )
}
export default Configurations;