const express = require('express');
const router = express.Router();
const Content = require('./content');
const { verifyToken, verifyAdmin } = require('./middleware');

// Get all published content
router.get('/', async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    
    const query = { published: true };
    if (category) query.category = category;

    const content = await Content.find(query)
      .populate('author', 'name email')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Content.countDocuments(query);

    res.status(200).json({
      content,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get single content
router.get('/:id', async (req, res, next) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name email');

    if (!content || !content.published) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ content });
  } catch (error) {
    next(error);
  }
});

// Create content (Admin only)
router.post('/', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const { title, description, image, category, tags, published } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Title, description, and category are required' });
    }

    const content = new Content({
      title,
      description,
      image,
      category,
      tags: tags || [],
      author: req.user.id,
      published: published || false
    });

    await content.save();
    await content.populate('author', 'name email');

    res.status(201).json({
      message: 'Content created successfully',
      content
    });
  } catch (error) {
    next(error);
  }
});

// Update content (Admin only)
router.put('/:id', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const { title, description, image, category, tags, published } = req.body;

    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { title, description, image, category, tags, published },
      { new: true }
    ).populate('author', 'name email');

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({
      message: 'Content updated successfully',
      content
    });
  } catch (error) {
    next(error);
  }
});

// Delete content (Admin only)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
