const express = require('express');
const {
  getAllSales,
  addSalesRecord,
  updateSalesRecord,
  deleteSalesRecord,
  getSalesByMonth,
} = require('../controllers/salesController');
const authenticate = require('../middleware/authenticate'); // Middleware for authentication

const router = express.Router();

// Routes with Authentication
router.get('/', authenticate, getAllSales); // Adjusted to match fetchSales endpoint
router.post('/add', authenticate, addSalesRecord); // Adjusted to match addSale endpoint
router.put('/:id', authenticate, updateSalesRecord); // Adjusted to match updateSale endpoint
router.delete('/:id', authenticate, deleteSalesRecord); // Adjusted to match deleteSale endpoint
router.get('/monthly-sales', authenticate, getSalesByMonth); // Protected route for fetching monthly sales data

module.exports = router;
