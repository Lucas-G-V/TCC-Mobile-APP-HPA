import { StyleSheet } from 'react-native'
export const styles =StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    marginBottom: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'

    },
    box: {

      flexDirection: 'row',
      marginBottom: 6,
      justifyContent: 'space-evenly',
      alignItems: 'center',

    },
    renderText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
    },
    titleText:{
      fontSize: 19,
      fontWeight: 'bold',
      color: 'black',
      marginBottom:15,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 200,
      height:40,

      borderRadius: 50,
      backgroundColor: '#38B6FF'
      },
      buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    }
  })