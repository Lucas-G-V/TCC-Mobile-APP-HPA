import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, TouchableOpacity,  SafeAreaView,
  TouchableHighlight, Animated, Image} from 'react-native'
import { orientationAngle } from 'react-native-orientation-angle'
import {styles} from './style';
import Arrow from '../../assets/left-arrow-svgrepo-com.svg';
import HeartTitle from '../../assets/heart-disease.svg';
import AirplaneRoll from '../../assets/airplane.roll.svg';
import AirplanePitch from '../../assets/airplane.pitch.svg';

import Attitude2 from '../../assets/attitude2.svg';
import Svg from 'react-native-svg';
import CircleAngle from '../../assets/circleangle.svg';
import Line from '../../assets/line.svg';

import AirplaneYaw from '../../assets/airplane.yaw.svg';


const intervalList = [10]

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
            <HeartTitle style={[styles.icon,]} fill={"#38B6FF"}></HeartTitle>
        </View>

        </View>

        <View style={styles.body}>
        <Text style={styles.titleText}>Pitch:{result.pitch.toFixed(2)}  Roll:{result.roll.toFixed(2)}  Yaw:{result.yaw.toFixed(2)}</Text>
        <View>
          
        </View>
        <View style={styles.containerAirplane}>
           <CircleAngle style={[styles.circleangle, {transform: [{ rotate: '180deg'}]}]} fill={"#000"}>
           </CircleAngle>

           <Animated.View style={[styles.aaaa, {transform: [{ rotate: result.roll + 'deg'}]}]}>
            <View style={[styles.containerAirplane]}>
              <AirplaneRoll style={[styles.circleangle]} fill={"#38B6FF"}></AirplaneRoll>
              <Line style={[styles.roll, {transform: [{ rotate: '90deg'}]}]} fill={"#38B6FF"}></Line>
            </View>
             </Animated.View>
        </View>


        <View style={styles.containerAirplane}>
           <CircleAngle style={[styles.circleangle, {transform: [{ rotate: '180deg'}]}]} fill={"#000"}>
           </CircleAngle>

           <Animated.View style={[styles.aaaa, {transform: [{ rotate: result.pitch + 'deg'}]}]}>
            <View style={[styles.containerAirplane]}>
              <AirplanePitch style={[styles.circleangle]} fill={"#38B6FF"}></AirplanePitch>
              <Line style={[styles.roll, {transform: [{ rotate: '90deg'}]}]} fill={"#38B6FF"}></Line>
            </View>
             </Animated.View>
        </View>

        <View style={styles.containerAirplane}>
           <CircleAngle style={[styles.circleangle, {transform: [{ rotate: '180deg'}]}]} fill={"#000"}>
           </CircleAngle>

           <Animated.View style={[styles.aaaa, {transform: [{ rotate: result.pitch + 'deg'}]}]}>
            <View style={[styles.containerAirplane]}>
              <AirplaneRoll style={[styles.circleangle]} fill={"#38B6FF"}></AirplaneRoll>
              <Line style={[styles.roll, {transform: [{ rotate: '90deg'}]}]} fill={"#38B6FF"}></Line>
            </View>
             </Animated.View>
            
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