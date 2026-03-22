const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: { type: String, required: true },
  packSize: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 }
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  items: [orderItemSchema],
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    area: { type: String },
    city: { type: String, default: 'Tirupur' }
  },
  deliveryMethod: {
    type: String,
    required: true,
    enum: ['bus', 'direct', 'pickup']
  },
  busRoute: { type: String },
  totalAmount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cod', 'upi'],
    default: 'cod'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'dispatched', 'delivered', 'cancelled'],
    default: 'pending'
  },
  notes: { type: String }
}, { timestamps: true });

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const date = new Date();
    const prefix = 'SC';
    const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const random = Math.floor(1000 + Math.random() * 9000);
    this.orderNumber = `${prefix}${datePart}${random}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
