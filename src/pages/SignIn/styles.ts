import { StyleSheet,Platform, StatusBar } from 'react-native';


import { theme } from '../../global/styles/theme';


export const styles = StyleSheet.create({
  container: {
    backgroundColor:'#FFFFFF',
    flex: 1,
    flexDirection: 'column',
    width:'100%',
    
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
  statusbar: {
    marginTop:30,
  },
  body: {
    height: 400,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
    flexDirection: 'column',

  },
  input: {
    backgroundColor: '#F1F5F4',
    width: '90%',
    height: 45,
    borderRadius: 31,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    margin: 5
  

  },
  
  image: {
    width: '100%',
    height: 100, 
    backgroundColor:  theme.colors.primarycolor, 
    marginTop: -10
  },
  acessar: {
    marginTop: -10,
    paddingHorizontal: 50
    },
  content: {    
    marginTop: -40,    
    paddingHorizontal: 50
  },
  text:{
    color: theme.colors.heading,
    textAlign: 'center',
    fontSize: 40,
    marginBottom: 16,

  },
  title: {
    color: theme.colors.heading,
    textAlign: 'center',
    fontSize: 40,
    marginBottom: 16,    
  },
  subtitle: {
    color: theme.colors.heading,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 64
  }
});