const Sales = require('../models/Sales');
const mongoose = require('mongoose');

// Get all sales records for the logged-in user
const getAllSales = async (req, res) => {
  const userId = req.user.id; // Extract user ID from the authenticated request
  try {
    const sales = await Sales.find({ userId });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sales records' });
  }
};

// Add a new sales record for the logged-in user
const addSalesRecord = async (req, res) => {
  const { customerName, productName, quantity, price } = req.body;
  const userId = req.user.id; // Extract user ID from the authenticated request
  console.log(customerName, productName, quantity, price, userId); // Log the payload 
  console.log(userId); // Log the user ID

  try {
    const newSale = new Sales({ customerName, productName, quantity, price, userId });
    await newSale.save();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: 'Error adding sales record' });
  }
};

// Update a sales record (ensure it belongs to the logged-in user)
const updateSalesRecord = async (req, res) => {
  const { id } = req.params;
  const { customerName, productName, quantity, price } = req.body;
  const userId = req.user.id; // Extract user ID from the authenticated request
  try {
    const updatedSale = await Sales.findOneAndUpdate(
      { _id: id, userId },
      { customerName, productName, quantity, price },
      { new: true, runValidators: true }
    );
    if (!updatedSale) {
      return res.status(404).json({ error: 'Record not found or unauthorized' });
    }
    res.json(updatedSale);
  } catch (error) {
    res.status(500).json({ error: 'Error updating sales record' });
  }
};

// Delete a sales record (ensure it belongs to the logged-in user)
const deleteSalesRecord = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Extract user ID from the authenticated request
  try {
    const deletedSale = await Sales.findOneAndDelete({ _id: id, userId });
    if (!deletedSale) {
      return res.status(404).json({ error: 'Record not found or unauthorized' });
    }
    res.json({ message: 'Sales record deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting sales record' });
  }
};

const getSalesByMonth = async (req, res) => {
  const userId = req.user.id;
  try {
    const salesData = await Sales.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId.createFromHexString(userId), // Use createFromHexString
          date: { $exists: true, $type: "date" }
        }
      },
      {
        $group: {
          _id: { $month: "$date" },
          totalSales: { $sum: { $multiply: ["$quantity", "$price"] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const formattedData = salesData.map(item => ({
      month: item._id,
      sales: item.totalSales
    }));


    res.json(formattedData.length > 0 ? formattedData : []);
  } catch (error) {
    console.error("Error fetching sales data by month:", error);
    res.status(500).json({ error: 'Error fetching sales data by month' });
  }
};


module.exports = {
  getAllSales,
  addSalesRecord,
  updateSalesRecord,
  deleteSalesRecord,
  getSalesByMonth
};