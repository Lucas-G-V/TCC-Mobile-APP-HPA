import React,{createContext, Dispatch, SetStateAction, useState} from 'react';

interface BatimentoContextDATA {
    batimentoCardiaco: number;

}
const BatimentoContext = createContext({});
export const BatimentoContextProvider: React.FC = ({children}) =>{
    const [batimentoCardiaco, setBatimentoCardiaco]=useState(0);
    return <BatimentoContext.Provider value={[batimentoCardiaco,setBatimentoCardiaco]}>
        {children}
    </BatimentoContext.Provider>;
};
export default BatimentoContext;