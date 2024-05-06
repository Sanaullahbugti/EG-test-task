import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


export const ErrorPage = () => {
  

  return (
    <Container maxWidth="sm">
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Typography variant="h4" component="h1" color="error">
          Oops, Sorry, an unexpected error has occurred
        </Typography>
      </div>
    </Container>
  );
};

