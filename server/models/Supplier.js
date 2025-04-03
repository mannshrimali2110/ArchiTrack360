const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    supplierName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    supplyProducts: { type: String, required: true },
    paymentTerms: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // For user-specific access
    date: { type: Date, default: Date.now } // Added date field
});

module.exports = mongoose.model('Supplier', supplierSchema);
