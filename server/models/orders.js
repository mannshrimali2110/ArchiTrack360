// models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  ownerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // User-based access
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
