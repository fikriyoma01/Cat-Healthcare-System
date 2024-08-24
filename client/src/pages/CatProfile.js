// src/pages/CatProfile.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const CatProfile = () => {
  const [catName, setCatName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/cats', { catName, age, breed });
      console.log(res.data);
      // Reset form after successful submission
      setCatName('');
      setAge('');
      setBreed('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" gutterBottom>Cat Profile</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TextField
            label="Cat Name"
            variant="outlined"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            required
          />
          <TextField
            label="Age"
            type="number"
            variant="outlined"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <TextField
            label="Breed"
            variant="outlined"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">Save Profile</Button>
        </form>
      </Box>
    </Container>
  );
};

export default CatProfile;
