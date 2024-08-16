import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Card, CardMedia, Grid, Modal, Slider } from '@mui/material';
import CheckIcon from './CheckIcon';
import CancelIcon from './CancelIcon';
import tutorial1 from '../assets/tutorial1.png';
import tutorial2 from '../assets/tutorial2.png';
import tutorial3 from '../assets/tutorial3.png';
import video from '../assets/pushup-demo.mp4'; 
import CloseIcon from '@mui/icons-material/Close'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const styles = {
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#25487C',
    color: '#FFFFFF',
    textTransform: 'none',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#1c3b63',
    },
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'hidden',
  },
};

const photos = [
  { id: 1, src: tutorial1, selected: true },
  { id: 2, src: tutorial2, selected: true },
  { id: 3, src: tutorial3, selected: false },
];

const Tutorial = ({ onClose, onBack , parentStyles}) => {
  const [open, setOpen] = useState(false);
  const videoRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <Box sx={parentStyles.modalBox}>
      <Button
      variant="contained"
      sx={styles.backButton}
      onClick={onBack}
      >
      <ArrowBackIcon />
      </Button>
      <Typography variant="h4" sx={{ fontWeight: '550', fontSize: '2rem', padding: '0 5% 0' }} gutterBottom>
        Ideal Camera Position Tutorial
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '-0rem', padding: '0 5%' }}>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', marginBottom: '5%' }} gutterBottom>
          Please film your videos or use live capture with the camera positioned as shown below for ideal camera position.
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center" sx={{ flexWrap: 'nowrap' }}>
        {photos.map((photo) => (
          <Grid item key={photo.id} sx={{ flex: '1 1 auto' }}>
            <Card sx={{ position: 'relative', width: '100%', height: '0', paddingTop: '66.66%' }}>
              <CardMedia
                component="img"
                image={photo.src}
                alt={`Photo ${photo.id}`}
                sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                {photo.selected ? <CheckIcon /> : <CancelIcon />}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="body1" sx={{ fontSize: '1rem', marginTop: "50px", padding: "0px 50px" }} gutterBottom>
        Once you are ready to begin your exercise, click the "Start" button in the bottom navigation. If you'd like to select a 
        different exercise, click the back button. If you'd like to watch a tutorial video of your selected exercise, click the button below.
        {/* TODO: need to add more videos in here in future */}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <Button variant="contained" sx={{mt: '2%', padding: '10px 20px', ...parentStyles.button}} onClick={handleOpen}>
          Watch Tutorial Video
        </Button>
        
        <Button variant="contained" sx={{m: '2% 2% 0%', padding: '10px 20px', ...parentStyles.button}} onClick={onClose}>
          Continue
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modalBox}>
        <Button onClick={handleClose} sx={styles.closeButton}>
            <CloseIcon />
          </Button>
          <video
            ref={videoRef}
            controls
            style={styles.video}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
            <track src="subtitles.vtt" kind="subtitles" srclang="en" label="English" />

          </video>
        </Box>
      </Modal>
    </Box>
  );
};

export default Tutorial;
