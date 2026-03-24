const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendContactEmail } = require('../utils/emailService');

// Input validation & sanitization rules
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be under 100 characters')
    .escape(), // Sanitize HTML entities
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/)
    .withMessage('Please provide a valid phone number (e.g., +91 98765 43210)')
    .isLength({ min: 7, max: 20 }).withMessage('Phone number must be between 7 and 20 characters'),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ max: 200 }).withMessage('Subject must be under 200 characters')
    .escape(),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 5000 }).withMessage('Message must be under 5000 characters')
    .escape()
];

// POST /api/contact - Submit contact form
router.post('/', contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array().map(e => e.msg)
      });
    }

    const { name, email, phone, subject, message } = req.body;

    // Save to MongoDB (Mongoose uses parameterized queries internally — safe from injection)
    const contact = new Contact({ name, email, phone, subject, message });
    await contact.save();

    // Send email notification (non-blocking — don't fail the response if email fails)
    try {
      await sendContactEmail({ name, email, phone, subject, message });
    } catch (emailErr) {
      console.error('⚠️ Email send failed (submission still saved):', emailErr.message);
    }

    res.status(201).json({
      message: 'Thank you for reaching out! We will get back to you soon.'
    });
  } catch (error) {
    console.error('❌ Contact form error:', error.message);
    res.status(500).json({ message: 'Error submitting contact form. Please try again.' });
  }
});

module.exports = router;
