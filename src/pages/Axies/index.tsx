import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, TouchableOpacity,  SafeAreaView,
TouchableHighlight, Animated, Image} from 'react-native';
import {useOrientation} from '../useOrientation';
import { orientationAngle } from 'react-native-orientation-angle'
import {styles} from './style';
import Arrow from '../../assets/left-arrow-svgrepo-com.svg';
import HeartTitle from '../../assets/heart-disease.svg';
import AirplaneRoll from '../../assets/airplane.roll.svg';
import AirplanePitch from '../../assets/airplane.pitch.svg';
import AirplaneYaw from '../../assets/airplane.yaw.svg';
import Attitude2 from '../../assets/attitude2.svg';
import Svg from 'react-native-svg';
import CircleAngle from '../../assets/circleangle.svg';
import Line from '../../assets/line.svg';



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

  const orientation = useOrientation();

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
            <HeartTitle style={[styles.icon]} fill={"#38B6FF"}></HeartTitle>
        </View>

        </View>
        <View style={orientation === 'PORTRAIT' ? styles.body :styles.bodyland}>
        <Text style={styles.titleText}>Pitch:{result.pitch.toFixed(2)+'°'}  Roll:{result.roll.toFixed(2)+ '°'}  Yaw:{(90-result.yaw).toFixed(2)+ '°'}</Text>
        <View>
          
        </View>
        <View style={styles.containerAirplane}>
           <CircleAngle style={[styles.circleangle, {transform: [{ rotate: '180deg'}]}]} fill={"#000"}>
           </CircleAngle>

           <Animated.View style={[styles.anim, {transform: [{ rotate: result.roll + 'deg'}]}]}>
            <View style={[styles.containerimage]}>              
            <Line style={[styles.roll, {transform: [{ rotate: '90deg'}]}]} fill={"#38B6FF"}></Line>
              <AirplaneRoll style={[styles.airplaneroll]} fill={"#38B6FF"}></AirplaneRoll>

            </View>
             </Animated.View>
        </View>


        <View style={styles.containerAirplane}>
           <CircleAngle style={[styles.circleangle, {transform: [{ rotate: '180deg'}]}]} fill={"#000"}>
           </CircleAngle>

           <Animated.View style={[styles.anim, {transform: [{ rotate: result.pitch + 'deg'}]}]}>
            <View style={[styles.containerimage]}>
            <Line style={[styles.roll, {transform: [{ rotate: '90deg'}]}]} fill={"#38B6FF"}></Line>
            <AirplanePitch style={[styles.airplaneroll]} fill={"#38B6FF"}></AirplanePitch>

            </View>
             </Animated.View>
        </View>

        <View style={styles.containerAirplane}>
           <CircleAngle style={[styles.circleangle, {transform: [{ rotate: '180deg'}]}]} fill={"#000"}>
           </CircleAngle>

           <Animated.View style={[styles.anim, {transform: [{ rotate: (90-result.yaw) + 'deg'}]}]}>
            <View style={[styles.containerimage]}>
              <Line style={[styles.roll, {transform: [{ rotate: '90deg'}]}]} fill={"#38B6FF"}></Line>
              <AirplaneYaw style={[styles.airplaneroll]} fill={"#000"}></AirplaneYaw>
              
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