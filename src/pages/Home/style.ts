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
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor:'#FFFFFF',
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
  backgroundstatusbar:{
    height: 100,
    marginTop: -30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-evenly",
  },
  header:{
    marginBottom: -30,
  },
  container: {
    backgroundColor:'#FFFFFF',
    flex: 1,
    flexDirection: 'column',
    width:'100%'
  },
  body:{
    flex:0.99,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "space-around",
    width: '100%',
  },
  articletitle:{
    flex:1.1,
    flexDirection: 'column',
    alignItems: 'center',

  },
  articletitleLand:{
    flex:0.7,
    flexDirection: 'column',
    alignItems: 'center',

  },
  section:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignContent:'center',
    width: '100%',
    
  },
  sectionLand:{
    flex:0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignContent:'center',
    width: '100%',

  },  
  sectionfooterIconLand:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignContent:'center',
    width: '100%',
    marginLeft:'-15%'
    
  },

  sectionFooterLand:{
    flex:0.4,
    flexDirection: 'row-reverse',
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
    flex:1,

  },
  footer:{
    flex:1,
    alignContent: 'flex-end',
    justifyContent:'flex-end',
    flexDirection: 'column',

  },
  footerLand:{    
    flexDirection: 'row',
    alignContent: 'flex-end',
    justifyContent:'flex-end',

  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginLeft:"8%",
    marginTop: "60%",
  },  
  centeredViewLand: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginLeft:"26%",
    marginTop: "6%",
  },
  modalView: {
    flex:0.35,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    flexDirection: "column",
    justifyContent: 'space-between',
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
  },
  textview:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
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
    marginTop:-15,
  },
  titleh1Land:{
    textAlign: 'center',
    textDecorationColor: '#FFFFFF',
    height: 'auto',
    fontWeight: "bold", 
    color: '#000',
    fontSize: 90,
  },
  ph1Land:{
    textAlign: 'center',
    textDecorationColor: '#FFFFFF',
    height: 'auto',
    fontWeight: '400', 
    color: '#000',
    fontSize: 40,
    marginTop:-15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 85,
    width: '90%',
    borderRadius: 10
  },
  icon:{
    height: 60,
    width: 60,
    marginLeft: 20
  },
  gear:{
    height: 68,
    width: 68,
    marginLeft: 0
  },
  bluetooth:{
    height: 38,
    width: 60,
    marginLeft: 0
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
  save:{
    height: 40,
    width: 40,
    marginLeft: 0
  },
  none:{
  flex:0.99

  }
  });