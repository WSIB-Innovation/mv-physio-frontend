import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Video from "./pages/Video";
import ResultsPage from "./components/ResultsPopup";

const theme = createTheme(); 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/video" element={<Video />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;
{/* <Button variant="contained" sx={styles.backButton} onClick={() => setIsTutorialPage(true)}>
<ArrowBackIcon />
</Button> */}