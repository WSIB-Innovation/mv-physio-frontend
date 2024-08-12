import { useContext } from 'react';
import { CamContext } from '../context/camContext';

export const useCamContext = () => {
    const context = useContext(CamContext);

    if (!context) {
        throw new Error("useCamContext must be used within a CamProvider");
    }

    return context;
}