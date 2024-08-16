import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Grid, DialogTitle, DialogContent } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Chart from 'react-apexcharts';
import ResultCard from '../components/ResultCard';
import walkingIcon from '../assets/icons/walking.svg';
import backIcon from '../assets/icons/back.svg';
import medalIcon from '../assets/icons/medal.svg';
import rocketIcon from '../assets/icons/rocket.svg';
import legIcon from '../assets/icons/leg.svg';
import { useAuthContext } from '../hooks/useAuthContext';
import LogsPopup from '../components/LogsPopup';
import { useNavigate } from 'react-router-dom';

const styles = {
  cameraAccessPopupBox: {
    position: 'fixed',
    top: '43%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '78%',
    height: '73%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: '1%',
    outline: 'none',
    borderRadius: '12px',
    zIndex: 1000,
    textAlign: 'center',
  },
  returnButton: {
    textTransform: 'none',
    marginRight: 'auto',
    backgroundColor: '#25487C',
    color: '#FFFFFF',
  },
};

const ResultsPopup = () => {
  const [open, setOpen] = useState(false);
  const [modelResults, setModelResults] = useState({});
  const [repsRange, setRepsRange] = useState([]);
  const [feedbackArray, setFeedbackArray] = useState([]);
  const [openLogs, setOpenLogs] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    fetch('http://localhost:5000/results')
      .then(response => response.json())
      .then(data => {
        setModelResults(data);

        let seriesLength = data.series.length;
        let rangeArray = Array.from({ length: seriesLength }, (_, i) => i + 1);
        setRepsRange(rangeArray);

        setFeedbackArray(data.feedback);
        setOpen(true);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const results = {
    score: modelResults['score'],
    totalReps: modelResults['reps'],
    performanceRating: modelResults['performance-rating'],
    consistency: modelResults['consistency'],
    feedback: [
      { condition: true, icon: <img src={walkingIcon} alt="Walking Icon" />, title: 'Total Reps', value: modelResults['reps'] },
      { condition: feedbackArray.includes('Straighten Hips'), icon: <img src={backIcon} alt="Back Icon" />, title: 'Straighten Back', detail: 'Keep your back straight while performing the full movement' },
      { condition: true, icon: <img src={medalIcon} alt="Medal Icon" />, title: 'Performance Rating', chip: { label: modelResults['performance-rating'], backgroundColor: 'rgba(76, 175, 80, 0.1)', color: '#00803E' } },
      { condition: feedbackArray.includes('Straighten Knees'), icon: <img src={legIcon} alt="Leg Icon" />, title: 'Straighten Legs', detail: 'Your legs should be straight while performing the movement' },
      { condition: true, icon: <img src={rocketIcon} alt="Rocket Icon" />, title: 'Consistency', value: `${modelResults['consistency']}%` },
    ],
    chartData: {
      options: {
        chart: {
          id: 'exercise-data-chart',
        },
        xaxis: {
          categories: repsRange,
          title: {
            text: 'Rep #',
          },
        },
        yaxis: {
          title: {
            text: '% score',
          },
        },
        tooltip: {
          y: {
            formatter: (value) => `${value}%`,
          },
          x: {
            formatter: (value) => `Rep ${value}`,
          },
        },
      },
      series: [
        {
          name: 'Score',
          data: modelResults.series,
        },
      ],
    },
  };

  return (
    <Box sx={styles.cameraAccessPopupBox} onClose={handleClose}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            sx={styles.returnButton}
          >
            Return to Homepage
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mx: 'auto' }}>Pushups Results</Typography>
          <Typography variant="h4" sx={{ color: 'green', ml: 2 }}>{results.score}%</Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#25487C', textTransform: 'none', marginLeft: 'auto' }}
            startIcon={<PlayArrowIcon />}
            onClick={() => setOpenLogs(true)}
          >
            Previous Logs
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ height: '80%' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Exercise Data</Typography>
            <Chart options={results.chartData.options} series={results.chartData.series} type="line" height={300} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Performance</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Feedback</Typography>
              </Grid>
              {results.feedback.filter(item => item.condition).map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <ResultCard
                    icon={item.icon}
                    title={item.title}
                    detail={item.detail}
                    value={item.value}
                    chip={item.chip}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <LogsPopup open={openLogs} onClose={() => setOpenLogs(false)} />
    </Box>
  );
};

export default ResultsPopup;
