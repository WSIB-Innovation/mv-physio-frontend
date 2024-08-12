import React from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const styles = {
  cameraAccessPopupBox: {
    position: 'fixed',
    top: '43%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '72%',
    height: '63%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: '4%',
    outline: 'none',
    borderRadius: '12px',
    zIndex: 1000,
    textAlign: 'center',
  },
  cameraIcon: {
    fontSize: '4rem',
    mb: 2,
  },
  cameraTitle: {
    fontWeight: 'bold',
    mb: 2,
  },
  cameraSubtitle: {
    mb: 3,
  },
  cameraStartButton: {
    mt: 3,
    textTransform: 'none',
    fontSize: '1rem',
    padding: '10px 20px',
    borderRadius: '8px',
    backgroundColor: '#25487C',
  },
  cameraDivider: {
    mt: 2,
    mb: 2,
  },
  cameraUploadTitle: {
    mt: 2,
    fontWeight: 'bold',
  },
  cameraUploadSubtitle: {
    mt: 1,
    mb: 2,
  },
  continueButton: {
    mt: 2,
    textTransform: 'none',
    fontSize: '1rem',
    padding: '10px 20px',
    borderRadius: '8px',
    ml: 2,
  },
};

const CameraAccessPopup = ({ handleClose, handleConfirm, onAgree }) => {
  return (
      <Box sx={styles.cameraAccessPopupBox}>
        <VideocamOffIcon sx={styles.cameraIcon} />
        <Typography id="camera-access-modal-title" sx={styles.cameraTitle}>
          Click to allow camera access
        </Typography>
        <Typography id="camera-access-modal-description" sx={styles.cameraSubtitle}>
          To use live camera of recording your exercise, we need permission to use your camera. 
          Once you have allowed access, you can begin your exercise by clicking the Start button in the footer.
        </Typography>
        <Button
          variant="contained"
          sx={styles.cameraStartButton}
          onClick={() => {
            handleConfirm();
            handleClose();
            onAgree();
          }}
        >
          I agree
        </Button>
        <Typography sx={styles.cameraDivider}>– or –</Typography>
        <Typography sx={styles.cameraUploadTitle}>
          Upload video below
        </Typography>
        <Typography sx={styles.cameraUploadSubtitle}>
          If you choose to upload a pre-recorded video and have reviewed
          the ideal camera positions, then press the upload button below.
        </Typography>
      </Box>
  );
};

export default CameraAccessPopup;
