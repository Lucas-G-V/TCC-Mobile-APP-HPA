import { StyleSheet, View, Text, TouchableOpacity,Platform, StatusBar } from 'react-native'
export const styles =StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 5,
    alignItems: 'center',
  },
    box: {
      width: 100,
      flexDirection: 'row',
      marginBottom: 6,
    },
    buttonWrapper: {
      width: '90%',
      marginTop: 100,
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
    paddingVertical: 8,
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
      paddingHorizontal: 25,

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
      justifyContent: "space-evenly",
    },
    arrow:{
      height: 40,
      width: 40,
    },
    title:{
      textAlign: 'center',
      textDecorationColor: '#000',
      height: 'auto',
      fontWeight: "bold", 
      color: '#38B6FF',
      fontSize: 30,
      marginLeft: 30
    },
    icon:{
      height: 60,
      width: 60,
      marginLeft: 20
    },
    titleText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
      marginBottom:15,
    },
    body:{
      height: '88%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: "space-around",
      width: '100%',
    },
    test:{
      justifyContent: 'space-between',
    },
    roll:{
      height: 200,
      width: 200,
      position:'relative',
      
    },
    containerAirplane:{

      padding: 5,
      alignItems: 'center',
      flex:1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    circleangle:{
      position: 'absolute',
      height: 220,
      width: 220,
    },
    aaaa:{

      position:'relative'
    },
    qqqt:{
    marginBottom: 80,
    marginTop: 10,
    flex:1,

    flexDirection:'column',
    }

  })