const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders - Place a new order
router.post('/', async (req, res) => {
  try {
    const { items, customer, deliveryMethod, busRoute, totalAmount, paymentMethod, notes } = req.body;

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }
    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({ message: 'Customer name and phone are required' });
    }
    if (!deliveryMethod) {
      return res.status(400).json({ message: 'Delivery method is required' });
    }
    if (deliveryMethod === 'bus' && !busRoute) {
      return res.status(400).json({ message: 'Bus route is required for bus delivery' });
    }
    if (deliveryMethod === 'direct' && !customer.address) {
      return res.status(400).json({ message: 'Address is required for direct delivery' });
    }

    const order = new Order({
      items,
      customer,
      deliveryMethod,
      busRoute,
      totalAmount,
      paymentMethod: paymentMethod || 'cod',
      notes
    });

    await order.save();

    res.status(201).json({
      message: 'Order placed successfully!',
      order: {
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        status: order.status,
        deliveryMethod: order.deliveryMethod,
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
});

// GET /api/orders/:orderNumber - Track order
router.get('/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
});

module.exports = router;
