import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Chart from 'react-apexcharts';
import ResultCard from './ResultCard';
import backgroundImage from '../assets/man-doing-pushup.jpeg';
import walkingIcon from '../assets/icons/walking.svg';
import backIcon from '../assets/icons/back.svg';
import medalIcon from '../assets/icons/medal.svg';
import rocketIcon from '../assets/icons/rocket.svg';
import legIcon from '../assets/icons/leg.svg';
import handIcon from '../assets/icons/hand.svg';

const ResultsPage = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const results = {
        score: 79,
        totalReps: 12,
        performanceRating: 'Excellent',
        consistency: 76,
        feedback: [
            { icon: <img src={walkingIcon} alt="Walking Icon" />, title: 'Total Reps', value: 12 },
            { icon: <img src={handIcon} alt="Hand Icon" />, title: 'Distance your hands', detail: 'Keep your hands shoulder width apart from each other' },
            { icon: <img src={medalIcon} alt="Medal Icon" />, title: 'Performance Rating', chip: { label: 'Excellent', backgroundColor: 'rgba(76, 175, 80, 0.1)', color: '#00803E' } },
            { icon: <img src={backIcon} alt="Back Icon" />, title: 'Straighten Back', detail: 'Keep your back straight while performing the full movement' },
            { icon: <img src={rocketIcon} alt="Rocket Icon" />, title: 'Consistency', value: '76%' },
            { icon: <img src={legIcon} alt="Leg Icon" />, title: 'Straighten Legs', detail: 'Your legs should be straight while performing the movement' },
        ],
        chartData: {
            options: {
                chart: {
                    id: 'exercise-data-chart'
                },
                xaxis: {
                    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
                    data: [60, 70, 75, 68, 82, 70, 72, 68, 65]
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
                <Button variant="contained" onClick={handleClickOpen}>
                    Show Results
                </Button>
                <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                    <DialogTitle>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Pushups Results</Typography>
                            <Typography variant="h4" sx={{ color: 'green', ml: 2 }}>{results.score}%</Typography>
                            <Button variant="contained" startIcon={<PlayArrowIcon />} onClick={handleClose} sx={{ ml: 'auto' }}>
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
                                    {results.feedback.map((item, index) => (
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
