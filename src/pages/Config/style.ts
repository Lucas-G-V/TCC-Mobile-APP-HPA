import { StyleSheet } from 'react-native'
export const styles =StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
    },
    box: {
      flexDirection: 'row',
      marginBottom: 6,
      justifyContent: 'space-evenly',
    },
    renderText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
      
      
    },
    titleText:{
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      marginBottom:15,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 200,
      height:40,
      borderWidth: 1,
      borderRadius: 50,
      borderColor: '#000',
      },
  })