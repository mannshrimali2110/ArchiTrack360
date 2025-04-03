const express = require('express');
const {
  getAllInventoryItems,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getInventoryCount,
} = require('../controllers/inventoryController');
const authenticate = require('../middleware/authenticate'); // Middleware to authenticate user
const validateInventoryItem = require('../middleware/validateInventoryItem'); // Middleware for validation

const router = express.Router();

// Routes
router.get('/', authenticate, getAllInventoryItems); // Authenticate user
router.post('/add', authenticate, validateInventoryItem, addInventoryItem); // Authenticate user
router.put('/:id', authenticate, updateInventoryItem); // Authenticate user
router.delete('/:id', authenticate, deleteInventoryItem); // Authenticate user
router.get('/count', getInventoryCount);

module.exports = router;
