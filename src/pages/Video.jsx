import React, { useRef, useState, useEffect } from "react";
import video from "../assets/pushup-demo.mp4";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import Button from "@mui/material/Button";
import SubtitlesOffIcon from "@mui/icons-material/SubtitlesOff";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import SettingsIcon from "@mui/icons-material/Settings";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const IDLE_TIMEOUT = 3000;

const Video = () => {
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
  const [open, setOpen] = useState(false);

  const idleTimeoutRef = useRef(null);

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
    }, IDLE_TIMEOUT);
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

  //Caption Stuff
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

  //Regular Code Starts

  useEffect(() => {
    loadCaptions();
  }, []);

  useEffect(() => {
    const updateCaption = () => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        // Find the caption that matches the current time
        const currentCaption = captions.find(
          (caption) =>
            currentTime >= caption.startTime && currentTime <= caption.endTime
        );
        if (currentCaption) {
          setCaption(currentCaption.text);
        }
      }
    };

    // Set up a timer to update caption periodically
    const interval = setInterval(updateCaption, 100); // Adjust interval as needed

    // Clean up the timer when component unmounts
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">Open Video Popup</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="video-modal"
        aria-describedby="video-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <div className="video-container">
            <div className={`top-bar ${isIdle ? "hidden" : ""}`}>
              <IconButton aria-label="close" size="large" onClick={handleClose}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <h1>Pushup Tutorial</h1>

              <a
                href="https://www.youtube.com/watch?v=JyCG_5l3XLk"
                onClick={(e) =>
                  handleLinkClick(e, "https://www.youtube.com/watch?v=JyCG_5l3XLk")
                }
              >
                Video Source
              </a>
            </div>

            <video
              ref={videoRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlayPause}
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div
              className={`captions ${isIdle ? "slide" : ""} ${
                showCaptions ? "visible" : "hidden"
              }`}
            >
              {captionText}
            </div>

            <div className={`video-controls ${isIdle ? "hidden" : ""}`}>
              <div className="control-buttons">
                <div className="volume-timestamp">
                  <div className="volume">
                    <IconButton
                      onClick={mute}
                      style={{ color: "#25487C", padding: 4 }}
                    >
                      {videoRef.current && videoRef.current.volume != 0 ? (
                        <VolumeDown sx={{ fontSize: 24 }} />
                      ) : (
                        <VolumeOffIcon sx={{ fontSize: 24 }} />
                      )}
                    </IconButton>
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
                  <p>{`${Math.floor(currentTime / 60)
                    .toString()
                    .padStart(2, "0")}:${Math.floor(currentTime % 60)
                    .toString()
                    .padStart(2, "0")} / ${Math.floor(duration / 60)
                    .toString()
                    .padStart(2, "0")}:${Math.floor(duration % 60)
                    .toString()
                    .padStart(2, "0")}`}</p>
                </div>

                <IconButton style={{ color: "#25487C" }} onClick={togglePlayPause}>
                  {isPlaying ? (
                    <PauseCircleFilledIcon sx={{ fontSize: 56 }} />
                  ) : (
                    <PlayCircleFilledWhiteIcon sx={{ fontSize: 56 }} />
                  )}
                </IconButton>

                <div className="settings-buttons">
                  <IconButton style={{ color: "#25487C" }} onClick={toggleCaptions}>
                    {showCaptions ? (
                      <SubtitlesIcon sx={{ fontSize: 32 }} />
                    ) : (
                      <SubtitlesOffIcon sx={{ fontSize: 32 }} />
                    )}
                  </IconButton>

                  <IconButton aria-label="delete" style={{ color: "#25487C" }}>
                    <SettingsIcon sx={{ fontSize: 32 }} />
                  </IconButton>
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
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Video;
