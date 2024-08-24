// src/pages/Finance.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Finance = () => {
  const [reports, setReports] = useState([]);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await axios.get('/api/finance');
      setReports(res.data);
    };

    fetchReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      try {
        const res = await axios.put(`/api/finance/${currentId}`, { date, amount });
        setReports(reports.map(report => (report._id === currentId ? res.data : report)));
        setEditing(false);
        setCurrentId(null);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await axios.post('/api/finance', { date, amount });
        setReports([...reports, res.data]);
      } catch (err) {
        console.error(err);
      }
    }

    setDate('');
    setAmount('');
  };

  const handleEdit = (id) => {
    const report = reports.find(report => report._id === id);
    setDate(report.date);
    setAmount(report.amount);
    setEditing(true);
    setCurrentId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/finance/${id}`);
      setReports(reports.filter(report => report._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" gutterBottom>Laporan Keuangan</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <TextField
            label="Tanggal Transaksi"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            label="Total (Rp)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">{editing ? 'Update' : 'Simpan'} Laporan</Button>
        </form>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Kode Transaksi</TableCell>
                <TableCell>Tanggal Transaksi</TableCell>
                <TableCell>ID Pemilik Kucing</TableCell>
                <TableCell>ID Kucing</TableCell>
                <TableCell>Total (Rp)</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report._id}>
                  <TableCell>{report.transactionId}</TableCell>
                  <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                  <TableCell>{report.ownerId}</TableCell>
                  <TableCell>{report.catId}</TableCell>
                  <TableCell>{report.amount}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(report._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(report._id)}>
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

export default Finance;
