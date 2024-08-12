import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuthContext } from '../hooks/useAuthContext';

const LogsPopup = ({ open, onClose }) => {
  const [logs, setLogs] = useState([]);
  const { user } = useAuthContext();

   useEffect(() => {
     if (open && user) {
      fetch('http://localhost:5000/get-exercises', {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${user.access_token}`,
          'Content-Type' : 'application/json'
        }
      })  // Assume this endpoint provides the logs data
        .then(response => response.json())
        .then(data => {
          setLogs(data.exercises);
        })
        .catch(error => console.error('Error:', error));
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: 'bold', mb: 2 }} variant="h6">Previous Logs for user: </Typography>
          {/* TODO: add backend for user  */}
          <Button variant="contained" sx={{ backgroundColor: '#25487C', color: '#FFFFF', textTransform: 'none'}} onClick={onClose} startIcon={<CloseIcon />}>
            Close
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Total Reps</TableCell>
                <TableCell>Performance Rating</TableCell>
                <TableCell>Consistency</TableCell>
                <TableCell>Feedback</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.time}>
                  <TableCell>{log.time}</TableCell>
                  <TableCell>{log.score}</TableCell>
                  <TableCell>{log.reps}</TableCell>
                  <TableCell>{log['performance-rating']}</TableCell>
                  <TableCell>{log.consistency}</TableCell>
                  <TableCell>{Array.isArray(log.feedback) ? log.feedback.join(', ') : JSON.stringify(log.feedback)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default LogsPopup;
