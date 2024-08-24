// src/pages/DoctorAppointment.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Card, CardContent, Grid } from '@mui/material';

const DoctorAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get('/api/appointments');
      setAppointments(res.data);
    };

    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/appointments', { date, time });
      setAppointments([...appointments, res.data]);
      setDate('');
      setTime('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" gutterBottom>Doctor Appointments</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <TextField
            label="Appointment Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            label="Appointment Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <Button type="submit" variant="contained" color="primary">Schedule Appointment</Button>
        </form>

        <Typography variant="h5" gutterBottom>Upcoming Appointments</Typography>
        <Grid container spacing={2}>
          {appointments.map((appointment) => (
            <Grid item xs={12} sm={6} md={4} key={appointment._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{appointment.date}</Typography>
                  <Typography variant="body1">{appointment.time}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default DoctorAppointment;
