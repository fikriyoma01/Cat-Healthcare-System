// models/Infographic.js
const mongoose = require('mongoose');

const InfographicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model('Infographic', InfographicSchema);
