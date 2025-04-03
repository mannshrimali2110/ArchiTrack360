const express = require('express');
const {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeCount,
} = require('../controllers/employeeController');
const authenticate = require('../middleware/authenticate');
const validateEmployee = require('../middleware/validateEmployee'); // Import refactored middleware

const router = express.Router();

// Routes
router.get('/', authenticate, getAllEmployees);
router.post('/add', authenticate, validateEmployee, addEmployee);
router.put('/:id', authenticate,validateEmployee, updateEmployee);
router.delete('/:id', authenticate, deleteEmployee);
router.get('/count', authenticate, getEmployeeCount);

module.exports = router;