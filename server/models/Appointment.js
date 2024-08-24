const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
