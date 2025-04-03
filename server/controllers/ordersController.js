// controllers/ordersController.js
const Order = require('../models/orders');

// Get all orders for the authenticated user
const getAllOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieved from authenticate middleware
    const orders = await Order.find({ ownerID: userId });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Add a new order for the authenticated user
const addOrder = async (req, res) => {
  const { customerName, productName, quantity, price } = req.body;
  const userId = req.user.id; // Retrieved from authenticate middleware

  try {
    const newOrder = new Order({
      customerName,
      productName,
      quantity,
      price,
      ownerID: userId,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error saving order:", error); // Log the error details
    res.status(500).json({ error: 'Error adding order', details: error.message }); // Include error details in the response
  }
};

// Update an order if it belongs to the authenticated user
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = req.body;
    if (!req.user) {
      return res.status(403).json({ message: 'Unauthorized access' }); // Ensure user is authenticated
    }

    const order = await Order.findByIdAndUpdate(id, updatedOrder, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
}

// Delete an order if it belongs to the authenticated user
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Retrieved from authenticate middleware

  try {
    const order = await Order.findOneAndDelete({ _id: id, ownerID: userId });
    if (!order) {
      return res.status(403).json({ error: 'Unauthorized to delete this order' });
    }

    res.json({ message: 'Order deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order' });
  }
};


module.exports = {
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
};
