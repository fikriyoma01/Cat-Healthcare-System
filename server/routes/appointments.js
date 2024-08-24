const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get All Appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Appointment
router.post('/', async (req, res) => {
  const { date, time } = req.body;
  const newAppointment = new Appointment({ date, time });

  try {
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
