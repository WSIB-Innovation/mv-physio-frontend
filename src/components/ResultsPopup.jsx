import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Chart from 'react-apexcharts';
import ResultCard from '../components/ResultCard';
import backgroundImage from '../assets/man-doing-pushup.jpeg';
import walkingIcon from '../assets/icons/walking.svg';
import backIcon from '../assets/icons/back.svg';
import medalIcon from '../assets/icons/medal.svg';
import rocketIcon from '../assets/icons/rocket.svg';
import legIcon from '../assets/icons/leg.svg';
import handIcon from '../assets/icons/hand.svg';

const ResultsPage = () => {
    const [open, setOpen] = useState(false);
    const [modelResults, setModelResults] = useState({});
    // Used for x-axis of the chart
    const [repsRange, setRepsRange] = useState([]);
    const [feedbackArray, setFeedbackArray] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/results')
            .then(response => response.json())
            .then(data => {
                const myData = data
                setModelResults(data)

                let seriesLength = data.series.length;
                let rangeArray = Array.from({ length: seriesLength }, (_, i) => i + 1);
                setRepsRange(rangeArray);

                setFeedbackArray(data.feedback);
                })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleClick = () => {
        setOpen(!open);
    }

    const results = {
        score: modelResults['score'],
        totalReps: modelResults['reps'],
        performanceRating: modelResults['performance-rating'],
        consistency: modelResults['consistency'],
        feedback: [
            { condition: true, icon: <img src={walkingIcon} alt="Walking Icon" />, title: 'Total Reps', value: modelResults['reps'] },
            { condition: (feedbackArray.includes('Straighten Hips')), icon: <img src={backIcon} alt="Back Icon" />, title: 'Straighten Back', detail: 'Keep your back straight while performing the full movement' },
            { condition: true, icon: <img src={medalIcon} alt="Medal Icon" />, title: 'Performance Rating', chip: { label: modelResults['performance-rating'], backgroundColor: 'rgba(76, 175, 80, 0.1)', color: '#00803E' } },
            { condition: (feedbackArray.includes('Straighten Knees')), icon: <img src={legIcon} alt="Leg Icon" />, title: 'Straighten Legs', detail: 'Your legs should be straight while performing the movement' },
            { condition: true, icon: <img src={rocketIcon} alt="Rocket Icon" />, title: 'Consistency', value: modelResults['consistency']+'%'},
        ],
        chartData: {
            options: {
                chart: {
                    id: 'exercise-data-chart'
                },
                xaxis: {
                    categories: repsRange,
                    title: {
                        text: 'Rep #'
                    }
                },
                yaxis: {
                    title: {
                        text: '% score'
                    }
                },
                tooltip: {
                    y: {
                        formatter: function (value) {
                            return value + '%';
                        }
                    },
                    x: {
                        formatter: function (value) {
                            return 'Rep ' + value;
                        }
                    }
                }
            },
            series: [
                {
                    name: 'Score',
                    data: modelResults.series
                }
            ]
        }
    };

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Box
                component="img"
                src={backgroundImage}
                alt="Background"
                sx={{
                    width: '100%',
                    height: '100vh',
                    objectFit: 'cover',
                    filter: 'blur(8px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: -1
                }}
            />
            <Container sx={{ mt: 0 }}>
                <Button variant="contained" onClick={handleClick}>
                    Show Results
                </Button>
                <Dialog open={open} onClose={handleClick} maxWidth="lg" fullWidth>
                    <DialogTitle>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Pushups Results</Typography>
                            <Typography variant="h4" sx={{ color: 'green', ml: 2 }}>{results.score}%</Typography>
                            <Button variant="contained" startIcon={<PlayArrowIcon />} onClick={handleClick} sx={{ ml: 'auto' }}>
                                Playback
                            </Button>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
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
                </Dialog>
            </Container>
        </Box>
    );
};

export default ResultsPage;
