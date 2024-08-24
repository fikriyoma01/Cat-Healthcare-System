const express = require('express');
const router = express.Router();
const multer = require('multer');
const Article = require('../models/Article');
const path = require('path');
const fs = require('fs');

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Get All Articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload Article
router.post('/', upload.single('file'), async (req, res) => {
  const { title, date } = req.body;
  const file = req.file;

  const newArticle = new Article({
    title,
    filename: file.filename,
    date,
  });

  try {
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Article
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      console.error('Article not found');
      return res.status(404).json({ error: 'Article not found' });
    }

    const filePath = path.join(__dirname, '../uploads', article.filename);
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ error: 'Error deleting file' });
      }

      try {
        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: 'Article deleted' });
      } catch (err) {
        console.error('Error deleting article from database:', err);
        res.status(500).json({ error: 'Error deleting article from database' });
      }
    });
  } catch (err) {
    console.error('Error finding article:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
