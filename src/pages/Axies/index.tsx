import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, TouchableOpacity,  SafeAreaView,
  TouchableHighlight } from 'react-native'
import { orientationAngle } from 'react-native-orientation-angle'
import {styles} from './style';
import Arrow from '../../assets/left-arrow-svgrepo-com.svg';
import HeartTitle from '../../assets/heart-disease.svg';
const intervalList = [100, 500, 1000]

type AxiesScreenProps = {
  navigation: any;
  route: any;
}

//export const Axies = ({ navigation, route }: AxiesScreenProps) => 
export const Axies = ({ navigation, route }: AxiesScreenProps) =>{
  const [interval, setInterval] = useState(0)
  const [result, setResult] = useState({ pitch: 0, roll: 0, yaw: 0 })

  useEffect(() => {
    orientationAngle.getUpdateInterval((value) => {
      setInterval(value)
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

  const renderValue = (label: string, value: string) => (
    <View style={styles.box}>
      <Text style={styles.titleText}>{label}:</Text>
      <Text style={styles.titleText}>{value}</Text>
    </View>
  )

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
            <Text style={styles.title}>AXIES</Text>
            <HeartTitle style={styles.icon} fill={"#38B6FF"}></HeartTitle>
        </View>

        </View>

        <View style={styles.body}>
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

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={subscribe}>
            <Text style={styles.titleText}>Subscribe</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={unsubscribe}>
            <Text style={styles.titleText}>Unsubscribe</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
}
export default Axies;