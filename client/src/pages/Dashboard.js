// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';

const Dashboard = () => {
  const [grooming, setGrooming] = useState([]);
  const [boardings, setBoardings] = useState([]);
  const [infographics, setInfographics] = useState([]);
  const [financialReports, setFinancialReports] = useState([]);

  useEffect(() => {
    const fetchGrooming = async () => {
      const res = await axios.get('/api/grooming');
      setGrooming(res.data);
    };

    const fetchBoardings = async () => {
      const res = await axios.get('/api/boarding');
      setBoardings(res.data);
    };

    const fetchInfographics = async () => {
      const res = await axios.get('/api/articles');
      setInfographics(res.data);
    };

    const fetchFinancialReports = async () => {
      const res = await axios.get('/api/finance');
      setFinancialReports(res.data);
    };

    fetchGrooming();
    fetchBoardings();
    fetchInfographics();
    fetchFinancialReports();
  }, []);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>Dashboard</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>Grooming Schedule</Typography>
              {grooming.map((item) => (
                <Box key={item._id} mb={2}>
                  <Typography variant="body1">{item.date} - {item.time} - Quota: {item.quota}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>Cat Boardings</Typography>
              {boardings.map((item) => (
                <Box key={item._id} mb={2}>
                  <Typography variant="body1">{item.date} - {item.time} - Quota: {item.quota}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>Articles</Typography>
              {infographics.map((item) => (
                <Box key={item._id} mb={2}>
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography variant="body2">{item.filename}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>Financial Reports</Typography>
              {financialReports.map((item) => (
                <Box key={item._id} mb={2}>
                  <Typography variant="body1">{item.date} - Amount: {item.amount} - OwnerId: {item.ownerId}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
