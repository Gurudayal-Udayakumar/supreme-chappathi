const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  {
    name: 'Classic Chappathi',
    slug: 'classic-chappathi',
    category: 'chappathi',
    tagline: 'Soft, fluffy & homestyle',
    description: 'Our signature ready-to-cook chappathi made from premium whole wheat flour. Each piece is perfectly rolled, pressed by our automated machines, and packed fresh. Just heat on a tawa for 30 seconds each side — soft, fluffy chappathi ready to serve!',
    ingredients: ['Whole Wheat Flour', 'Water', 'Salt', 'Sunflower Oil'],
    nutrition: {
      calories: '120 kcal per piece',
      protein: '3.5g',
      carbs: '22g',
      fat: '2.5g',
      fiber: '3g'
    },
    packSizes: [
      { size: '10 pieces', price: 50, unit: 'pack' },
      { size: '20 pieces', price: 90, unit: 'pack' },
      { size: '50 pieces', price: 200, unit: 'bulk' },
      { size: '100 pieces', price: 380, unit: 'bulk' }
    ],
    cookingInstructions: [
      'Heat a tawa or flat pan on medium flame',
      'Place the chappathi on the hot tawa',
      'Cook for 30 seconds, then flip',
      'Apply ghee or oil if desired',
      'Cook for another 30 seconds until light brown spots appear',
      'Serve hot with curry or dal'
    ],
    shelfLife: '5 days refrigerated, 30 days frozen',
    isAvailable: true,
    isFeatured: true
  },
  {
    name: 'Ready-to-Cook Poori',
    slug: 'ready-to-cook-poori',
    category: 'poori',
    tagline: 'Perfectly round, puffs every time',
    description: 'Pre-rolled, perfectly circular pooris ready for frying. Made with fine wheat flour and a touch of semolina for that perfect puff. No more messy rolling — just drop in hot oil and watch them puff up beautifully!',
    ingredients: ['Wheat Flour', 'Semolina (Rava)', 'Water', 'Salt', 'Cooking Oil'],
    nutrition: {
      calories: '95 kcal per piece',
      protein: '2.5g',
      carbs: '15g',
      fat: '3g',
      fiber: '1.5g'
    },
    packSizes: [
      { size: '10 pieces', price: 45, unit: 'pack' },
      { size: '20 pieces', price: 80, unit: 'pack' },
      { size: '50 pieces', price: 180, unit: 'bulk' },
      { size: '100 pieces', price: 340, unit: 'bulk' }
    ],
    cookingInstructions: [
      'Heat oil in a deep pan or kadai',
      'Ensure oil is hot enough (drop a small piece of dough — it should sizzle immediately)',
      'Gently slide the poori into the hot oil',
      'Press lightly with a slotted spoon to help it puff',
      'Flip once golden, cook other side for a few seconds',
      'Drain on paper towels and serve hot'
    ],
    shelfLife: '3 days refrigerated, 20 days frozen',
    isAvailable: true,
    isFeatured: true
  },
  {
    name: 'Flaky Parotta',
    slug: 'flaky-parotta',
    category: 'parotta',
    tagline: 'Layers of crispy, flaky deliciousness',
    description: 'Multi-layered, flaky parotta made with our signature folding technique. Each parotta is carefully layered by our pressing machines to create that perfect crispy-outside, soft-inside texture. A South Indian favourite, perfected by Supreme Chappathi!',
    ingredients: ['Maida (Refined Flour)', 'Water', 'Salt', 'Sunflower Oil', 'Sugar'],
    nutrition: {
      calories: '180 kcal per piece',
      protein: '4g',
      carbs: '28g',
      fat: '6g',
      fiber: '1g'
    },
    packSizes: [
      { size: '5 pieces', price: 55, unit: 'pack' },
      { size: '10 pieces', price: 100, unit: 'pack' },
      { size: '25 pieces', price: 230, unit: 'bulk' },
      { size: '50 pieces', price: 440, unit: 'bulk' }
    ],
    cookingInstructions: [
      'Heat a flat tawa or pan on medium-high flame',
      'Place the frozen/chilled parotta on the tawa',
      'Add a teaspoon of oil or ghee around the edges',
      'Cook for 1-2 minutes until the bottom is golden',
      'Flip and cook the other side for 1-2 minutes',
      'Clap gently between palms to separate the layers',
      'Serve hot with salna, kurma, or any gravy'
    ],
    shelfLife: '4 days refrigerated, 30 days frozen',
    isAvailable: true,
    isFeatured: true
  },
  {
    name: 'Chola Poori',
    slug: 'chola-poori',
    category: 'chola-poori',
    tagline: 'Spiced & golden, festival favourite',
    description: 'Special chola-flavoured pooris infused with aromatic spices and turmeric. These golden beauties are a festival favourite and perfect for special occasions. Pre-rolled and ready to fry — bringing festive flavours to your everyday meals!',
    ingredients: ['Wheat Flour', 'Chola Dal Powder', 'Turmeric', 'Cumin', 'Black Pepper', 'Salt', 'Water', 'Cooking Oil'],
    nutrition: {
      calories: '110 kcal per piece',
      protein: '3.5g',
      carbs: '16g',
      fat: '3.5g',
      fiber: '2g'
    },
    packSizes: [
      { size: '10 pieces', price: 55, unit: 'pack' },
      { size: '20 pieces', price: 100, unit: 'pack' },
      { size: '50 pieces', price: 220, unit: 'bulk' },
      { size: '100 pieces', price: 420, unit: 'bulk' }
    ],
    cookingInstructions: [
      'Heat oil in a deep pan or kadai',
      'Ensure oil is sufficiently hot',
      'Gently place the chola poori into the oil',
      'It will puff up — press lightly with a slotted spoon if needed',
      'Flip once golden, cook other side briefly',
      'Drain excess oil and serve hot',
      'Pairs beautifully with potato masala or pickle'
    ],
    shelfLife: '3 days refrigerated, 20 days frozen',
    isAvailable: true,
    isFeatured: true
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/supreme-chappathi');
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const created = await Product.insertMany(products);
    console.log(`✅ Seeded ${created.length} products:`);
    created.forEach(p => console.log(`   - ${p.name} (${p.packSizes.length} pack sizes)`));

    await mongoose.disconnect();
    console.log('✅ Done! Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedProducts();
