const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;

    console.log(`[${timestamp}] ${method} request to ${url}`);
    
    // next() tells Express to move to the next function in line
    next();
};

module.exports = logger;