const mongoose = require('mongoose');
const getNextSequence = require('../utils/getNextSequence');

const ArticleSchema = new mongoose.Schema({
  fileId: { type: String, unique: true },
  title: { type: String, required: true },
  filename: { type: String, required: true },
  date: { type: String, required: true },
});

ArticleSchema.pre('save', async function (next) {
  const article = this;

  if (!article.isNew) {
    return next();
  }

  const datePart = article.date.replace(/-/g, '').substring(2, 8);

  const fileSeq = await getNextSequence(`IFG${datePart}`);
  article.fileId = `IFG${datePart}${String(fileSeq).padStart(4, '0')}`;

  next();
});

module.exports = mongoose.model('Article', ArticleSchema);
