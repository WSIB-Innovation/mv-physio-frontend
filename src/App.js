import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Video from "./pages/Video";
import ResultsPage from "./components/ResultsPopup";
import { useAuthContext } from "./hooks/useAuthContext";
import LiveCapture from "./pages/LiveCapture";

const theme = createTheme(); 

function App() {
  const { user } = useAuthContext();

  return (
    <ThemeProvider theme={theme}>
      <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={!user ? <Login /> : <Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/video" element={<Video />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/live-capture" element={<LiveCapture />} />
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;
{/* <Button variant="contained" sx={styles.backButton} onClick={() => setIsTutorialPage(true)}>
<ArrowBackIcon />
</Button> */}