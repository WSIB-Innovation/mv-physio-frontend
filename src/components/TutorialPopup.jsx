import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Card, CardMedia, Grid, Modal, Slider } from '@mui/material';
import CheckIcon from './CheckIcon';
import CancelIcon from './CancelIcon';
import tutorial1 from '../assets/tutorial1.png';
import tutorial2 from '../assets/tutorial2.png';
import tutorial3 from '../assets/tutorial3.png';
import video from '../assets/pushup-demo.mp4'; // Adjust the path as necessary
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff';
import SettingsIcon from '@mui/icons-material/Settings';

const styles = {
  modalBox: {
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
  button: {
    mt: 2,
    textTransform: 'none',
    fontSize: '1rem',
    padding: '10px 20px',
    borderRadius: '8px',
  },
  backButton: {
    mt: 2,
    textTransform: 'none',
    fontSize: '1rem',
    padding: '10px 20px',
    borderRadius: '8px',
    ml: 2,
  },
};

const photos = [
  { id: 1, src: tutorial1, selected: true },
  { id: 2, src: tutorial2, selected: true },
  { id: 3, src: tutorial3, selected: false },
];

const Tutorial = ({ onClose }) => {
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [captions, setCaptions] = useState([]);
  const videoRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState(0);
  const [captionText, setCaptionText] = useState("");

  const idleTimeoutRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (videoRef.current) {
      videoRef.current.volume = newValue / 100;
    }
  };

  const mute = () => {
    if (videoRef.current && videoRef.current.volume !== undefined) {
      if (videoRef.current.volume !== 0) {
        setVolume(0);
        videoRef.current.volume = 0;
      } else {
        setVolume(50);
        videoRef.current.volume = 0.5;
      }
      console.log("Mute toggled. Volume:", volume);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (event, newValue) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const resetIdleTimer = () => {
    setIsIdle(false);
    clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = setTimeout(() => {
      setIsIdle(true);
    }, 3000);
  };

  const handleLinkClick = (event, url) => {
    event.preventDefault(); // Prevent the default action of the link
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
    window.open(url, "_blank");
  };

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault(); // Prevent default spacebar action (scrolling)
      togglePlayPause();
    }
  };

  // Caption-related functions
  const toggleCaptions = () => {
    setShowCaptions(!showCaptions);
  };

  const loadCaptions = async () => {
    try {
      const response = await fetch("/subtitles.vtt");
      const text = await response.text();
      const parsedCaptions = parseVtt(text);
      setCaptions(parsedCaptions);
    } catch (error) {
      console.error("Error loading captions:", error);
    }
  };

  const parseVtt = (vttText) => {
    const lines = vttText.trim().split(/\r?\n/);
    let index = 0;
    const captions = [];

    while (index < lines.length) {
      if (lines[index].includes("-->")) {
        const [timeRange, ...textLines] = lines.slice(index, index + 2);
        const [startTime, endTime] = timeRange.split(" --> ").map(parseTime);
        const text = textLines.join(" ");
        captions.push({ startTime, endTime, text });
        index += 2;
      } else {
        index++;
      }
    }

    return captions;
  };

  const parseTime = (timeString) => {
    try {
      const parts = timeString.split(":");
      const [seconds, milliseconds] = parts[2].split(".");
      return (
        parseInt(parts[0], 10) * 3600 +
        parseInt(parts[1], 10) * 60 +
        parseInt(seconds, 10) +
        parseInt(milliseconds, 10) / 1000
      );
    } catch (error) {
      console.error("Error parsing time string:", timeString, error);
      return 0; // Return 0 or some default value in case of error
    }
  };

  useEffect(() => {
    loadCaptions();
  }, []);

  useEffect(() => {
    const updateCaption = () => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const currentCaption = captions.find(
          (caption) =>
            currentTime >= caption.startTime && currentTime <= caption.endTime
        );
        if (currentCaption) {
          setCaptionText(currentCaption.text);
        } else {
          setCaptionText("");
        }
      }
    };

    const interval = setInterval(updateCaption, 100);

    return () => clearInterval(interval);
  }, [captions, videoRef]);

  useEffect(() => {
    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);
    window.addEventListener("keydown", handleKeyDown);
    resetIdleTimer(); // Initialize the timer

    return () => {
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(idleTimeoutRef.current);
    };
  }, [isPlaying]);

  return (
    <Box sx={styles.modalBox}>
      <Typography variant="h4" sx={{ fontWeight: '550', fontSize: '2rem', padding: '0 5% 0' }} gutterBottom>
        Ideal Camera Position for Pushups
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '-0rem', padding: '0 5%' }}>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', marginBottom: '5%' }} gutterBottom>
          Please film your videos or use live capture with the camera positioned as shown below for ideal camera position.
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center" sx={{ flexWrap: 'nowrap' }}>
        {photos.map((photo) => (
          <Grid item key={photo.id}>
            <Card sx={{ position: 'relative', width: 300, height: 200 }}>
              <CardMedia
                component="img"
                height="100%"
                image={photo.src}
                alt={`Photo ${photo.id}`}
                sx={{ objectFit: 'cover' }}
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
        <Button variant="contained" sx={styles.button} onClick={handleOpen}>
          Watch Tutorial Video
        </Button>
        
        <Button variant="contained" sx={styles.backButton} onClick={onClose}>
          Back
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modalBox}>
          <video
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={togglePlayPause}
            controls
            width="100%"
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div
            className={`captions ${isIdle ? "slide" : ""} ${showCaptions ? "visible" : "hidden"}`}
          >
            {captionText}
          </div>

          <div className={`video-controls ${isIdle ? "hidden" : ""}`}>
            <div className="control-buttons">
              <div className="volume-timestamp">
                <div className="volume">
                  <Button
                    onClick={mute}
                    style={{ color: "#25487C", padding: 4 }}
                  >
                    {videoRef.current && videoRef.current.volume != 0 ? (
                      <VolumeDown sx={{ fontSize: 24 }} />
                    ) : (
                      <VolumeOffIcon sx={{ fontSize: 24 }} />
                    )}
                  </Button>
                  <Slider
                    aria-label="Volume"
                    value={volume}
                    onChange={handleVolumeChange}
                    sx={{
                      color: "#25487C", // Change the color of the slider's active portion
                      "& .MuiSlider-track": {
                        backgroundColor: "#25487C",
                        height: "5px", // Change the color of the slider's active track
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "#e0e0e0",
                        height: "5px", // Change the color of the slider's inactive track
                      },
                      "& .MuiSlider-thumb": {
                        height: "16px",
                        width: "16px",
                        boxShadow: "0 0 0 2px #feffff", // Remove the drop shadow
                      },
                    }}
                  />
                </div>
                <p>{`${Math.floor(currentTime / 60).toString().padStart(2, "0")}:${Math.floor(currentTime % 60).toString().padStart(2, "0")} / ${Math.floor(duration / 60).toString().padStart(2, "0")}:${Math.floor(duration % 60).toString().padStart(2, "0")}`}</p>
              </div>

              <Button style={{ color: "#25487C" }} onClick={togglePlayPause}>
                {isPlaying ? (
                  <PauseCircleFilledIcon sx={{ fontSize: 56 }} />
                ) : (
                  <PlayCircleFilledWhiteIcon sx={{ fontSize: 56 }} />
                )}
              </Button>

              <div className="settings-buttons">
                <Button style={{ color: "#25487C" }} onClick={toggleCaptions}>
                  {showCaptions ? (
                    <SubtitlesIcon sx={{ fontSize: 32 }} />
                  ) : (
                    <SubtitlesOffIcon sx={{ fontSize: 32 }} />
                  )}
                </Button>

                <Button aria-label="delete" style={{ color: "#25487C" }}>
                  <SettingsIcon sx={{ fontSize: 32 }} />
                </Button>
              </div>
            </div>
            <Slider
              aria-label="Video Progress"
              value={currentTime}
              min={0}
              max={duration}
              onChange={handleSeek}
              sx={{
                color: "#25487C", // Change the color of the slider's active portion
                "& .MuiSlider-track": {
                  backgroundColor: "#25487C", // Change the color of the slider's active track
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#e0e0e0",
                  height: "5px", // Change the color of the slider's inactive track
                },
                "& .MuiSlider-thumb": {
                  height: "20px",
                  width: "20px",
                  boxShadow: "0 0 0 3px #feffff", // Remove the drop shadow
                },
              }}
            />
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default Tutorial;
