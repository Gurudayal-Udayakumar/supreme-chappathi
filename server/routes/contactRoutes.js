const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Name, email, subject, and message are required' });
    }

    const contact = new Contact({ name, email, phone, subject, message });
    await contact.save();

    res.status(201).json({
      message: 'Thank you for reaching out! We will get back to you soon.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact form', error: error.message });
  }
});

module.exports = router;
