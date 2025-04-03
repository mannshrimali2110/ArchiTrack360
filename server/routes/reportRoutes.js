const express = require('express');
const {
    generateSalesReport,
    generateSuppliersReport,
    generateEmployeesReport,
    generateOrdersReport,
    generateInventoryReport,
} = require('../controllers/reportController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Route to generate sales report
router.get('/sales-report', authenticate, generateSalesReport);

// Route to generate suppliers report
router.get('/suppliers-report', authenticate, generateSuppliersReport);

// Route to generate employees report
router.get('/employees-report', authenticate, generateEmployeesReport);

// Route to generate orders report
router.get('/orders-report', authenticate, generateOrdersReport);

// Route to generate inventory report
router.get('/inventory-report', authenticate, generateInventoryReport);

module.exports = router;
