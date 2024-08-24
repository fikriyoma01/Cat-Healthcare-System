const express = require('express');
const router = express.Router();
const Grooming = require('../models/Grooming');

// Get All Grooming Schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Grooming.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Grooming Schedule
router.post('/', async (req, res) => {
  const { date, time, quota } = req.body;
  const newGrooming = new Grooming({ date, time, quota });

  try {
    await newGrooming.save();
    res.status(201).json(newGrooming);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Grooming Schedule
router.put('/:id', async (req, res) => {
  const { date, time, quota } = req.body;

  try {
    const updatedGrooming = await Grooming.findByIdAndUpdate(
      req.params.id,
      { date, time, quota },
      { new: true }
    );
    res.json(updatedGrooming);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Grooming Schedule
router.delete('/:id', async (req, res) => {
  try {
    await Grooming.findByIdAndDelete(req.params.id);
    res.json({ message: 'Grooming schedule deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
