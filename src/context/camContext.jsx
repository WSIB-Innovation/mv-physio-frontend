import React, { createContext, useState } from 'react';

// Create the context
export const CamContext = createContext();

// Create the provider component
export const CamProvider = ({ children }) => {
    // Define the state variable and its setter function
    const [cameraOn, setCameraOn] = useState(false);
    // captureType = off, live, video
    const [captureType, setCaptureType] = useState('off');

    return (
        <CamContext.Provider value={{ cameraOn, setCameraOn, captureType, setCaptureType }}>
            {children}
        </CamContext.Provider>
    );
};