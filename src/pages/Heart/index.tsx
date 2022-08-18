import React,{ useEffect, useState }  from 'react';
import {
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableHighlight
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './style'
import Arrow from '../../assets/left-arrow-svgrepo-com.svg';
import HeartTitle from '../../assets/heart-disease.svg';
import { LineChart } from 'react-native-chart-kit';


type FileScreenProps = {
  navigation: any;
  route: any;
}

const File = ({ navigation, route }: FileScreenProps) => {
  
  const [input, setInput] = useState('');
 
  let STORAGE_KEY = '@Heart';
  var [TesteValue,SetTesteValue]=useState("");
  var [Teste,SetTeste]=useState([""])
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      TesteValue=value;
      Teste=TesteValue?.split(", ");
      Teste.pop();

  
      if (value !== null) {
        setInput(value);
      }
    } catch (e) {
      
    }
  };
  var [TesteLabel,SetTesteLabel]=useState([""])
  var [TesteNumber,SetTesteNumber]=useState([0])


  const transformdata = async () =>{
    
    
    
    if(TesteValue !=null){
      for(let i=0; i< Teste.length;i++){
        TesteNumber[i]=Number(Teste[i])
      }
    }

  }
  const dataAsync = async () => {
    await readData();
    await transformdata();
  }
  dataAsync();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  console.log(TesteLabel);
  console.log(TesteNumber);
  let [dataTeste,setDataTeste]=useState({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  })
  

  const Atualiza = async () => {
    setDataTeste({
      labels: TesteLabel,
      datasets: [
        {
          
          data: TesteNumber,
          color: (opacity = 1) => `#38B6FF`, // optional
          strokeWidth: 2 // optional
        }
      ],
      legend: ["Frequência Cardíaca"] // optional
    });
  }
  

 
 
 useEffect(()=> 
 {
  setDataTeste({
    labels: TesteLabel,
    datasets: [
      {
        
        data: TesteNumber,
        color: (opacity = 1) => `#38B6FF`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Frequência Cardíaca"] // optional
  });
  console.log(dataTeste);
  },[TesteLabel]);

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
      <View style={styles.body}>
        <View style={styles.chart}>
        <LineChart

            data={dataTeste}
            width={430}
            height={340}
            chartConfig={styles.chartConfig}
            yAxisSuffix={' bpm'}
            />
        </View>
        
        <TouchableOpacity onPress={Atualiza}>
          <Text style={styles.titleText}>Exportar</Text>
        </TouchableOpacity>
      
      </View>

    </View>
  )
}

export default File;