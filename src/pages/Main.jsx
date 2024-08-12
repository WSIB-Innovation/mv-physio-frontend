import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/backgroundImage.png"; 
import FooterPopup from '../components/FooterPopup';
import { useCamContext } from "../hooks/useCamContext";

const Main = () => {
  const { cameraOn, captureType } = useCamContext();
  const [ captureRoute, setCaptureRoute ] = useState(backgroundImage);

  useEffect(() => {
    if (cameraOn) {
      setCaptureRoute('http://localhost:5000/camera'); 
    }
    else if (captureType === "live") {
      setCaptureRoute('http://localhost:5000/live-capture');
    }
    else if (captureType === "video") {
      setCaptureRoute('http://localhost:5000/video-analysis');
    }
    else { //else (captureType === "off" && !cameraOn)
      setCaptureRoute('');
    }
  }, [cameraOn, captureType]);

  return (
    <div style={styles.container}>
      { (captureRoute !== '') ? <img src={captureRoute} alt="capture" style={{width: '100%', height: '100%'}} /> : null }
      <div style={styles.footerContainer}>
        <FooterPopup />
      </div>

    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${backgroundImage })`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    backgroundColor: '#25487C',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  footerContainer: {
    position: 'fixed',
    bottom: '0vh', 
    width: '80%',
    left: '10%',
    zIndex: 1000, 
  },
};

export default Main;
