const express = require('express');
const router = express.Router();
const Finance = require('../models/Finance');

// Get All Finance Reports
router.get('/', async (req, res) => {
  try {
    const reports = await Finance.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Finance Report
router.post('/', async (req, res) => {
  const { date, amount } = req.body;
  const newReport = new Finance({
    date,
    amount,
  });

  try {
    await newReport.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Finance Report
router.put('/:id', async (req, res) => {
  const { date, amount } = req.body;

  try {
    const updatedReport = await Finance.findByIdAndUpdate(
      req.params.id,
      { date, amount },
      { new: true }
    );
    res.json(updatedReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Finance Report
router.delete('/:id', async (req, res) => {
  try {
    await Finance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Finance report deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
