// src/pages/Boarding.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Card, CardContent, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Boarding = () => {
  const [schedules, setSchedules] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [quota, setQuota] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      const res = await axios.get('/api/boarding');
      setSchedules(res.data);
    };

    fetchSchedules();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      try {
        const res = await axios.put(`/api/boarding/${currentId}`, { date, time, quota });
        setSchedules(schedules.map(schedule => (schedule._id === currentId ? res.data : schedule)));
        setEditing(false);
        setCurrentId(null);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await axios.post('/api/boarding', { date, time, quota });
        setSchedules([...schedules, res.data]);
      } catch (err) {
        console.error(err);
      }
    }

    setDate('');
    setTime('');
    setQuota('');
  };

  const handleEdit = (id) => {
    const schedule = schedules.find(schedule => schedule._id === id);
    setDate(schedule.date);
    setTime(schedule.time);
    setQuota(schedule.quota);
    setEditing(true);
    setCurrentId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/boarding/${id}`);
      setSchedules(schedules.filter(schedule => schedule._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" gutterBottom>Cat Boarding Schedule</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <TextField
            label="Tanggal Layanan"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            label="Jam Layanan"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            label="Kuota"
            type="number"
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">{editing ? 'Update' : 'Add'} Schedule</Button>
        </form>

        <Typography variant="h5" gutterBottom>Scheduled Boardings</Typography>
        <Grid container spacing={2}>
          {schedules.map((schedule) => (
            <Grid item xs={12} sm={6} md={4} key={schedule._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{schedule.date}</Typography>
                  <Typography variant="body1">{schedule.time}</Typography>
                  <Typography variant="body2">Quota: {schedule.quota}</Typography>
                  <IconButton color="primary" onClick={() => handleEdit(schedule._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(schedule._id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Boarding;
