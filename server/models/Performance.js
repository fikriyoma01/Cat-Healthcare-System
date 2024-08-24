const mongoose = require('mongoose');

const PerformanceSchema = new mongoose.Schema({
  month: { type: String, required: true },
  revenue: { type: Number, required: true },
  expenses: { type: Number, required: true },
});

module.exports = mongoose.model('Performance', PerformanceSchema);
