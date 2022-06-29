import { StyleSheet,Platform, StatusBar } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor:'#FFFFFF',
    flex: 1,
    flexDirection: 'column',
    width:'100%'
  },
  header:{
    marginBottom: 30,
  },
  body:{
    height: '40%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
    
  },
  button: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 85,
    width: '90%',
    backgroundColor: theme.colors.primarycolor,
    borderRadius: 10

  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#38B6FF'   
  },
  backgroundstatusbar:{
    height: 100,
    marginTop: -10,
    backgroundColor: '#38B6FF'

  },
  image: {
    width: '100%',
    height: 100, 
    backgroundColor:  theme.colors.primarycolor, 
    marginTop: -10
  },
  text: {
    textAlign: 'center',
    textDecorationColor: '#FFFFFF',
    height: 'auto',
    fontWeight: "bold", 
    color: '#ffffff',
    fontSize: 30,
    marginLeft: 30


  },
  icon:{
    height: 60,
    width: 60,
    marginLeft: 20


  },

  touchable: {
    width:'100%',
  }

  });