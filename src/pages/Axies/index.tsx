import React, { useState, useEffect } from 'react'
import {View, Text, TouchableOpacity,  SafeAreaView,
Animated} from 'react-native';
import {useOrientation} from '../useOrientation';
import { orientationAngle } from 'react-native-orientation-angle'
import {styles} from './style';
import Arrow from '../../assets/left-arrow-svgrepo-com.svg';
import HeartTitle from '../../assets/heart-disease.svg';
import AirplaneRoll from '../../assets/airplane.roll.svg';
import AirplanePitch from '../../assets/airplane.pitch.svg';
import AirplaneYaw from '../../assets/airplane.yaw.svg';

import CircleAngle from '../../assets/circleangle.svg';
import Line from '../../assets/line.svg';

import AsyncStorage from '@react-native-community/async-storage';



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
  

  
  var [AxiesOrigin,SetAxiesOrigin]=useState({pitch: 0, roll: 0, yaw: 0 });
  let STORAGE_KEY = '@configAxies';
  var test= {pitch: 0, roll: 0, yaw: 0 };
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('Porfavor DEUS estou com sono')
      
      if (value !== null) {
       test=(JSON.parse(value))
       SetAxiesOrigin({pitch: test.pitch, roll: test.roll, yaw: test.yaw})
       console.log(AxiesOrigin.pitch)

      }
    } catch (e) {
      
    }
  };
  

  useState(() => {
    orientationAngle.unsubscribe()
    orientationAngle.subscribe(setResult)
    readData()
    
  })
  

  const orientation = useOrientation();

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
              <Text style={styles.titleHandler}>AXIES</Text>
              <HeartTitle style={[styles.icon]} fill={"#38B6FF"}></HeartTitle>
          </View>
        </View>


        <View style={orientation === 'PORTRAIT' ? styles.body :styles.bodyland}>

          <View style={styles.containerRoll}>
            <CircleAngle style={[styles.circleangle, {transform: [{ rotate: '180deg'}]}]} fill={"#000"}>
            </CircleAngle>
            <Text style={styles.titleValue}>{(result.roll-AxiesOrigin.roll).toFixed(1)+'°'}</Text>
            <Animated.View style={[styles.anim, {transform: [{ rotate: (result.roll-AxiesOrigin.roll) + 'deg'}]}]}>
              <View style={[styles.containerimage]}>              
              <Line style={[styles.roll, {transform: [{ rotate: '90deg'}]}]} fill={"#38B6FF"}></Line>
              <AirplaneRoll style={[styles.airplaneroll]} fill={"#38B6FF"}></AirplaneRoll>
              </View>
              </Animated.View>
          </View>


          <View style={styles.containerPitch}>
            <CircleAngle style={[styles.circleangle, {transform: [{ rotate: '180deg'}]}]} fill={"#000"}>
            </CircleAngle>
            <Text style={styles.titleValue}>{(result.pitch-AxiesOrigin.pitch).toFixed(1)+'°'}</Text>
            <Animated.View style={[styles.anim, {transform: [{ rotate: (result.pitch-AxiesOrigin.pitch) + 'deg'}]}]}>
              <View style={[styles.containerimage]}>
              <Line style={[styles.roll, {transform: [{ rotate: '90deg'}]}]} fill={"#38B6FF"}></Line>
              <AirplanePitch style={[styles.airplaneroll]} fill={"#38B6FF"}></AirplanePitch>

              </View>
              </Animated.View>
          </View>

          <View style={styles.containerYaw}>
            <CircleAngle style={[styles.circleangle, {transform: [{ rotate: '180deg'}]}]} fill={"#000"}>
            </CircleAngle>
            <Text style={styles.titleValue}>{result.yaw.toFixed(1)+'°'}</Text>
            <Animated.View style={[styles.anim, {transform: [{ rotate: (90-result.yaw) + 'deg'}]}]}>
              <View style={[styles.containerimage]}>
                <Line style={[styles.roll, {transform: [{ rotate: '90deg'}]}]} fill={"#38B6FF"}></Line>
                <AirplaneYaw style={[styles.airplaneroll]} fill={"#000"}></AirplaneYaw>
                
              </View>
              </Animated.View>
              
          </View>
      </View>          

    </View>
  )
}
export default Axies;