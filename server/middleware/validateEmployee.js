const validateEmployee = (req, res, next) => {
    const { name, department, email } = req.body;

    // Validate required fields
    if (!name || !department || !email) {
        return res.status(400).json({
            success: false,
            message: 'All fields (name, department, email) are required'
        });
    }

    // Validate data types
    if (typeof name !== 'string' || typeof department !== 'string' || typeof email !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Invalid data format: name, department, and email must be strings'
        });
    }

    next();
};

module.exports = validateEmployee;
