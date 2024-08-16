import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MonitorIcon from '@mui/icons-material/Monitor';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadIcon from '@mui/icons-material/Upload';
import ExercisePopup from './ExercisePopup';
import Tutorial from './TutorialPopup';
import { useCamContext } from '../hooks/useCamContext';
import CameraAccessPopup from './CameraAccessPopup';
import UploadPopup from './UploadPopup';
import ResultsPopup from './ResultsPopup';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const styles = {
  container: {
    display: 'flex',
    padding: '37.5px 33px 25.5px 52px',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '12px 12px 0px 0px',
    background: '#FEFFFF',
    boxShadow: '0px 2px 20px 0px rgba(0, 0, 0, 0.10)',
  },
  exerciseText: {
    color: 'var(--Text-Header, #1b1b1b)',
    fontSize: '25px',
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 'normal',
    cursor: 'pointer',
  },
  exercisePlaceholder: {
    color: 'var(--Text-Header, #1b1b1b)',
    fontSize: '30px',
    fontWeight: '530',
    lineHeight: 'normal',
    cursor: 'pointer',
  },
  exerciseContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '12px',
  },
  button: {
    backgroundColor: '#25487C',
    color: '#FFFFFF',
    textTransform: 'none',
    borderRadius: '8px',
  },
  tutorialButton: {
    color: 'var(--Text-Header, #1b1b1b)',
    textAlign: 'right',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    borderRadius: '8px',
    border: '1px solid #CCD1D8',
    textTransform: 'none',
    padding: '8px 16px',
  },
  widgetBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '16px',
  },
  modalBox: {
    position: 'fixed',
    top: '43%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 'none',
    borderRadius: '12px',
    zIndex: 1000,
    textAlign: 'center',
  },
};

const FooterPopup = () => {
  const { cameraOn, setCameraOn, captureType, setCaptureType } = useCamContext();
  const [videoFile, setVideoFile] = useState(null);
  const [showExercisePopup, setShowExercisePopup] = useState(false);
  const [exerciseSelected, setExerciseSelected] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showCameraAccessPopup, setShowCameraAccessPopup] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openCameraAccessPopup, setOpenCameraAccessPopup] = useState(false);
  const [openResults, setOpenResults] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const cameraToggle = () => {
    setCameraOn(!cameraOn);
    setCaptureType("off");
    setOpenCameraAccessPopup(false);
  };

  // Fetch results from server and save to database
  const fetchAndSaveResults = async () => {
    // get results from server
    const response = await fetch('http://localhost:5000/results');
    const results = await response.json();

    // If user is authenticated, save results to database
    if (user) {
      const saveResults = await fetch('http://localhost:5000/insert-exercise', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(results),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
    }
  }

  const handleLiveCaptureStart = () => {
    setCameraOn(false); // TODO: this is temporary until backend isn't default the video
    setShowCameraAccessPopup(false);
    setShowExercisePopup(false);
    setShowTutorial(false);
    if (captureType === 'live' || captureType === 'video') {
      setCaptureType('off');
      fetchAndSaveResults();
      setOpenResults(true);
    } else {
      setCaptureType('live');
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      console.log('Video file selected:', file);

      const formData = new FormData();
      formData.append('file', file);
      const response = fetch('http://localhost:5000/upload-video', {
        method: 'POST',
        body: formData,
      })

    } else {
      console.error('Please select a valid video file');
    }
  };

  const handleExerciseClick = () => setShowExercisePopup(true);

  const handleSelectExercise = (exercise) => {
    setExerciseSelected(exercise);
    setShowExercisePopup(false);
    setShowTutorial(true);
  };

  const handleBackTutorial = () => {
    setShowTutorial(false);
    setShowExercisePopup(true);
  };

  const handleTutorialClose = () => {
    setShowTutorial(false);
    setShowCameraAccessPopup(true);
    setShowExercisePopup(true);
  };

  const handleUploadIconClick = () => setOpenUploadModal(true);
  const handleUploadModalClose = () => setOpenUploadModal(false);

  const handleAgree = () => {
    setShowCameraAccessPopup(false);
    setShowExercisePopup(false);
  };

  const handleSignOut = () => {
    console.log('signout');
    logout();
  };

  useEffect(() => {
    setShowExercisePopup(true);
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.exerciseContainer}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={handleExerciseClick}>
          <Typography variant="h6" sx={exerciseSelected ? styles.exerciseText : styles.exercisePlaceholder}>
            {exerciseSelected ? exerciseSelected.label : 'Select an Exercise'}
          </Typography>
          <ExpandMoreIcon onClick={handleExerciseClick} />
        </Box>
        {exerciseSelected && (
          <Typography variant="body2">{exerciseSelected.target.join(' • ')}</Typography>
        )}
      </Box>
      <Box sx={styles.widgetBox}>
        { user &&
        <Button variant="outlined" sx={{ ...styles.button, textTransform: 'none'}}  onClick={handleSignOut}>
          Sign Out
        </Button> }
        <IconButton onClick={cameraToggle} sx={{ borderRadius: '8px', border: '1px solid #CCD1D8' }}>
          {cameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
        <IconButton component="label" sx={{ borderRadius: '8px', border: '1px solid #CCD1D8' }} onClick={handleUploadIconClick}>
          <UploadIcon />
        </IconButton>
        <Button variant="outlined" startIcon={<MonitorIcon />} sx={styles.tutorialButton} onClick={() => setShowTutorial(true)}>
          Tutorial
        </Button>
        <Button onClick={handleLiveCaptureStart} variant="contained" sx={styles.button} startIcon={<PlayArrowIcon />}>
          {(captureType === 'live' || captureType === 'video') ? 'Complete' : 'Start'}
        </Button>
      </Box>

      {showExercisePopup && (
        <ExercisePopup open={showExercisePopup} handleClose={() => setShowExercisePopup(false)} onSelectExercise={handleSelectExercise} />
      )}
      {showTutorial && (
        <Tutorial onClose={handleTutorialClose} onBack={handleBackTutorial} parentStyles={styles} />
      )}
      {showCameraAccessPopup && (
        <CameraAccessPopup open={showCameraAccessPopup} handleClose={() => setOpenCameraAccessPopup(false)} handleConfirm={cameraToggle} onAgree={handleAgree} />
      )}
      {openResults && <ResultsPopup open={openResults} parentStyles={styles} />}
      <UploadPopup open={openUploadModal} onClose={handleUploadModalClose} handleVideoUpload={handleVideoUpload} parentStyles={styles} />
    </Box>
  );
};

export default FooterPopup;
