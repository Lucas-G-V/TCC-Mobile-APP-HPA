import { StyleSheet, View, Text, TouchableOpacity,Platform, StatusBar } from 'react-native'
export const styles =StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 5,
    alignItems: 'center',
    flexDirection: 'column',
    flex:1
  },
    box: {
      width: 100,
      flexDirection: 'row',
      marginBottom: 6,
    },
    buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    button: {
    paddingVertical: 4,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000',
    },
    buttonText: {
      fontSize: 18,
    },
    header:{
      marginBottom: 0,
      paddingHorizontal: 0,
      width: '100%',
    },
    AndroidSafeArea: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: '#ffffff'   
    },
    backgroundstatusbar:{
      height: 100,
      marginTop: -40,
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    arrow:{
      height: 40,
      width: 40,
    },
    titleHandler:{
      textAlign: 'center',
      textDecorationColor: '#000',
      height: 'auto',
      fontWeight: "bold", 
      color: '#38B6FF',
      fontSize: 30,
      marginLeft: 30
    },
    titleValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      position: 'absolute',
      paddingBottom: 150,
    },
    icon:{
      height: 60,
      width: 60,
      marginLeft: 20
    },
    titleButton: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
    },
    body:{
      flexDirection: 'column',
      width: '100%',

      flex:1
    },
    bodyland:{
      height: '60.5%',
      flexDirection: 'row',
      alignItems: 'center',

    },
    roll:{
      height: 220,
      width: 220,
      position:'absolute',
      
      
    },
    containerRoll:{
      alignItems: 'center',
      flex:1,
      justifyContent: 'center',

    },
    containerPitch:{
      
      alignItems: 'center',
      flex:1,
      justifyContent: 'center',

    },
    containerYaw:{
      alignItems: 'center',
      flex:1,
      justifyContent: 'center',

    },
    circleangle:{
      position: 'absolute',
      height: 220,
      width: 220,
    },
    anim:{
      position:'relative'
    },
    containerimage:{
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    airplaneroll:{
      position: 'absolute',
      height: 200,
      width: 210,
    },
    logoCircle: {
      backgroundColor: 'none',
      height: 220,
      width: 220,
      borderRadius: 220,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth:5,
      overflow: 'hidden',}
  })