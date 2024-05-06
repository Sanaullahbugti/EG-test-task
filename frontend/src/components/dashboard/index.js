import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Typography variant="h4" component="h1" color="secondary">
          Welcome to the application
        </Typography>
        <Button className='mt:1' variant="outlined" color="error" onClick={() => {
          localStorage.removeItem("auth")
          navigate("/signin")
        }}>
          Sign out
        </Button>

      </div>
    </Container>
  );
};

