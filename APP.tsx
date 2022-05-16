import React from 'react';
import {View, Text} from 'react-native';

import firebase from 'firebase/app';
import Rotas from './src/pages/Navigation';

const firebaseConfig = {
    apiKey: "AIzaSyB0rigbRiy6w1xpK5Zit9lSG8iCIw1XKGQ",
    authDomain: "healthbook-e52bb.firebaseapp.com",
    databaseURL: "https://healthbook-e52bb-default-rtdb.firebaseio.com/",
    projectId: "healthbook-e52bb",
    storageBucket: "healthbook-e52bb.appspot.com",
    messagingSenderId: "1026924664485",
    appId: "1:1026924664485:web:b474b5b920a223e8e99f4c",
    measurementId: "G-FPQDZCL73W"
  };

  firebase.initializeApp(firebaseConfig);

  export default function App() {
    return (
      <Rotas />
    )
  }
  
 
 