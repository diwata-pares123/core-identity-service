// This function handles the logic for the health check
exports.getHealthStatus = (req, res) => {
    res.status(200).json({
        "status": "active",
        "service": "core-identity",
        "time": new Date().toISOString()
    });
};