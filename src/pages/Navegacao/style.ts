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
    fontSize: 15,
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
    marginBottom: -20,
  },
  body:{
    height: '80%',
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
    alignItems: 'center'
    
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
    backgroundColor: theme.colors.primarycolor,
    borderRadius: 10
  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#ffffff'   
  },
  backgroundstatusbar:{
    height: 100,
    marginTop: -30,
    backgroundColor: '#ffffff',
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
    fontSize: 20,
    marginLeft: 0
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
  play:{
    flexDirection:'column',
    alignItems: 'center',
    height:'40%',
    alignContent: 'space-around',
  },
  arrow:{
    height: 40,
    width: 40,
  },
  mapContainer: {
    flex: 2.4,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flex: 0.5,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  result: {
    borderWidth: 1,
    borderColor: '#38B6FF',
    width: '100%',
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
  },
  });
