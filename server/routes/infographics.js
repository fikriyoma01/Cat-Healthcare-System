// routes/infographics.js
const express = require('express');
const router = express.Router();
const Infographic = require('../models/Infographic');

// Get All Infographics
router.get('/', async (req, res) => {
  try {
    const data = await Infographic.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Infographic
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const newInfographic = new Infographic({ title, content });

  try {
    await newInfographic.save();
    res.status(201).json(newInfographic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
