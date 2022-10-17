import React,{ useContext, useEffect, useState }  from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import {styles} from './style'
import Arrow from '../../assets/left-arrow-svgrepo-com.svg';
import HeartTitle from '../../assets/heart-disease.svg';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine, VictoryTheme } from 'victory-native';
import SensorDataContext from '../../Contexts/SensorDataContext';


type FileScreenProps = {
  navigation: any;
  route: any;
}
 
interface chartInterface {
  x:number;
  y:number;
}

const File = ({ navigation, route }: FileScreenProps) => {
  
  const [sensorData, setSensorData]=useContext(SensorDataContext);
  const [batimento, setBatimento] = useState<chartInterface[]>([])
  const [glicose, setGlicose] = useState<chartInterface[]>([])
  const [potencia, setPotencia] = useState<chartInterface[]>([])
  

  let timer
  const [count, setCount] = useState(0)
  const updateCount = () => {
    timer = !timer && setInterval(() => {
    setCount(prevCount => prevCount + 0.7)
  }, 700)
  }
  useEffect(() => {
    updateCount()
    return () => clearInterval(timer)
  }, [])


useEffect(() => {
  if (sensorData.batimentoCardiaco != 0){
    setBatimento([...batimento, {x:count, y:sensorData.batimentoCardiaco}])
  if (batimento.length>20){
    setBatimento((data) => data.filter((_, index) => index >(data.length-26)));
  }
  }
  if (sensorData.glicose != 0){
    setGlicose([...glicose, {x:count, y:sensorData.glicose}])
    if (glicose.length>20){
      setGlicose((data) => data.filter((_, index) => index >(data.length-26)));
    }
  }
  
    setPotencia([...potencia, {x:count, y:sensorData.potencia}])
  //setGlicose([...glicose, {x:count, y:35}])

},[count])




  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView style={styles.AndroidSafeArea} />
        <View style={styles.backgroundstatusbar}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Home', {
          }); }}>
            <Arrow style={styles.arrow} fill={"#38B6FF"}></Arrow>
          </TouchableOpacity>
          <Text style={styles.title}>SAÚDE</Text>
          <HeartTitle style={styles.icon} fill={"#38B6FF"}></HeartTitle>
        </View>
      </View>
    <View style={styles.chart}>

    <VictoryChart maxDomain={{ y:150}}  minDomain={{ y:32}}scale={{ x: "linear", y: "linear" }}    theme={VictoryTheme.material} width={450}>
      <VictoryLabel x={25} y={30} text={"BPM"} />
      <VictoryLabel x={390} y={30} text={"mg/dL"} />



      <VictoryAxis scale="time" standalone={false}/>

      <VictoryAxis dependentAxis
          domain={[ 0, 150 ]}
          orientation="left"
          standalone={false}
       />
       <VictoryLine 
          domain={{  y: [ 0, 180 ]}}
          interpolation="natural"
          style={{ data: { stroke: "#c43a31" },}}
          data={batimento}/>  


        <VictoryAxis dependentAxis
          domain={[ 0, 500 ]}
          orientation="right"
          standalone={false}
        />

        <VictoryLine 
          domain={{  y: [ 0, 500 ]}}
          interpolation="natural"
          style={{ data: { stroke: "#38B6FF" },}}
          data={glicose}/>  
        </VictoryChart>

    <VictoryChart maxDomain={{ y:650}}  minDomain={{ y:0}}scale={{ x: "linear", y: "linear" }}   theme={VictoryTheme.material} width={450}>
      <VictoryLabel x={25} y={30} text={"W"} />
        <VictoryLine 
          domain={{  y: [ 0, 650 ]}}
          interpolation="natural"
          style={{ data: { stroke: "#000" },}}
          data={potencia}/>  
    </VictoryChart>
  
    </View>

  </View>

  )
}
export default File;
