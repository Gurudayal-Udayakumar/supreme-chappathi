const express = require('express');
const router = express.Router();
const CateringEnquiry = require('../models/CateringEnquiry');

// POST /api/catering - Submit catering enquiry
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, eventType, eventDate, guestCount, menuPreferences, message } = req.body;

    if (!name || !phone || !eventType || !eventDate || !guestCount) {
      return res.status(400).json({ message: 'Name, phone, event type, date, and guest count are required' });
    }

    const enquiry = new CateringEnquiry({
      name,
      phone,
      email,
      eventType,
      eventDate,
      guestCount,
      menuPreferences: menuPreferences || [],
      message
    });

    await enquiry.save();

    res.status(201).json({
      message: 'Catering enquiry submitted successfully! We will contact you shortly.',
      enquiryId: enquiry._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting enquiry', error: error.message });
  }
});

module.exports = router;
