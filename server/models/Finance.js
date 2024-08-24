const mongoose = require('mongoose');
const getNextSequence = require('../utils/getNextSequence');

const FinanceSchema = new mongoose.Schema({
  transactionId: { type: String, unique: true },
  date: { type: String, required: true },
  ownerId: { type: String, unique: true },
  catId: { type: String, unique: true },
  amount: { type: Number, required: true },
});

FinanceSchema.pre('save', async function (next) {
  const finance = this;

  if (!finance.isNew) {
    return next();
  }

  const datePart = finance.date.replace(/-/g, '').substring(2, 8);

  const transactionSeq = await getNextSequence(`TLD${datePart}`);
  finance.transactionId = `TLD${datePart}${String(transactionSeq).padStart(4, '0')}`;

  const ownerSeq = await getNextSequence('ownerId');
  finance.ownerId = `ID${String(ownerSeq).padStart(5, '0')}`;

  const catSeq = await getNextSequence('catId');
  finance.catId = `IDK${String(catSeq).padStart(5, '0')}`;

  next();
});

module.exports = mongoose.model('Finance', FinanceSchema);
