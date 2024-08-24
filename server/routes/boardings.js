const express = require('express');
const router = express.Router();
const Boarding = require('../models/Boarding');

// Get All Boarding Schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Boarding.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Boarding Schedule
router.post('/', async (req, res) => {
  const { date, time, quota } = req.body;
  const newBoarding = new Boarding({ date, time, quota });

  try {
    await newBoarding.save();
    res.status(201).json(newBoarding);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Boarding Schedule
router.put('/:id', async (req, res) => {
  const { date, time, quota } = req.body;

  try {
    const updatedBoarding = await Boarding.findByIdAndUpdate(
      req.params.id,
      { date, time, quota },
      { new: true }
    );
    res.json(updatedBoarding);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Boarding Schedule
router.delete('/:id', async (req, res) => {
  try {
    await Boarding.findByIdAndDelete(req.params.id);
    res.json({ message: 'Boarding schedule deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
