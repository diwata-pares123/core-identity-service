const errorHandler = (err, req, res, next) => {
    // If the error doesn't have a status code, default to 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: "error",
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorHandler;