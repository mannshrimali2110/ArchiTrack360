const { LogError } = require('concurrently');
const Employee = require('../models/employeeModel');

// Helper for error responses
const sendError = (res, status, message) => {
  return res.status(status).json({ success: false, message });
};

// Get all employees for current user
const getAllEmployees = async (req, res) => {
  try {
    const userId = req.user.id;
    const employees = await Employee.find({ createdBy: userId }); // Query employees by createdBy field

    if (!employees.length) {
      return sendError(res, 404, 'No employees found for this user');
    }

    res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error('Error in getAllEmployees:', error.message); // Log any errors
    sendError(res, 500, `Server error: ${error.message}`);
  }
};

// Add new employee
const addEmployee = async (req, res) => {
  try {
    const { name, department, email } = req.body;
    const userId = req.user.id;

    // Additional validation
    if (!userId) return sendError(res, 400, 'Invalid user ID');
    if (!name.trim() || !department.trim() || !email.trim()) {
      return sendError(res, 400, 'Fields cannot be empty');
    }

    const newEmployee = new Employee({
      name: name.trim(),
      department: department.trim(),
      email: email.trim(),
      createdBy: userId, // Ensure this field is set correctly
    });

    await newEmployee.save();
    res.status(201).json({ success: true, employee: newEmployee });
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      return sendError(res, 400, 'Employee with this email already exists');
    }
    sendError(res, 500, `Server error: ${error.message}`);
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  try {
    console.log("Update req");

    const { id } = req.params;
    const { name, department, email } = req.body;
    const userId = req.user.id;
    // Validate input
    if (!id) return sendError(res, 400, 'Employee ID is required');
    if (!name.trim() || !department.trim() || !email.trim()) {
      return sendError(res, 400, 'Fields cannot be empty');
    }

    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id: id, createdBy: userId }, // Ensure only the owner can update
      {
        name: name.trim(),
        department: department.trim(),
        email: email.trim()
      },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return sendError(res, 404, 'Employee not found or not authorized');
    }

    res.status(200).json({ success: true, employee: updatedEmployee });
  } catch (error) {
    console.error('Error in updateEmployee:', error.message); // Log the error for debugging
    sendError(res, 500, `Server error: ${error.message}`);
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {

    const { id } = req.params;
    const userId = req.user.id;

    const deletedEmployee = await Employee.findOneAndDelete({ _id: id });

    if (!deletedEmployee) {
      return sendError(res, 404, 'Employee not found or not authorized');
    }

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    sendError(res, 500, `Server error: ${error.message}`);
  }
};

// Get employee count
const getEmployeeCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await Employee.countDocuments({ createdBy: userId }); // Use createdBy field for filtering
    res.status(200).json({ success: true, count });
  } catch (error) {
    sendError(res, 500, `Server error: ${error.message}`);
  }
};

module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeCount
};