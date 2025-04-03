const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure this field exists
    date: { type: Date, default: Date.now }, // Added date field
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
