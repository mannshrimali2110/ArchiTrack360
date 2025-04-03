const InventoryItem = require('../models/InventoryItem');

// Get all inventory items for the logged-in user
const getAllInventoryItems = async (req, res) => {
  const userId = req.user.id; // Extract user ID from the authenticated request
  try {
    const items = await InventoryItem.find({ userId });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching inventory items' });
  }
};

// Add a new inventory item for the logged-in user
const addInventoryItem = async (req, res) => {
  const { name, quantity, price } = req.body;
  if (!name || quantity == null || price == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const userId = req.user.id; // Extract user ID from the authenticated request
  try {
    const newItem = new InventoryItem({ name, quantity, price, userId });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Error adding item' });
  }
};

// Update an inventory item (ensure it belongs to the logged-in user)
const updateInventoryItem = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;
  if (!name || quantity == null || price == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const userId = req.user.id; // Extract user ID from the authenticated request
  try {
    const updatedItem = await InventoryItem.findOneAndUpdate(
      { _id: id, userId }, // Ensure the item belongs to the user
      { name, quantity, price },
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found or unauthorized' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Error updating item' });
  }
};

// Delete an inventory item (ensure it belongs to the logged-in user)
const deleteInventoryItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Extract user ID from the authenticated request
  try {
    const deletedItem = await InventoryItem.findOneAndDelete({ _id: id, userId });
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found or unauthorized' });
    }
    res.json({ message: 'Item deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting item' });
  }
};

// Get inventory count
const getInventoryCount = async (req, res) => {
  try {
    const count = await InventoryItem.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllInventoryItems,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getInventoryCount,
};
