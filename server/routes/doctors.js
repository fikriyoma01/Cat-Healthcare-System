const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get All Doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Doctor
router.post('/', async (req, res) => {
  const { name, specialty } = req.body;
  const newDoctor = new Doctor({ name, specialty });

  try {
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
