import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Chip from '@mui/material/Chip';

const ResultCard = ({ icon, title, value, detail, chip }) => {
    return (
        <Card sx={{ boxShadow: 2, height: '100%', borderRadius: 2 }}>
            <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                    {icon}
                    <Typography variant="h6">{title}</Typography>
                    {value && <Typography variant="h4">{value}</Typography>}
                    {detail && (
                        <Typography variant="body2" color="textSecondary" textAlign="center">
                            {detail}
                        </Typography>
                    )}
                    {chip && (
                        <Chip label={chip.label} sx={{ 
                            backgroundColor: chip.backgroundColor, 
                            color: chip.color, 
                            fontFamily: 'Mulish', 
                            fontSize: '20px', 
                            fontWeight: 700, 
                            letterSpacing: '-0.2px',
                            lineHeight: 'normal',
                            padding: '5px 10px' 
                        }} />
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ResultCard;
