import React, { useState } from 'react';
import { Box, Button, Typography, IconButton, Modal } from '@mui/material';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MonitorIcon from '@mui/icons-material/Monitor';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadIcon from '@mui/icons-material/Upload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ExercisePopup from './ExercisePopup';
import Tutorial from './TutorialPopup';

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
  startButton: {
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
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  uploadContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px dashed #CCD1D8',
    borderRadius: '12px',
    width: '100%',
    height: "40%",  },
  uploadContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  uploadButton: {
    mt: 2,
    fontSize: '1rem', 
    padding: '1rem 2rem',
    textTransform: 'none',
  },
  cancelButton: {
    fontSize: '1rem', 
    mr: 2,
    padding: '1rem 2rem',
    textTransform: 'none',
  },
  analyzeButton: {
    fontSize: '1rem',
    textTransform: 'none',
  }
};

const FooterPopup = () => {
  const [cameraOn, setCameraOn] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [showExercisePopup, setShowExercisePopup] = useState(false);
  const [exerciseSelected, setExerciseSelected] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);

  const handleCameraToggle = () => setCameraOn(!cameraOn);
  const handleExerciseClick = () => setShowExercisePopup(true);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      console.log('Video file selected:', file);
      // TODO: need to add backend logic here
    } else {
      console.error('Please select a valid video file');
    }
  };

  const handleSelectExercise = (exercise) => {
    setExerciseSelected(exercise);
    setShowExercisePopup(false);
    setShowTutorial(true);
  };

  const handleTutorialClose = () => {
    setShowTutorial(false);
    setShowExercisePopup(true);
  };

  const handleUploadIconClick = () => setOpenUploadModal(true);
  const handleUploadModalClose = () => setOpenUploadModal(false);

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
        <IconButton onClick={handleCameraToggle} sx={{ borderRadius: '8px', border: '1px solid #CCD1D8' }}>
          {cameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
        <IconButton component="label" sx={{ borderRadius: '8px', border: '1px solid #CCD1D8' }} onClick={handleUploadIconClick}>
          <UploadIcon />
        </IconButton>
        <Button variant="outlined" startIcon={<MonitorIcon />} sx={styles.tutorialButton} onClick={() => setShowTutorial(true)}>
          Tutorial
        </Button>
        <Button variant="contained" sx={styles.startButton} startIcon={<PlayArrowIcon />}>
          Start
        </Button>
      </Box>

      {showExercisePopup && (
        <ExercisePopup open={showExercisePopup} handleClose={() => setShowExercisePopup(false)} onSelectExercise={handleSelectExercise} />
      )}

      {showTutorial && (
        <Tutorial onClose={handleTutorialClose} />
      )}

      <Modal
        open={openUploadModal}
        onClose={handleUploadModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modalBox}>
          <Typography id="modal-modal-title" variant="h4" sx={{ fontWeight: '550', fontSize: '40px', padding: "3% 0px 0px" }} gutterBottom>
            Upload Video
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, padding: "0px 50px" }}>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', marginBottom: "1.8rem" }} gutterBottom>
              Please upload any video of you performing your chosen exercise, according to the ideal camera positioning
              just shown. Clearly face diagonally or to the side of your camera, showcasing your entire body.
            </Typography>
          </Box>
          <Box sx={styles.uploadContainer}>
            <Box sx={styles.uploadContent}>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 550, fontSize: '1.5rem' }}>Drag and drop your video</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>or</Typography>
              <Button variant="contained" startIcon={<AttachFileIcon />} component="label" sx={styles.uploadButton}>
                Browse files
                <input type="file" hidden accept="video/*" onChange={handleVideoUpload} />
              </Button>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" mt={4}>
            <Button variant="outlined" sx={styles.cancelButton} onClick={handleUploadModalClose}>Cancel</Button>
            <Button variant="contained" sx={styles.analyzeButton}>Analyze</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default FooterPopup;
