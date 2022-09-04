import React,{createContext, Dispatch, SetStateAction, useState} from 'react';

interface BatimentoContextDATA {
    batimentoCardiaco: number;
    velocidade: number;

}
const BatimentoContext = createContext({});
export const BatimentoContextProvider: React.FC = ({children}) =>{;
    const [sensorData,setSensorData]=useState({
        timestamp:0,
        batimentoCardiaco:0,
        potencia:0,
        velocidade:0,
        glicose:0,
        position:0,
        axies:{pitch: 0, roll: 0, yaw: 0 },
    });

    return <BatimentoContext.Provider value={[sensorData,setSensorData]}>
        {children}
    </BatimentoContext.Provider>;
};
export default BatimentoContext;

//;[];[glicose,setGlicose];[axies,setAxies];[position,setPosition];[timestamp,setTimestamp]}