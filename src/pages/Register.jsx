import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'white',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
  },
  title: {
    marginBottom: '20px',
    fontWeight: '700',
    textAlign: 'center',
    color: '#25487C',
  },
  textField: {
    width: '100%',
  },
  button: {
    backgroundColor: '#25487C',
    color: '#FFFFFF',
    textTransform: 'none',
    padding: '10px 0',
    '&:hover': {
      backgroundColor: '#1c3b63',
    },
  },
};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signup, error, isLoading } = useSignup();

  const handleSignup = async () => {
    await signup(email, username, password);
  };

  const handleBack = () => {
    navigate(-2);
  };

  return (
    <Box sx={styles.container}>
      <Box component="form" sx={styles.form} noValidate autoComplete="off">
        <IconButton onClick={handleBack} sx={styles.backButton}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={styles.title}>
          Register
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          sx={styles.textField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Username"
          variant="outlined"
          sx={styles.textField}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          sx={styles.textField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" sx={styles.button} onClick={handleSignup}>
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
