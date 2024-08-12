import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

const styles = {
  modalBox: {
    margin: '0 auto',
    padding: '16px',
    overflow: 'hidden',
    zIndex: 1000,
    position: 'fixed',
    top: '43%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '68%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 'none',
    borderRadius: '12px',
    zIndex: 1000,
}
};

const exercises = [
  { label: 'Pushups', target: ['Chest', 'Shoulder', 'Triceps'], category: 'Upper Body' },
  { label: 'Crunches', target: ['Upper Abs', 'Side Abs', 'Stomach'], category: 'Core' },
  { label: 'Squats', target: ['Legs', 'Glutes'], category: 'Lower Body' },
  { label: 'Lunges', target: ['Legs', 'Glutes'], category: 'Lower Body' },
  { label: 'Yoga', target: ['Cooldown'], category: 'All' },
  { label: 'Jumping Jacks', target: ['Full Body'], category: 'All' },
];

const ExercisePopup = ({ open, handleClose, onSelectExercise }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChip, setSelectedChip] = useState('All');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChipClick = (chip) => {
    setSelectedChip(chip);
  };

  const handleExerciseSelect = (exercise) => {
    onSelectExercise(exercise);
    handleClose();
  };

  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Typography component="span" sx={{ fontWeight: 'bold', backgroundColor: 'yellow' }} key={index}>
              {part}
            </Typography>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const filteredExercises = exercises.filter((exercise) => {
    return (
      exercise.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedChip === 'All' || exercise.category === selectedChip)
    );
  });

  if (!open) {
    return null;
  }

  return (
    <Box sx={styles.modalBox}>
      <TextField
        fullWidth
        label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ marginBottom: 2 }}
      />

      <Box sx={{ display: 'flex', gap: 1, marginBottom: 2, flexWrap: 'wrap' }}>
        {['Upper Body', 'Lower Body', 'Core', 'Free weight', 'Bodyweight', 'All'].map((chip) => (
          <Chip
            key={chip}
            label={chip}
            clickable
            color={selectedChip === chip ? 'primary' : 'default'}
            onClick={() => handleChipClick(chip)}
          />
        ))}
      </Box>

      <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        <List>
          {filteredExercises.map((exercise, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleExerciseSelect(exercise)}
            >
              <ListItemIcon>
                <img
                  loading="lazy"
                  width="20"
                  src={require(`../assets/icons/${exercise.label.toLowerCase()}.png`)}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText
                primary={highlightText(exercise.label, searchTerm)}
                secondary={exercise.target.join(' · ')}
              />
            </ListItem>
          ))}
        </List>

      </Box>
    </Box>
  );
};

export default ExercisePopup;
