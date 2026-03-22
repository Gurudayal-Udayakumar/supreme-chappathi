const mongoose = require('mongoose');

const packSizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, default: 'pack' }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true, enum: ['chappathi', 'poori', 'parotta', 'chola-poori'] },
  tagline: { type: String },
  description: { type: String, required: true },
  ingredients: [{ type: String }],
  nutrition: {
    calories: String,
    protein: String,
    carbs: String,
    fat: String,
    fiber: String
  },
  packSizes: [packSizeSchema],
  image: { type: String, default: '/images/placeholder-product.jpg' },
  cookingInstructions: [{ type: String }],
  shelfLife: { type: String },
  isAvailable: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
