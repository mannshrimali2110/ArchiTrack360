const validateInventoryItem = (req, res, next) => {
    const { name, quantity, price } = req.body;
    if (!name || quantity == null || price == null) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    next();
};

module.exports = validateInventoryItem;
