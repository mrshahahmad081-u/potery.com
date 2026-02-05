const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { upload, handleMulterErrors } = require('./uplode middleware');
const { verifyToken } = require('./middleware');

// Upload single file
router.post('/single', verifyToken, upload.single('file'), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        path: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    next(error);
  }
});

// Upload multiple files
router.post('/multiple', verifyToken, upload.array('files', 10), (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const files = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      path: `/uploads/${file.filename}`
    }));

    res.status(200).json({
      message: 'Files uploaded successfully',
      files
    });
  } catch (error) {
    next(error);
  }
});

// Delete uploaded file
router.delete('/:filename', verifyToken, (req, res, next) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'uploads', filename);

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    fs.unlinkSync(filepath);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Error handler for multer
router.use(handleMulterErrors);

module.exports = router;
