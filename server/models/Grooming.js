const mongoose = require('mongoose');

const GroomingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  quota: { type: Number, required: true },
});

module.exports = mongoose.model('Grooming', GroomingSchema);
