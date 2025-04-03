const Supplier = require('../models/Supplier');

// Get all suppliers (with search and filter)
const getAllSuppliers = async (req, res) => {
    try {
        const { search, filter } = req.query;
        const userId = req.user.id; // Get user ID from authenticated user

        // Create the query object
        const query = { userId }; // Ensure user-specific access

        // Case-insensitive search for supplierName
        if (search && search.trim() !== "") {
            query.supplierName = { $regex: new RegExp(search, 'i') };
        }

        // Case-insensitive search for supplyProducts
        if (filter && filter.trim() !== "") {
            query.supplyProducts = { $regex: new RegExp(filter, 'i') };
        }

        // Fetch data from DB
        const suppliers = await Supplier.find(query);
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching suppliers', error: error.message });
    }
};

// Add a new supplier
const addSupplier = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from authenticated user
        const { supplierName, phone, email, address, supplyProducts, paymentTerms } = req.body;

        const newSupplier = new Supplier({
            supplierName,
            phone,
            email,
            address,
            supplyProducts,
            paymentTerms,
            userId,
        });

        await newSupplier.save();
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ message: 'Error adding supplier', error });
    }
};

// Update a supplier
const updateSupplier = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from authenticated user
        const updatedSupplier = await Supplier.findOneAndUpdate(
            { _id: req.params.id, userId }, // Ensure user-specific access
            req.body,
            { new: true }
        );
        if (!updatedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ message: 'Error updating supplier', error });
    }
};

// Delete a supplier
const deleteSupplier = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from authenticated user
        const deletedSupplier = await Supplier.findOneAndDelete({ _id: req.params.id, userId });
        if (!deletedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting supplier', error });
    }
};

// Get supplier count
const getSupplierCount = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from authenticated user
        const count = await Supplier.countDocuments({ userId });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching supplier count', error });
    }
};

// Get a supplier by ID
const getSupplierById = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from authenticated user
        const supplier = await Supplier.findOne({ _id: req.params.id, userId });
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching supplier', error });
    }
};

module.exports = {
    getAllSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplierCount,
    getSupplierById,
};
