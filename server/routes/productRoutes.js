const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - Get all available products
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isAvailable: true };
    if (category && category !== 'all') {
      filter.category = category;
    }
    const products = await Product.find(filter).sort({ isFeatured: -1, name: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// GET /api/products/:slug - Get single product
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isAvailable: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

module.exports = router;
