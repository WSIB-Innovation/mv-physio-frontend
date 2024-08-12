import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { CamProvider } from './context/camContext';


const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
      <CamProvider>

        <App />
      </CamProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
  root
);

