import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/backgroundImage.png"; 
import FooterPopup from '../components/FooterPopup';

const Main = () => {
  return (
    <div style={styles.container}>
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
    backgroundImage: `url(${backgroundImage})`,
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
