const express = require('express');
const {
    getAllSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplierCount,
    getSupplierById,
} = require('../controllers/supplierController');
const authenticate = require('../middleware/authenticate'); // Middleware to authenticate user

const router = express.Router();

// Routes
router.get('/', authenticate, getAllSuppliers); // Authenticate user
router.post('/add', authenticate, addSupplier); // Authenticate user
router.put('/update/:id', authenticate, updateSupplier); // Authenticate user
router.delete('/delete/:id', authenticate, deleteSupplier); // Authenticate user
router.get('/count', authenticate, getSupplierCount); // Authenticate user
router.get('/:id', authenticate, getSupplierById); // Authenticate user

module.exports = router;
