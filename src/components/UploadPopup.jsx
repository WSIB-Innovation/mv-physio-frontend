import React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useCamContext } from '../hooks/useCamContext';

const styles = {
  uploadContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px dashed #CCD1D8',
    borderRadius: '12px',
    width: '100%',
    height: "40%",
  },
};

const UploadPopup = ({ open, onClose, handleVideoUpload, parentStyles }) => {

  const { setCameraOn, setCaptureType } = useCamContext();

  const handleAnalysis = () => {
    setCaptureType('video');
    setCameraOn(false);
  }

  const handleClick = () => {
    handleAnalysis();
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={parentStyles.modalBox}>
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
          <Box>
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 550, fontSize: '1.5rem' }}>Drag and drop your video</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>or</Typography>
            <Button variant="contained" startIcon={<AttachFileIcon />} component="label" sx={parentStyles.button}>
              Browse files
              <input type="file" hidden accept="video/*" onChange={handleVideoUpload} />
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" sx={parentStyles.button} onClick={onClose}>Cancel</Button>
          <Button variant="contained" sx={{...parentStyles.button, ml:'2%'}} onClick={handleClick}>Analyze</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadPopup;
