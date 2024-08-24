// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url(vaccinations-feline.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <Container>
        <Typography variant="h2" gutterBottom>
          Welcome to Cat Healthcare System
        </Typography>
        <Typography variant="h5" gutterBottom>
          Manage all your cat's healthcare needs in one place.
        </Typography>

        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Button
                component={Link}
                to="/grooming"
                variant="contained"
                color="primary"
                sx={{ minWidth: '200px' }}
              >
                Grooming
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/cat-boarding"
                variant="contained"
                color="primary"
                sx={{ minWidth: '200px' }}
              >
                Cat Boarding
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/financial-reports"
                variant="contained"
                color="primary"
                sx={{ minWidth: '200px' }}
              >
                Financial Reports
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/articles"
                variant="contained"
                color="primary"
                sx={{ minWidth: '200px' }}
              >
                Articles
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
