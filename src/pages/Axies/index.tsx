import React, { useState, useEffect, useContext } from 'react'
import {View, Text, TouchableOpacity,  SafeAreaView,
Animated} from 'react-native';
import {useOrientation} from '../useOrientation';
import { orientationAngle } from 'react-native-orientation-angle'
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './style';
import Arrow from '../../assets/left-arrow-svgrepo-com.svg';
import HeartTitle from '../../assets/heart-disease.svg';
import AirplaneRoll from '../../assets/airplane.roll.svg';
import CircleAngle from '../../assets/circleangle.svg';
import Circle2 from '../../assets/circulo.2.svg';
import HeadingMechanics from '../../assets/heading_mechanics.svg'; 
import HeadingYaw from '../../assets/heading_yaw.svg'; 
import HorizonBall from '../../assets/horizon_ball.svg'; 
import HorizonCircle from '../../assets/horizon_circle.svg'; 
import HorizonMechanics from '../../assets/horizon_mechanics.svg'; 
import Circle from '../../assets/circle.svg'; 
import Rectangle2 from '../../assets/rectangle2.svg';
import SensorDataContext from '../../Contexts/SensorDataContext';


type AxiesScreenProps = {
  navigation: any;
  route: any;
  dataAxies: any;
}


export const Axies = ({ navigation, route, dataAxies }: AxiesScreenProps) =>{
 
  const [sensorData, setSensorData]=useContext(SensorDataContext);

  var [AxiesOrigin,SetAxiesOrigin]=useState({pitch: 0, roll: 0, yaw: 0 });
  let STORAGE_KEY = '@configAxies';
  var test= {pitch: 0, roll: 0, yaw: 0 };
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('Porfavor DEUS, estou com sono')
      
      if (value !== null) {
       test=(JSON.parse(value))
       SetAxiesOrigin({pitch: test.pitch, roll: test.roll, yaw: test.yaw})
       console.log(AxiesOrigin.pitch)

      }
    } catch (e) {
    }
  };
  

  useState(() => {
    readData();
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
              <Text style={styles.titleHandler}>NAVEGAÇÃO</Text>
              <HeartTitle style={[styles.icon]} fill={"#38B6FF"}></HeartTitle>
          </View>
        </View>

              
        <View style={orientation === 'PORTRAIT' ? styles.body :styles.bodyland}>

          <View style={styles.containerRoll}>

            <Animated.View style={orientation === 'PORTRAIT' ? {position: "relative", transform: [{ rotate: (sensorData.axies.roll-AxiesOrigin.roll) + 'deg'}]} :{position: "relative", transform: [{ rotate: (sensorData.axies.pitch-AxiesOrigin.pitch) + 'deg'}]}}>
              <View style={[styles.containerimage]}>              
              <Circle2 style={[styles.roll, {transform: [{ rotate: '90deg'}]}]} fill={"#38B6FF"}></Circle2>
              <AirplaneRoll style={[styles.airplaneroll]} fill={"#38B6FF"}></AirplaneRoll>
              </View>
              </Animated.View>
              <Text style={styles.titleValue}>{orientation === 'PORTRAIT' ? (sensorData.axies.roll-AxiesOrigin.roll).toFixed(1)+'°' :(sensorData.axies.pitch-AxiesOrigin.pitch).toFixed(1)+'°'}</Text>
            <CircleAngle style={[styles.circleangle, {transform: [{ rotate: '180deg'}]}]} fill={"#000"}>
            </CircleAngle>
          </View>


          <View style={styles.containerPitch}>
            <Circle style={[styles.roll ]} fill={"#38B6FF"}>
            </Circle>
            <Text style={styles.titleValue}>{orientation === 'PORTRAIT' ? (sensorData.axies.pitch-AxiesOrigin.pitch).toFixed(1)+'°' :(sensorData.axies.roll-AxiesOrigin.roll).toFixed(1)+'°'}</Text>              
            <View style={[styles.logoCircle]}>

            
            <Animated.View style={orientation === 'PORTRAIT' ? {position: "relative", translateY: ((sensorData.axies.pitch-AxiesOrigin.pitch)*2.78)} :{position: "relative", translateY: ((AxiesOrigin.roll-sensorData.axies.roll)*2.78)}}>
              <View style={[styles.containerimage]}>
              <Rectangle2 style={[styles.roll, {transform: [{ rotate: '-90deg'}]}]} fill={"#80471C"}></Rectangle2>
              <HorizonBall style={[styles.airplaneroll]} ></HorizonBall>
              </View>
              </Animated.View>
              </View>
              <HorizonMechanics style={[styles.airplaneroll]} > 
              </HorizonMechanics>
              <HorizonCircle style={[styles.airplaneroll]} ></HorizonCircle>
          </View>

          <View style={styles.containerYaw}>
          


            <Animated.View style={[styles.anim, {transform: [{ rotate: (sensorData.axies.yaw) + 'deg'}]}]}>
              <View style={[styles.containerimage]}>
                <HeadingYaw style={[styles.circleangle]} fill={"#38B6FF"}> 
                </HeadingYaw>
                
              </View>
              </Animated.View>
              <HeadingMechanics style={[styles.airplaneroll]} fill={"#000"}></HeadingMechanics>

          </View>
      </View>          

    </View>
  )
}
export default Axies;