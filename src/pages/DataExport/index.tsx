import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView
} from 'react-native';

import { styles } from './style';
import Clock from '../../assets/clock-svgrepo-com.svg';
import Compass from '../../assets/compass-svgrepo-com.svg';
import Heart from '../../assets/pulse.svg';
import Activity from '../../assets/pulse-svgrepo-com.svg';
import HealthBookTopBar from '../../assets/HeathBookTopBar.png';

function DataExport() {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView style={styles.AndroidSafeArea} />
        <View style={styles.backgroundstatusbar}>
          <Image source={HealthBookTopBar} style={styles.image} />
        </View>
      </View>

      <View style={styles.body}>
          <Text style={styles.text}> Thallesmamamdor</Text>
      </View>
    </View>
  );
}

export { DataExport };