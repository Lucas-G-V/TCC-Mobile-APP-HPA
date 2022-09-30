import React,{createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import { MqttPubClient } from '../../services/Mqtt/Publish';

const SensorDataContext = createContext({});
export const SensorDataContextProvider: React.FC = ({children}) =>{;
    const [sensorData,setSensorData]=useState({
        timestamp:0,
        batimentoCardiaco:0,
        potencia:0,
        velocidade:0,
        glicose:0,
        position:0,
        axies:{pitch: 0, roll: 0, yaw: 0 },
    });

    return <SensorDataContext.Provider value={[sensorData,setSensorData]}>
        {children}
    </SensorDataContext.Provider>;
};
export default SensorDataContext;

