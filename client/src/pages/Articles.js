// src/pages/Articles.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await axios.get('/api/articles');
      setArticles(res.data);
    };

    fetchArticles();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('date', date);

    try {
      const res = await axios.post('/api/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setArticles([...articles, res.data]);
      setTitle('');
      setFile(null);
      setDate('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/articles/${id}`);
      setArticles(articles.filter(article => article._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" gutterBottom>Data Artikel</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <TextField
            label="Nama Berkas"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Tanggal Upload"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <Button variant="contained" component="label">
            Upload
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          <Typography>{file ? file.name : 'Tidak ada file yang dipilih'}</Typography>
          <Button type="submit" variant="contained" color="primary">Simpan</Button>
        </form>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Berkas</TableCell>
                <TableCell>Tanggal Upload</TableCell>
                <TableCell>Nama Berkas</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article._id}>
                  <TableCell>{article.fileId}</TableCell>
                  <TableCell>{new Date(article.date).toLocaleDateString()}</TableCell>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>
                    <IconButton color="primary" href={`http://localhost:5000/uploads/${article.filename}`} target="_blank">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(article._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Articles;
