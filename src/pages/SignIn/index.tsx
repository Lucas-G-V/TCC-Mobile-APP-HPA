import React from 'react';
import { 
  View, 
  Text, 
  Image,  
  StatusBar,
  TextInput,
  StyleSheet,
  Platform,
  SafeAreaView
  
} from 'react-native';

//import IllustrationImg from '../../assets/';
import HealthBookTopBar from '../../assets/HeathBookTopBar.png'
import { styles } from './styles';

import { ButtonIcon } from '../../components/ButtonIcon';

type SigninScreenProps = {
  navigation: any;
  route: any;
}

const SignIn = ({ navigation, route }: SigninScreenProps) => {
  
  return(
    <View style={styles.container}>

      <SafeAreaView style={styles.AndroidSafeArea}>
    </SafeAreaView>
          <View style = {styles.backgroundstatusbar}>
            <Image source={HealthBookTopBar} style={styles.image} ></Image>
          </View>
          <View style = {styles.body}>
              <TextInput style = {styles.input}>E-mail</TextInput>
              <TextInput style = {styles.input}> Senha</TextInput>
              
              
              <ButtonIcon title='Acessar' onPress={() => {
          navigation.navigate('Home', {
          }); }}>
                </ButtonIcon>
          </View>
      </View>
    
  );
}

export default SignIn;