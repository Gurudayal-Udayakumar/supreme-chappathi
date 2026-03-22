const mongoose = require('mongoose');

const cateringEnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  eventType: {
    type: String,
    required: true,
    enum: ['wedding', 'corporate', 'family', 'festival', 'other']
  },
  eventDate: { type: Date, required: true },
  guestCount: { type: Number, required: true },
  menuPreferences: [{ type: String }],
  message: { type: String },
  status: {
    type: String,
    enum: ['new', 'contacted', 'quoted', 'confirmed', 'completed', 'cancelled'],
    default: 'new'
  }
}, { timestamps: true });

module.exports = mongoose.model('CateringEnquiry', cateringEnquirySchema);
