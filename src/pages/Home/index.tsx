import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Button,
  TouchableHighlight
} from 'react-native';

import { styles } from './style';
import Clock from '../../assets/clock-svgrepo-com.svg';
import Compass from '../../assets/compass-svgrepo-com.svg';
import Heart from '../../assets/pulse.svg';
import Activity from '../../assets/pulse-svgrepo-com.svg';
import HealthBookTopBar from '../../assets/HeathBookTopBar.png';


type HomeScreenProps = {
  navigation: any;
  route: any;
}

const Home = ({ navigation, route }: HomeScreenProps) => {

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView style={styles.AndroidSafeArea} />
        <View style = {styles.backgroundstatusbar}>
          <Image source={HealthBookTopBar} style={styles.image} />
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.button}>
            <Compass  style ={styles.icon} fill={"#000000"} /> 
            <Text style={styles.text}> Navegacao</Text>
        </View>

        <View style={styles.button}>
          <Activity  style ={styles.icon} fill={"#00FFE2"} />
          <Text style={styles.text}> Telemetria</Text>
        </View>

       
        <TouchableHighlight style={styles.button} onPress={() => {
          navigation.navigate('Details', {
          }); }}>
          <View style={styles.button}>
            <Heart  style ={styles.icon} fill={"#ff0000"} />
            <Text style={styles.text}> Saúde</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button} onPress={() => {
          navigation.navigate('DataExport', {
          }); }}>
        <View style={styles.button}>
          <Clock style ={styles.icon} fill={"#ffffff"} />
          <Text style={styles.text}> Tempo Real</Text>
        </View>
        </TouchableHighlight>

      </View>
    </View>
  )
}

export default Home;