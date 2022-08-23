import { StyleSheet,Platform, StatusBar } from 'react-native';
import { theme } from '../../global/styles/theme';
export const options = {
  container: {
    backgroundColor: '#ffffff',
    padding: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#38B6FF',
    fontWeight: "bold",

    marginLeft: 7,
  },
};
export const styles = StyleSheet.create({
  baseText: {
    fontSize: 15,
    fontFamily: 'Cochin',
    color: 'black'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom:15,
  },
  rowView: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexDirection: 'row',
    color: 'black'
  },
  container: {
    backgroundColor:'#FFFFFF',
    flex: 1,
    flexDirection: 'column',
    width:'100%'
  },
  header:{
    marginBottom: -30,
  },
  body:{
    flex:0.99,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "space-around",
    width: '100%',
  },
  article:{
    flexDirection: 'column',
    alignItems: 'center',
    height: '30%',
  },
  section:{
    flexDirection: 'row',
    height:'20%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignContent:'center',
    width: '100%',
  },
  component:{
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
    
  },
  textview:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 85,
    width: '90%',
    borderRadius: 10
  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor:'#FFFFFF',
  },
  backgroundstatusbar:{
    height: 100,
    marginTop: -30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-evenly",
  },
  image: {
    width: '100%',
    height: 100, 
    backgroundColor:  theme.colors.primarycolor, 
    marginTop: -10
  },
  title:{
    textAlign: 'center',
    textDecorationColor: '#FFFFFF',
    height: 'auto',
    fontWeight: "bold", 
    color: '#38B6FF',
    fontSize: 30,
    marginLeft: 30
  },
  text: {
    textAlign: 'center',
    textDecorationColor: '#FFFFFF',
    height: 'auto',
    fontWeight: "bold", 
    color: '#000',
    fontSize: 30,
    marginLeft: 30
  },
  titleh2:{
    textAlign: 'center',
    textDecorationColor: '#FFFFFF',
    height: 'auto',
    fontWeight: "bold", 
    color: '#000',
    fontSize: 25,
    marginLeft: 10,
  },
  titleh1:{
    textAlign: 'center',
    textDecorationColor: '#FFFFFF',
    height: 'auto',
    fontWeight: "bold", 
    color: '#000',
    fontSize: 100,
  },
  ph1:{
    textAlign: 'center',
    textDecorationColor: '#FFFFFF',
    height: 'auto',
    fontWeight: '400', 
    color: '#000',
    fontSize: 50,
    marginTop:-30,
  },
  icon:{
    height: 60,
    width: 60,
    marginLeft: 20
  },
  gear:{
    height: 75,
    width: 75,
    marginLeft: 0
  },
  play:{
    flexDirection:'column',
    alignItems: 'center',
    height:'20%',
    alignContent: 'space-around',
  },
  arrow:{
    height: 40,
    width: 40,
  },
  bluetooth:{
    height: 38,
    width: 60,
    marginLeft: 0
  },
  StatusBar:{
    textAlign: 'center',
    textDecorationColor: '#FFFFFF',
    height: 'auto',
    fontWeight: "bold", 
    color: '#38B6FF',
    fontSize: 30,
    marginLeft: -50
  },
  maps:{
    height: 60,
    width: 60,
    marginLeft: 0
  },
  attitude:{
    height: 65,
    width: 65,
    marginLeft: 0
  },  
  footer:{
    flex:0.85,
    alignContent: 'flex-end',
    justifyContent:'flex-end',

    width: '100%',
    flexDirection: 'column',

  },
  save:{
    height: 40,
    width: 40,
    marginLeft: 0
  },
  button1: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }


  });