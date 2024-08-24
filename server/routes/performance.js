const express = require('express');
const router = express.Router();
const Performance = require('../models/Performance');

// Get Store Performance
router.get('/', async (req, res) => {
  try {
    const performance = await Performance.find();
    res.json(performance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Performance Data
router.post('/', async (req, res) => {
  const { month, revenue, expenses } = req.body;
  const newPerformance = new Performance({ month, revenue, expenses });

  try {
    await newPerformance.save();
    res.status(201).json(newPerformance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
