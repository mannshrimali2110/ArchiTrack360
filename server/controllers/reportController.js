const Sales = require('../models/Sales');
const Suppliers = require('../models/Supplier');
const Employees = require('../models/employeeModel');
const Orders = require('../models/orders');
const Inventory = require('../models/InventoryItem');

const generateSalesReport = async (req, res) => {
    const { startDate, endDate } = req.query;
    const userId = req.user.id; // Assuming req.user contains the logged-in user's ID

    try {
        // Parse dates to ensure they are in ISO 8601 format
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        // Query with parsed dates
        var report = await Sales.find({
            userId: userId, // Ensure 'userId' matches the Sales model field
        });
        report = report.filter((sale) => {
            const saleDate = new Date(sale.date);
            return saleDate >= parsedStartDate && saleDate <= parsedEndDate
        });
        report = report.map((sale) => {
            return {
                customerName: sale.customerName,
                productName: sale.productName,
                quantity: sale.quantity,
                price: sale.price,
                date: sale.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
            }
        });
        report = report.reduce((acc, sale) => {
            const existingProduct = acc.find(item => item.productName === sale.productName);
            if (existingProduct) {
                existingProduct.totalQuantity += sale.quantity;
                existingProduct.totalSales += sale.price * sale.quantity;
            } else {
                acc.push({
                    productName: sale.productName, // Ensure productName is included
                    totalQuantity: sale.quantity,
                    totalSales: sale.price * sale.quantity,
                });
            }
            return acc;
        }, []);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error generating report', error });
    }
};

const generateSuppliersReport = async (req, res) => {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;

    try {
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        const suppliers = await Suppliers.find({ userId: userId }); // Ensure 'userId' matches the Suppliers model field

        const report = suppliers.filter(supplier => {
            const supplyDate = new Date(supplier.date);
            return supplyDate >= parsedStartDate && supplyDate <= parsedEndDate;
        }).map(supplier => ({
            supplierName: supplier.supplierName,
            phone: supplier.phone,
            email: supplier.email,
            address: supplier.address,
            supplyProducts: supplier.supplyProducts,
            paymentTerms: supplier.paymentTerms,
        }));

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error generating suppliers report', error });
    }
};

const generateEmployeesReport = async (req, res) => {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;

    try {
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);
        // Filter and map based on the fields present in the employee model
        const employees = await Employees.find({ createdBy: userId }); // Ensure 'createdBy' matches the Employees model field
        const report = employees.filter(employee => {
            const creationDate = new Date(employee.date); // Use the 'date' field from the employee model
            return creationDate >= parsedStartDate && creationDate <= parsedEndDate;
        }).map(employee => ({
            name: employee.name,
            department: employee.department,
            email: employee.email,
            date: employee.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        }));

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error generating employees report', error });
    }
};

const generateOrdersReport = async (req, res) => {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;

    try {
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        const orders = await Orders.find({ ownerID: userId }); // Ensure 'userId' matches the Orders model field

        const report = orders.filter(order => {
            const orderDate = new Date(order.date);
            return orderDate >= parsedStartDate && orderDate <= parsedEndDate;
        }).map(order => ({
            customerName: order.customerName,
            quantity: order.quantity,
            price: order.price,
            date: order.date.toISOString().split('T')[0],
        }));

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error generating orders report', error });
    }
};

const generateInventoryReport = async (req, res) => {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;

    try {
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        const inventory = await Inventory.find({ userId }); // Ensure 'userId' matches the Inventory model field
        const report = inventory.filter(item => {
            const lastUpdated = new Date(item.date);
            return lastUpdated >= parsedStartDate && lastUpdated <= parsedEndDate;
        }).map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            date: item.date.toISOString().split('T')[0],
        }));

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error generating inventory report', error });
    }
};

module.exports = {
    generateSalesReport,
    generateSuppliersReport,
    generateEmployeesReport,
    generateOrdersReport,
    generateInventoryReport,
};
