// routes/orders.js
const express = require('express');
const {
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/ordersController');
const authenticate = require('../middleware/authenticate'); // Importing middleware

const router = express.Router();

// Routes with Authentication Middleware
router.get('/', authenticate, getAllOrders);
router.post('/add', authenticate, addOrder);
router.put('/update/:id', authenticate, updateOrder);
router.delete('/delete/:id', authenticate, deleteOrder);

module.exports = router;
