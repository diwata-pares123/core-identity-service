const authGuard = (req, res, next) => {
    const { apiKey } = req.query;

    if (apiKey === 'secret123') {
        // Access granted, proceed to the controller
        next();
    } else {
        // Access denied, stop the request here
        res.status(401).json({
            status: "fail",
            message: "Access Denied: Invalid API Key"
        });
    }
};

module.exports = authGuard;