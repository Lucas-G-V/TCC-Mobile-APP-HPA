import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, TouchableOpacity,  SafeAreaView,
TouchableHighlight, Animated, Image, ScrollView, Modal, Alert, Pressable} from 'react-native';
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

interface IMyProps {
  isVisible: boolean,
}
const [modalVisibleconfig, setModalVisibleconfig] = useState(false);

export const Configurations:React.FC<IMyProps> = (props: IMyProps) =>{
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



  return (
    <Modal
    animationType="slide"
        transparent={true}
        visible={props.isVisible && !modalVisibleconfig} 
        onRequestClose={() => {
          setModalVisibleconfig(!modalVisibleconfig);
        }}>
    <View style={styles.container}>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={subscribe}>
              <Text style={styles.titleButton}>Subscribe</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={unsubscribe}>
              <Text style={styles.titleButton}>Unsubscribe</Text>
            </TouchableOpacity>
          </View>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisibleconfig(!modalVisibleconfig)}
            >
              <Text>Hide Modal</Text>
            </Pressable>
          

    </View>
  </Modal>
  )
}
export default {Configurations, modalVisibleconfig};