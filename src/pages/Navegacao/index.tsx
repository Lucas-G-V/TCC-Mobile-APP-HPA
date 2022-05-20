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
import Arrow from '../../assets/left-arrow-svgrepo-com.svg';
import HeartTitle from '../../assets/heart-disease.svg';


type NavegacaoScreenProps = {
  navigation: any;
  route: any;
}

const Navegacao = ({ navigation, route }: NavegacaoScreenProps) => {

  return(
<View style={styles.container}>
    <View style={styles.header}>
    <SafeAreaView style={styles.AndroidSafeArea} />
    <View style={styles.backgroundstatusbar}>
    <TouchableHighlight onPress={() => {
        navigation.navigate('Home', {
        }); }}>
        <Arrow style={styles.arrow} fill={"#38B6FF"}></Arrow>
        </TouchableHighlight>
        <Text style={styles.title}>NAVEGAÇÃO</Text>
        <HeartTitle style={styles.icon} fill={"#38B6FF"}></HeartTitle>
    </View>
    </View>
    </View>
  )
}

export default Navegacao;